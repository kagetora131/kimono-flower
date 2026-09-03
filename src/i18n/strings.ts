import type { Lang } from '../data/types'

/**
 * UI文言の辞書。
 *
 * 判定結果の文章(季節の適性・文様の意味など)は src/logic/season.ts と
 * src/data/motifs.ts がそれぞれ言語別に持っている。ここには画面の固定文言だけを置く。
 */
export const STRINGS: Record<Lang, Record<string, string>> = {
  ja: {
    title: '花あわせ',
    lead: '着物の柄を読み取り、着るのにふさわしい季節を提案します',
    langToggleLabel: '言語',

    step1Title: '一 . 写真を選ぶ',
    step1Note: '判定はすべてお使いの端末の中で行われます。写真がどこかに送信されることはありません。',
    dropzone: '着物・帯の写真をここにドラッグするか、下のボタンから選んでください',
    dropzoneSub: '柄がはっきり写るよう、寄りで撮ると精度が上がります',
    btnCamera: 'カメラで撮る',
    btnChooseImage: '画像を選ぶ',
    btnReselect: '写真を選び直す',
    btnAnalyze: 'この写真で柄を判定する',
    btnAnalyzing: '判定しています…',
    setupTip:
      '初回は約150MBのAIモデルを読み込みます（以降はブラウザに保存され、二回目からはすぐ判定できます）。読み込まずに使いたい場合は、下の「柄を一覧から選ぶ」から手で選んでも同じ結果が得られます。',
    errorAnalyze:
      'AIモデルの読み込みまたは判定に失敗しました。通信環境を確認して再度お試しいただくか、下の「柄を一覧から選ぶ」から手で選んでください。',
    progressDownloading: 'AIモデルを取得しています',
    progressIndexing: '文様の辞書を作っています',
    progressAnalyzing: '柄を読み取っています',

    step2Title: '二 . 柄をえらぶ',
    step2NoteResult:
      'AIの判定は目安です。違っていれば選び直してください。複数の柄が描かれている場合は、まとめて選べます。',
    step2NoteEmpty:
      '写真を判定するか、一覧から柄を選んでください。柄さえ決まれば、写真がなくても季節の提案は使えます。',
    inconclusiveNote:
      '候補が僅差で、柄を絞り込めませんでした。花柄ではない可能性もあります。下の候補に心当たりがなければ、柄がはっきり写るよう寄りで撮り直すか、一覧から手で選んでください。',
    btnTogglePicker: '柄を一覧から選ぶ',
    btnClosePicker: '一覧を閉じる',
    btnClearSelection: '選択を解除',

    confHigh: '確信度 高い',
    confMedium: '確信度 中くらい',
    confLow: '確信度 低い',

    step3Title: '三 . 一年の着どき',
    step3Note:
      '月をえらぶと、その月を基準に判定し直します。着物の柄は実際の盛りより半月から一月ほど早く着るのが粋とされ、その考え方を反映しています。',
    monthSelectLabel: '基準にする月',
    stylizedNote:
      'は、写実的に描かれていれば季節の柄ですが、図案化・様式化されたものや吉祥文様と組み合わされたものは通年着られるとされます。お手元の柄が抽象的な意匠であれば、上の判定より広く着られると考えてください。',
    yearRoundNote: 'は季節を選ばない文様のため、月の判定には含めていません。',

    step4Title: '四 . 柄の意味',
    step4Note: '選んだ柄それぞれの由来と、着こなしの目安です。',
    tabooLabel: '場面についての注意',

    filterAll: 'すべて',
    catFlower: '花',
    catPlant: '草木',
    catNature: '自然',
    catAuspicious: '吉祥・器物',
    catCreature: '生き物',
    catGeometric: '幾何',

    footNote: '着用時期は一般的な目安であり、流派・地域・意匠によって考え方は異なります。',
    footNote2: '大切な場面の装いは、呉服店や着付けの専門家にご相談ください。',
  },
  en: {
    title: 'Hana-Awase',
    lead: 'Read the pattern on your kimono and find the season it suits best',
    langToggleLabel: 'Language',

    step1Title: '1 . Choose a photo',
    step1Note:
      'Recognition runs entirely on your device. Your photo is never sent anywhere.',
    dropzone: 'Drag a photo of a kimono or obi here, or use the buttons below',
    dropzoneSub: 'For best accuracy, get close enough that the pattern is clearly visible',
    btnCamera: 'Take a photo',
    btnChooseImage: 'Choose an image',
    btnReselect: 'Choose a different photo',
    btnAnalyze: 'Identify the pattern',
    btnAnalyzing: 'Analyzing…',
    setupTip:
      'The first run downloads a ~150MB AI model (cached afterward, so it\'s instant next time). If you\'d rather skip the download, "Browse all motifs" below gives the same result without it.',
    errorAnalyze:
      'Loading the AI model or analyzing the image failed. Check your connection and try again, or choose a motif by hand from "Browse all motifs" below.',
    progressDownloading: 'Downloading the AI model',
    progressIndexing: 'Building the motif index',
    progressAnalyzing: 'Reading the pattern',

    step2Title: '2 . Choose the motif',
    step2NoteResult:
      "The AI's guess is a starting point — pick a different one if it's wrong. If the fabric shows more than one motif, you can select several.",
    step2NoteEmpty:
      'Analyze a photo, or pick a motif from the list. Once a motif is chosen, the season suggestion works even without a photo.',
    inconclusiveNote:
      "The top candidates were too close to call — it may not even be a floral motif. If none of the candidates below look right, try a closer photo, or pick one by hand from the list.",
    btnTogglePicker: 'Browse all motifs',
    btnClosePicker: 'Close the list',
    btnClearSelection: 'Clear selection',

    confHigh: 'High confidence',
    confMedium: 'Medium confidence',
    confLow: 'Low confidence',

    step3Title: "3 . The year's wearing seasons",
    step3Note:
      "Pick a month to re-check against it. Kimono are traditionally worn a little ahead of a flower's actual peak — this reflects that convention.",
    monthSelectLabel: 'Month to check against',
    stylizedNote:
      'follows its natural season when drawn realistically, but stylized or abstract versions — and ones combined with auspicious motifs — are considered wearable year-round. If your piece looks abstract rather than literal, treat it as less restricted than the chart above suggests.',
    yearRoundNote: "carries no season, so it isn't included in the monthly chart.",

    step4Title: '4 . What each motif means',
    step4Note: 'Origins and wearing notes for each motif you selected.',
    tabooLabel: 'A note on occasions',

    filterAll: 'All',
    catFlower: 'Flowers',
    catPlant: 'Plants',
    catNature: 'Nature',
    catAuspicious: 'Auspicious',
    catCreature: 'Creatures',
    catGeometric: 'Geometric',

    footNote:
      'Wearing seasons are general guidance — conventions vary by school, region, and design.',
    footNote2: 'For important occasions, please consult a kimono shop or dressing professional.',
  },
}

export function t(lang: Lang, key: keyof typeof STRINGS['ja']): string {
  return STRINGS[lang][key] ?? STRINGS.ja[key]
}
