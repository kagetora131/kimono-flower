/**
 * 画像から文様を推定するエンジンの共通インターフェース。
 *
 * 現在の実装はブラウザ内で完結する CLIP(localClip)のみ。
 * 将来 Gemini などのサーバー経由の高精度エンジンを足す場合も、
 * この形に合わせて 1 ファイル追加するだけで差し替えられるようにしてある。
 */

export interface Candidate {
  motifId: string
  /**
   * 表示用の相対スコア(0〜1)。上位候補の中での強さを表すだけで、
   * 確率ではない。確からしさは RecognitionResult.confidence を見ること。
   */
  score: number
}

export type Confidence = 'high' | 'medium' | 'low'

export interface RecognitionResult {
  candidates: Candidate[]
  /** 上位候補をどの程度信頼してよいかの目安。 */
  confidence: Confidence
  /** 花柄・文様らしきものを見つけられなかった場合 true。 */
  inconclusive: boolean
  /**
   * 1位のプロンプトとの生の近さ(コサイン類似度)と、2位との差。
   * 閾値の調整と不具合の切り分けのために残している。
   */
  diagnostics: { topSimilarity: number; margin: number }
}

/**
 * 進捗の説明は言語ごとの文言をここに持たせず、フェーズとバイト数だけを
 * 渡す。文言化は呼び出し側(UI)の言語設定に任せる。
 */
export type LoadPhase = 'downloading' | 'indexing'

export interface LoadProgress {
  /** 0〜1。ファイル取得の進捗。 */
  ratio: number
  phase: LoadPhase
  loadedBytes?: number
  totalBytes?: number
}

export interface Recognizer {
  id: string
  /** モデルの読み込み。すでに読み込み済みなら即座に解決する。 */
  prepare(onProgress?: (p: LoadProgress) => void): Promise<void>
  /** 画像(オブジェクトURL または data URL)から文様候補を返す。 */
  recognize(imageUrl: string): Promise<RecognitionResult>
}
