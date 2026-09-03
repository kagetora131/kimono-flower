import { MOTIFS } from '../data/motifs'
import type { Candidate, Confidence, LoadProgress, RecognitionResult, Recognizer } from './types'

/**
 * ブラウザ内で完結する文様推定。
 *
 * CLIP の画像埋め込みと、文様マスタの英語プロンプトの文埋め込みとの
 * コサイン類似度で候補を並べる。サーバーも API キーも要らず、画像が
 * 端末の外に出ないのが利点。
 *
 * zero-shot-image-classification パイプラインを使うと全プロンプトで
 * softmax を取るため、プロンプト数が増えるほど分布が潰れて上位以外の
 * 差が消える。ここでは類似度をそのまま扱い、
 *   - 文様ごとの相対スコア(表示用)
 *   - 上位2件の類似度の差(確信度の判断)
 * を別々に作ることで、順位と確からしさを正しく分けている。
 *
 * ただし着物のデフォルメされた柄は CLIP の得意分野ではない。判定は
 * あくまで候補として扱い、利用者が手で選び直せる導線を必ず残すこと。
 */

const MODEL_ID = 'Xenova/clip-vit-base-patch32'

/**
 * 確信度の閾値。1位と2位の類似度の差(margin)で判断する。
 *
 * 類似度の絶対値は使えない。実測すると、正しく当てた柄も、ランダムな
 * ノイズ画像も、1位の類似度はそろって 0.28〜0.31 に収まり区別がつかない。
 * 一方 margin は、当たっている時 0.013〜0.018、外している時 0.001〜0.009 と
 * はっきり分かれた。
 *
 * なお、この値は合成した柄で較正したもの。実物の着物写真を集めたら
 * 見直す余地がある。
 */
const MARGIN_HIGH = 0.015
const MARGIN_MEDIUM = 0.006
/** これを下回ると、候補を絞り込めていないと判断する。 */
const MARGIN_INCONCLUSIVE = 0.003

/** プロンプトの並び。i 番目のプロンプトが属する文様は PROMPT_OWNER[i]。 */
const CANDIDATE_LABELS: string[] = []
const PROMPT_OWNER: string[] = []
for (const motif of MOTIFS) {
  for (const prompt of motif.prompts) {
    CANDIDATE_LABELS.push(prompt)
    PROMPT_OWNER.push(motif.id)
  }
}

interface Engine {
  processor: any
  visionModel: any
  /** [プロンプト数][次元] に正規化済みの文埋め込み。読み込み時に一度だけ計算する。 */
  textEmbeds: Float32Array[]
  RawImage: any
}

let enginePromise: Promise<Engine> | null = null

function normalizeRows(data: Float32Array, rows: number, cols: number): Float32Array[] {
  const out: Float32Array[] = []
  for (let r = 0; r < rows; r++) {
    const row = data.slice(r * cols, (r + 1) * cols)
    let norm = 0
    for (let i = 0; i < cols; i++) norm += row[i] * row[i]
    norm = Math.sqrt(norm) || 1
    for (let i = 0; i < cols; i++) row[i] /= norm
    out.push(row)
  }
  return out
}

function dot(a: Float32Array, b: Float32Array): number {
  let s = 0
  for (let i = 0; i < a.length; i++) s += a[i] * b[i]
  return s
}

async function buildEngine(onProgress?: (p: LoadProgress) => void): Promise<Engine> {
  const {
    AutoTokenizer,
    AutoProcessor,
    CLIPTextModelWithProjection,
    CLIPVisionModelWithProjection,
    RawImage,
    env,
  } = await import('@huggingface/transformers')

  // ブラウザ内で完結させるため、ローカルモデルの探索は行わない。
  env.allowLocalModels = false

  const files = new Map<string, { loaded: number; total: number }>()
  const progress_callback = (data: {
    status: string
    file?: string
    loaded?: number
    total?: number
  }) => {
    if (!onProgress || data.status !== 'progress' || !data.file || !data.total) return
    files.set(data.file, { loaded: data.loaded ?? 0, total: data.total })
    let loaded = 0
    let total = 0
    for (const f of files.values()) {
      loaded += f.loaded
      total += f.total
    }
    onProgress({
      ratio: total > 0 ? Math.min(loaded / total, 1) : 0,
      phase: 'downloading',
      loadedBytes: loaded,
      totalBytes: total,
    })
  }

  // WASM + q8 で動かす。
  //
  // device: 'webgpu' は使わないこと。q8 量子化した ViT を WebGPU で走らせると
  // 画像埋め込みがほぼ定数になり(まったく異なる画像で同じ順位が返る)、
  // 判定が完全に壊れる。エラーにならず静かに間違った結果を返すため気づきにくい。
  // WASM なら同じ q8 でも正しく動き、1枚あたり 0.2〜0.3 秒と十分速い。
  const modelOpts = { dtype: 'q8' as const, progress_callback }

  const [tokenizer, processor, textModel, visionModel] = await Promise.all([
    AutoTokenizer.from_pretrained(MODEL_ID, { progress_callback }),
    AutoProcessor.from_pretrained(MODEL_ID, { progress_callback }),
    CLIPTextModelWithProjection.from_pretrained(MODEL_ID, modelOpts),
    CLIPVisionModelWithProjection.from_pretrained(MODEL_ID, modelOpts),
  ])

  onProgress?.({ ratio: 1, phase: 'indexing' })

  // 文埋め込みは文様マスタが変わらない限り不変なので、ここで一度だけ計算する。
  const textInputs = tokenizer(CANDIDATE_LABELS, { padding: true, truncation: true })
  const { text_embeds } = await textModel(textInputs)
  const [rows, cols] = text_embeds.dims as [number, number]
  const textEmbeds = normalizeRows(Float32Array.from(text_embeds.data as Float32Array), rows, cols)

  return { processor, visionModel, textEmbeds, RawImage }
}

function judgeConfidence(margin: number): Confidence {
  if (margin >= MARGIN_HIGH) return 'high'
  if (margin >= MARGIN_MEDIUM) return 'medium'
  return 'low'
}

export const localClipRecognizer: Recognizer = {
  id: 'local-clip',

  async prepare(onProgress) {
    if (!enginePromise) {
      enginePromise = buildEngine(onProgress).catch((err) => {
        // 失敗したら次回もう一度試せるようにキャッシュを捨てる。
        enginePromise = null
        throw err
      })
    }
    await enginePromise
  },

  async recognize(imageUrl): Promise<RecognitionResult> {
    await this.prepare()
    const { processor, visionModel, textEmbeds, RawImage } = await enginePromise!

    const image = await RawImage.fromURL(imageUrl)
    const inputs = await processor(image)
    const { image_embeds } = await visionModel(inputs)
    const [imgVec] = normalizeRows(
      Float32Array.from(image_embeds.data as Float32Array),
      1,
      (image_embeds.dims as number[])[1],
    )

    // 同じ文様に属する複数プロンプトのうち、最も近いものをその文様の類似度とする。
    const simByMotif = new Map<string, number>()
    for (let i = 0; i < textEmbeds.length; i++) {
      const sim = dot(imgVec, textEmbeds[i])
      const motifId = PROMPT_OWNER[i]
      simByMotif.set(motifId, Math.max(simByMotif.get(motifId) ?? -1, sim))
    }

    const ranked = [...simByMotif.entries()].sort((a, b) => b[1] - a[1])
    const topSim = ranked[0]?.[1] ?? 0
    const secondSim = ranked[1]?.[1] ?? 0

    // 表示用のスコアは、上位群の中での相対的な強さ。
    // 類似度そのものは 0.2〜0.3 の狭い帯に収まり棒グラフにすると差が見えないため、
    // 上位10件の最小値を基準に引き伸ばす。
    const window = ranked.slice(0, 10)
    const floor = window[window.length - 1]?.[1] ?? 0
    const span = Math.max(topSim - floor, 1e-6)
    const candidates: Candidate[] = ranked.slice(0, 6).map(([motifId, sim]) => ({
      motifId,
      score: Math.max((sim - floor) / span, 0.04),
    }))

    // 上位が団子なら、順位に意味がないとみなす。
    // ただし候補そのものは伏せない。1位を当てていても僅差になることがあり、
    // 利用者が一覧から選ぶときの手がかりとして役に立つため。
    const margin = topSim - secondSim

    return {
      candidates,
      confidence: judgeConfidence(margin),
      inconclusive: margin < MARGIN_INCONCLUSIVE,
      diagnostics: { topSimilarity: topSim, margin },
    }
  },
}
