import { MOTIF_BY_ID } from '../data/motifs'
import type { Fitness, Month, Motif } from '../data/types'

export const MONTHS: Month[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

/** 和風月名。結果表示に季節感を添えるために使う。 */
export const MONTH_NAMES_JA = [
  '睦月',
  '如月',
  '弥生',
  '卯月',
  '皐月',
  '水無月',
  '文月',
  '葉月',
  '長月',
  '神無月',
  '霜月',
  '師走',
] as const

const FITNESS_SCORE: Record<Fitness, number> = {
  best: 3,
  good: 2,
  caution: 1,
  avoid: 0,
}

export const FITNESS_LABEL: Record<Fitness, string> = {
  best: '最適',
  good: '着られる',
  caution: '時季外れ',
  avoid: '避けたい',
}

export const FITNESS_MARK: Record<Fitness, string> = {
  best: '◎',
  good: '○',
  caution: '△',
  avoid: '×',
}

/** ひとつの文様の、ひと月ぶんの判定。 */
export interface MonthFitness {
  month: Month
  fitness: Fitness
}

/** ひとつの文様の12か月ぶんの判定。 */
export interface MotifProfile {
  motif: Motif
  months: MonthFitness[]
  /** 季節を持たない通年文様か。 */
  yearRound: boolean
}

/** 検出された文様すべてを合成した最終判定。 */
export interface Verdict {
  /** 判定の基準にした月。 */
  targetMonth: Month
  /** 合成した12か月の適性。 */
  months: MonthFitness[]
  /** 最も適した月(合成後に best となる月)。 */
  bestMonths: Month[]
  /** targetMonth の適性。 */
  targetFitness: Fitness
  /** 見出し(「今が着どきです」など)。 */
  headline: string
  /** 判定の理由を説明する本文。 */
  detail: string
  /** 季節の異なる文様が同居し、着どきが重ならない状態か。 */
  conflict: boolean
  /** 季節を持つ文様のプロフィール。 */
  seasonalProfiles: MotifProfile[]
  /** 通年着られる文様のプロフィール。 */
  yearRoundProfiles: MotifProfile[]
  /** 様式化されていれば通年可、という注記の対象になる文様。 */
  stylizedExceptions: Motif[]
  /** TPO 上の注意がある文様の注記。 */
  cautions: { motif: Motif; text: string }[]
}

/** その文様をその月に着ることの適性を返す。 */
export function fitnessOf(motif: Motif, month: Month): Fitness {
  if (motif.wearBest.includes(month)) return 'best'
  if (motif.wearAvoid.includes(month)) return 'avoid'
  if (motif.wearGood.includes(month)) return 'good'
  return 'caution'
}

/** 文様ひとつぶんの12か月プロフィールを作る。 */
export function profileOf(motif: Motif): MotifProfile {
  return {
    motif,
    months: MONTHS.map((month) => ({ month, fitness: fitnessOf(motif, month) })),
    yearRound: motif.peak === null,
  }
}

function scoreToFitness(score: number): Fitness {
  if (score >= 3) return 'best'
  if (score >= 2) return 'good'
  if (score >= 1) return 'caution'
  return 'avoid'
}

function listMonths(months: Month[]): string {
  if (months.length === 0) return ''
  // 連続する月は「3〜5月」のように範囲でまとめる。12月→1月の折り返しも扱う。
  const sorted = [...months].sort((a, b) => a - b)
  const wrapsYear = sorted.includes(12) && sorted.includes(1) && sorted.length < 12
  const ordered = wrapsYear
    ? [...sorted.filter((m) => m >= 10), ...sorted.filter((m) => m < 10)]
    : sorted

  const runs: Month[][] = []
  for (const m of ordered) {
    const last = runs[runs.length - 1]
    const prev = last?.[last.length - 1]
    if (prev !== undefined && (m === prev + 1 || (prev === 12 && m === 1))) {
      last.push(m)
    } else {
      runs.push([m])
    }
  }
  return runs
    .map((run) => (run.length === 1 ? `${run[0]}月` : `${run[0]}〜${run[run.length - 1]}月`))
    .join('・')
}

const HEADLINES: Record<Fitness, string> = {
  best: '今が着どきです',
  good: '着ても差し支えありません',
  caution: '少し時季を外しています',
  avoid: 'この時季は避けたい柄です',
}

/**
 * 検出された文様から最終判定を作る。
 *
 * 合成の考え方:
 * - 季節を持つ文様(peak !== null)だけが月の適否を決める。
 * - 複数ある場合は「最も厳しい判定」に合わせる。ひとつでも避けたい柄が
 *   含まれていれば、その月は避けたほうがよいという考え方による。
 * - 通年文様(七宝・鶴など)は月の判定に影響させず、別枠で表示する。
 */
export function buildVerdict(motifIds: string[], targetMonth: Month): Verdict | null {
  const motifs = motifIds
    .map((id) => MOTIF_BY_ID.get(id))
    .filter((m): m is Motif => m !== undefined)

  if (motifs.length === 0) return null

  const profiles = motifs.map(profileOf)
  const seasonalProfiles = profiles.filter((p) => !p.yearRound)
  const yearRoundProfiles = profiles.filter((p) => p.yearRound)

  const months: MonthFitness[] = MONTHS.map((month) => {
    if (seasonalProfiles.length === 0) {
      // すべて通年文様。ただし松・松竹梅のように「特に映える月」があるものは拾う。
      const anyBest = profiles.some((p) => p.motif.wearBest.includes(month))
      return { month, fitness: anyBest ? 'best' : 'good' }
    }
    const score = Math.min(
      ...seasonalProfiles.map((p) => FITNESS_SCORE[fitnessOf(p.motif, month)]),
    )
    return { month, fitness: scoreToFitness(score) }
  })

  const bestMonths = months.filter((m) => m.fitness === 'best').map((m) => m.month)
  const goodMonths = months.filter((m) => m.fitness === 'good').map((m) => m.month)
  const targetFitness = months[targetMonth - 1].fitness

  const names = motifs.map((m) => m.nameJa).join('・')
  const wearable = bestMonths.length > 0 ? bestMonths : goodMonths

  // 季節の異なる柄が同居していると、どの月も条件を満たさなくなる。
  // 桜と楓を取り合わせた「桜楓」のように、実際の着物では意図してそう作られた
  // 意匠が存在するため、時季外れとして片づけずに別枠で説明する。
  const conflict = seasonalProfiles.length > 1 && wearable.length === 0

  let headline = HEADLINES[targetFitness]
  let detail: string

  if (conflict) {
    const each = seasonalProfiles
      .map((p) => {
        const own = p.motif.wearBest.length > 0 ? p.motif.wearBest : p.motif.wearGood
        return `${p.motif.nameJa}(${listMonths(own)})`
      })
      .join('と')
    headline = '季節をまたぐ取り合わせです'
    detail = `${each}は着どきが重なりません。ただし着物には、桜と楓を組み合わせた「桜楓」のように、あえて季節をまたいで取り合わせた意匠があり、これらは季節を問わず着られるものとして扱われます。ひとつの絵柄としてまとまっているなら通年の柄、別々の柄が並んでいるだけなら、それぞれの時季に合わせて選ぶとよいでしょう。`
  } else if (seasonalProfiles.length === 0) {
    detail = `${names}はいずれも季節を選ばない文様です。${targetMonth}月に限らず、一年を通して着られます。`
  } else if (targetFitness === 'best') {
    detail = `${targetMonth}月は${names}が最も映える時季です。着物の柄は実際の盛りより少し早く着るのが粋とされ、今がちょうどその頃合いにあたります。`
  } else if (targetFitness === 'good') {
    detail =
      bestMonths.length > 0
        ? `${targetMonth}月に${names}を着ることに差し支えはありません。最も映えるのは${listMonths(bestMonths)}頃です。`
        : `${targetMonth}月に${names}を着ることに差し支えはありません。`
  } else if (targetFitness === 'caution') {
    detail = `${names}は${listMonths(wearable)}の柄です。${targetMonth}月は時季から外れるため、季節感を大切にするなら控えたほうが無難です。`
  } else {
    const avoiding = seasonalProfiles
      .filter((p) => p.motif.wearAvoid.includes(targetMonth))
      .map((p) => p.motif.nameJa)
      .join('・')
    detail = `${avoiding}は盛りを過ぎた時季にあたります。着物では盛りを過ぎた花を着るのは避けるものとされているため、${targetMonth}月は控え、${listMonths(wearable)}まで待つのがふさわしいでしょう。`
  }

  const stylizedExceptions = seasonalProfiles
    .filter((p) => p.motif.stylizedYearRound)
    .map((p) => p.motif)

  const cautions = motifs
    .filter((m) => m.taboo)
    .map((m) => ({ motif: m, text: m.taboo as string }))

  return {
    targetMonth,
    months,
    bestMonths,
    targetFitness,
    headline,
    detail,
    conflict,
    seasonalProfiles,
    yearRoundProfiles,
    stylizedExceptions,
    cautions,
  }
}
