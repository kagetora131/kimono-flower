/** 文様の分類。図鑑の絞り込みと結果カードのバッジ表示に使う。 */
export type MotifCategory =
  | 'flower' // 花
  | 'plant' // 草木
  | 'nature' // 自然象(波・雲・雪など)
  | 'auspicious' // 吉祥・器物
  | 'creature' // 生き物
  | 'geometric' // 幾何文様

/** 1〜12 の月。配列の要素として素の number で持つ。 */
export type Month = number

/** ある月にその文様を着ることの適性。 */
export type Fitness = 'best' | 'good' | 'caution' | 'avoid'

export interface Motif {
  id: string
  /** 和名 */
  nameJa: string
  /** 読み(ふりがな) */
  reading: string
  /** 英名。インバウンド向け表示と CLIP プロンプトの下地を兼ねる。 */
  nameEn: string
  category: MotifCategory

  /**
   * 実際に花が咲く / その事物が盛りを迎える月。
   * 通年文様(松・七宝など季節を持たないもの)は null。
   */
  peak: Month[] | null

  /** 着用が最もふさわしい月。着物の「季節の先取り」を反映済み。 */
  wearBest: Month[]
  /** 着てもよい月。 */
  wearGood: Month[]
  /** 避けたい月。多くは「盛りを過ぎた直後」。 */
  wearAvoid: Month[]

  /**
   * 写実的な図案ではなく様式化・図案化されたものなら通年着られる文様か。
   * true の場合、結果画面で「様式化されていれば通年可」の注記を出す。
   */
  stylizedYearRound: boolean

  /** 「春(3〜4月)」のような、象徴する季節の短い表示。 */
  season: string
  /** 意味・由来。 */
  meaning: string
  /** 着こなしの注意や豆知識。 */
  note: string
  /** TPO 上の注意(慶弔・場面)。該当するものだけ。 */
  taboo?: string

  /** ブラウザ内 CLIP のゼロショット判定に使う英語プロンプト。 */
  prompts: string[]
}
