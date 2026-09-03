import type { Motif } from './types'

/**
 * 文様マスタ。
 *
 * 着用月(wearBest / wearGood / wearAvoid)は「季節の先取り」——
 * 実際の盛りより半月〜一月早く着て、盛りを過ぎたら着ない——という
 * 着物の一般的な考え方にもとづく目安であり、流派・地域・作品の意匠に
 * よって異なる。アプリ上でも「目安」として提示すること。
 *
 * text.ja / text.en はそれぞれ独立した文章として作ってあり、英語版は
 * 日本語の逐語訳ではない(海外の読者にも伝わる説明に作り替えている)。
 */
export const MOTIFS: Motif[] = [
  // ───────────────────────── 花 ─────────────────────────
  {
    id: 'sakura',
    nameJa: '桜',
    reading: 'さくら',
    romaji: 'Sakura',
    nameEn: 'Cherry blossom',
    category: 'flower',
    peak: [3, 4],
    wearBest: [2, 3],
    wearGood: [1, 4],
    wearAvoid: [5],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '春(3〜4月)',
        meaning:
          '豊穣・門出・物事の始まり。新生活や祝いの席にふさわしい、日本を象徴する花。',
        note: '満開の時期に桜を着るのは「野暮」とされ、咲く前に着るのが粋とされる。ただし枝や幹まで写実的に描かれたものは時期を選ぶ一方、花びらだけを散らした「桜散らし」や花弁を図案化した桜文は通年着られる文様として扱われる。',
      },
      en: {
        season: 'Spring (Mar–Apr)',
        meaning:
          "Japan's most iconic flower, symbolizing new beginnings, fresh starts, and abundance.",
        note: 'Wearing sakura once it is in full bloom is considered unfashionable; the elegant approach is to wear it just before the blossoms open. Realistic depictions with branches follow this narrow window, but stylized scattered-petal designs ("sakura-chirashi") are treated as year-round motifs.',
      },
    },
    prompts: [
      'a kimono with cherry blossom sakura flower pattern',
      'Japanese textile with pink five-petal cherry blossoms',
    ],
  },
  {
    id: 'ume',
    nameJa: '梅',
    reading: 'うめ',
    romaji: 'Ume',
    nameEn: 'Plum blossom',
    category: 'flower',
    peak: [1, 2, 3],
    wearBest: [12, 1, 2],
    wearGood: [3, 11],
    wearAvoid: [4, 5],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '冬〜早春(12〜2月)',
        meaning:
          '厳しい寒さの中で真っ先に咲くことから、忍耐・高潔・生命力の象徴。松竹梅のひとつで代表的な吉祥文様。',
        note: '松竹梅として組み合わされている場合は吉祥文様となり、季節を問わず着られる。丸みを帯びた五弁の花形で、花弁の先に切れ込みのある桜と見分ける。',
      },
      en: {
        season: 'Winter to early spring (Dec–Feb)',
        meaning:
          'Blooming first, while snow still lingers, plum symbolizes perseverance, integrity, and vitality. One of the "Three Friends of Winter" (pine, bamboo, plum).',
        note: 'When paired with pine and bamboo as "shochikubai", it becomes an auspicious motif worn year-round. Its five rounded petals distinguish it from sakura, whose petals have notched tips.',
      },
    },
    prompts: [
      'a kimono with Japanese plum blossom ume pattern',
      'Japanese textile with round five-petal plum blossoms on branches',
    ],
  },
  {
    id: 'tsubaki',
    nameJa: '椿',
    reading: 'つばき',
    romaji: 'Tsubaki',
    nameEn: 'Camellia',
    category: 'flower',
    peak: [12, 1, 2, 3],
    wearBest: [1, 2],
    wearGood: [12, 3],
    wearAvoid: [4, 5],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '冬〜春(12〜3月)',
        meaning: '常緑の葉と冬に咲く花から生命力の象徴とされ、古くは魔除けの木とされた。',
        note: '厚く光沢のある葉と、平たく開く花が特徴。冬の柄の中でも華やかで、初春の装いによく合う。',
        taboo: '花が首から丸ごと落ちる姿を連想させるため、婚礼やお見舞いの席では避けられることがある。',
      },
      en: {
        season: 'Winter to spring (Dec–Mar)',
        meaning:
          'With evergreen leaves and blossoms that open in winter, camellia symbolizes vitality and was traditionally believed to ward off evil.',
        note: 'Recognizable by its thick, glossy leaves and flat, open blossom. A striking winter motif well suited to early-spring dress.',
        taboo: 'Because the whole flower head drops at once, some avoid it for weddings or hospital visits, where the image can feel inauspicious.',
      },
    },
    prompts: [
      'a kimono with camellia tsubaki flower pattern',
      'Japanese textile with red camellia flowers and glossy dark green leaves',
    ],
  },
  {
    id: 'fuji',
    nameJa: '藤',
    reading: 'ふじ',
    romaji: 'Fuji',
    nameEn: 'Wisteria',
    category: 'flower',
    peak: [4, 5],
    wearBest: [3, 4],
    wearGood: [5],
    wearAvoid: [6, 7],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '晩春〜初夏(4〜5月)',
        meaning:
          '蔓が長く伸びて花を垂らすことから長寿・子孫繁栄を表す。藤原氏にゆかりが深く、高貴な文様とされる。',
        note: '房状に垂れ下がる紫の花が特徴で、遠目にも判別しやすい。晩春の訪問着に多い柄。',
      },
      en: {
        season: 'Late spring to early summer (Apr–May)',
        meaning:
          'Its long, trailing vines and cascading flowers symbolize longevity and flourishing descendants. Historically linked to the noble Fujiwara clan.',
        note: 'Easy to spot from a distance thanks to its hanging clusters of purple blossoms. A common motif on formal visiting kimono (houmongi) in late spring.',
      },
    },
    prompts: [
      'a kimono with wisteria fuji hanging purple flower clusters',
      'Japanese textile with drooping wisteria blossoms',
    ],
  },
  {
    id: 'botan',
    nameJa: '牡丹',
    reading: 'ぼたん',
    romaji: 'Botan',
    nameEn: 'Peony',
    category: 'flower',
    peak: [4, 5],
    wearBest: [3, 4, 5],
    wearGood: [2, 6],
    wearAvoid: [7, 8],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '春(4〜5月)',
        meaning: '「百花の王」と呼ばれ、富貴・繁栄・美の象徴。格の高い柄として礼装に広く使われる。',
        note: '唐草と組み合わせた「牡丹唐草」や獅子と組んだ「唐獅子牡丹」は意匠化された吉祥文様として通年着られる。芍薬とよく似るが、牡丹は木で葉の切れ込みが深い。',
      },
      en: {
        season: 'Spring (Apr–May)',
        meaning:
          'Known as the "king of flowers," symbolizing wealth, prosperity, and beauty. A high-status motif often used on formal wear.',
        note: 'Combined with scrolling vines ("botan-karakusa") or lions ("karajishi-botan"), it becomes a stylized auspicious motif worn year-round. Similar to shakuyaku (Chinese peony), but botan is a woody shrub with deeply lobed leaves.',
      },
    },
    prompts: [
      'a kimono with large peony botan flower pattern',
      'Japanese textile with big layered peony blossoms',
    ],
  },
  {
    id: 'kiku',
    nameJa: '菊',
    reading: 'きく',
    romaji: 'Kiku',
    nameEn: 'Chrysanthemum',
    category: 'flower',
    peak: [9, 10, 11],
    wearBest: [9, 10],
    wearGood: [8, 11],
    wearAvoid: [12, 1],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '秋(9〜11月)',
        meaning:
          '不老不死・長寿。重陽の節句(9月9日)の花で、皇室の紋にも用いられる格の高い文様。',
        note: '吉祥文様としての性格が強く、礼装では季節を問わず着られるとされる。とくに丸く図案化した「菊丸」や「乱菊」は通年可。',
      },
      en: {
        season: 'Autumn (Sep–Nov)',
        meaning:
          'A symbol of longevity and immortality, associated with the Chrysanthemum Festival (Sep 9) and used in the Imperial crest — one of the most prestigious motifs.',
        note: 'Its strong auspicious character means it can be worn on formal attire regardless of season, especially when stylized into a round medallion ("kiku-maru") or scattered design ("rangiku").',
      },
    },
    prompts: [
      'a kimono with chrysanthemum kiku flower pattern',
      'Japanese textile with round many-petaled chrysanthemum flowers',
    ],
  },
  {
    id: 'shobu',
    nameJa: '菖蒲・杜若',
    reading: 'しょうぶ・かきつばた',
    romaji: 'Shobu / Kakitsubata',
    nameEn: 'Iris',
    category: 'flower',
    peak: [5, 6],
    wearBest: [4, 5],
    wearGood: [6],
    wearAvoid: [7, 8],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '初夏(5〜6月)',
        meaning:
          '「菖蒲」が「尚武」「勝負」に通じることから、端午の節句の魔除け・武運の象徴とされる。',
        note: '細く直立する葉と紫の花が特徴。水辺の景色と組み合わせて描かれることが多い。',
      },
      en: {
        season: 'Early summer (May–Jun)',
        meaning:
          'Its name is a homophone for "martial spirit," linking it to the Boys\' Day festival as a symbol of protection and success in battle.',
        note: 'Distinguished by its narrow, upright leaves and purple blooms, often depicted alongside water scenery.',
      },
    },
    prompts: [
      'a kimono with Japanese iris shobu kakitsubata pattern',
      'Japanese textile with purple iris flowers and tall narrow leaves',
    ],
  },
  {
    id: 'asagao',
    nameJa: '朝顔',
    reading: 'あさがお',
    romaji: 'Asagao',
    nameEn: 'Morning glory',
    category: 'flower',
    peak: [7, 8],
    wearBest: [6, 7],
    wearGood: [8],
    wearAvoid: [9, 10],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '夏(7〜8月)',
        meaning: '夏の朝の涼やかさを表す。儚さと、蔓が絡む姿から結びつきの象徴とも。',
        note: '浴衣の定番柄。涼を演出する意味でも、実際の暑さより少し早めに着はじめるとよい。',
      },
      en: {
        season: 'Summer (Jul–Aug)',
        meaning:
          'Evokes the cool freshness of a summer morning. Its intertwining vines also suggest connection, while the short-lived bloom hints at fleeting beauty.',
        note: 'A classic yukata motif. Worth wearing a little before the height of summer heat, precisely to create that sense of coolness.',
      },
    },
    prompts: [
      'a yukata with morning glory asagao trumpet flower pattern',
      'Japanese textile with blue morning glory flowers and vines',
    ],
  },
  {
    id: 'nadeshiko',
    nameJa: '撫子',
    reading: 'なでしこ',
    romaji: 'Nadeshiko',
    nameEn: 'Dianthus',
    category: 'flower',
    peak: [6, 7, 8, 9],
    wearBest: [6, 7, 8],
    wearGood: [5, 9],
    wearAvoid: [10, 11],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '夏〜初秋(6〜9月)',
        meaning: '秋の七草のひとつ。「大和撫子」の語のとおり、可憐さ・清楚さの象徴。',
        note: '花弁の先が細かく切れ込むのが特徴。夏物の小紋や浴衣によく使われる。',
      },
      en: {
        season: 'Summer to early autumn (Jun–Sep)',
        meaning:
          'One of the "seven autumn flowers." As in the phrase "Yamato nadeshiko" (an ideal Japanese woman), it symbolizes delicate, modest beauty.',
        note: 'Recognizable by its finely fringed petal tips. Common on summer komon (fine-pattern kimono) and yukata.',
      },
    },
    prompts: [
      'a kimono with dianthus nadeshiko pink fringed flower pattern',
      'Japanese textile with small pink fringed petal flowers',
    ],
  },
  {
    id: 'kikyo',
    nameJa: '桔梗',
    reading: 'ききょう',
    romaji: 'Kikyo',
    nameEn: 'Chinese bellflower',
    category: 'flower',
    peak: [7, 8, 9],
    wearBest: [7, 8],
    wearGood: [6, 9],
    wearAvoid: [10, 11],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '夏〜秋(7〜9月)',
        meaning: '秋の七草のひとつ。誠実・変わらぬ心を表し、家紋にも多く使われる。',
        note: '五角形の星形に開く花が特徴で、図案化しやすく紋や小紋によく登場する。',
      },
      en: {
        season: 'Summer to autumn (Jul–Sep)',
        meaning:
          'One of the "seven autumn flowers," representing sincerity and unchanging devotion. Frequently used in family crests.',
        note: 'Its five-pointed star shape makes it easy to stylize, appearing often in crests and fine-pattern kimono.',
      },
    },
    prompts: [
      'a kimono with bellflower kikyo star-shaped purple flower pattern',
      'Japanese textile with five-pointed star shaped bellflowers',
    ],
  },
  {
    id: 'hagi',
    nameJa: '萩',
    reading: 'はぎ',
    romaji: 'Hagi',
    nameEn: 'Bush clover',
    category: 'flower',
    peak: [8, 9, 10],
    wearBest: [8, 9],
    wearGood: [7, 10],
    wearAvoid: [11, 12],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '秋(8〜10月)',
        meaning: '秋の七草の筆頭。しなやかにしなる枝ぶりから、優美さと秋の風情を表す。',
        note: '細い枝に小さな蝶形の花が連なる。単独より「秋草」の一部として描かれることが多い。',
      },
      en: {
        season: 'Autumn (Aug–Oct)',
        meaning:
          'First among the "seven autumn flowers." Its supple, arching branches convey grace and the mood of autumn.',
        note: 'Small butterfly-shaped flowers line slender branches. More often depicted as part of an "autumn grasses" grouping than alone.',
      },
    },
    prompts: [
      'a kimono with bush clover hagi small flowers on arching branches',
      'Japanese textile with autumn bush clover pattern',
    ],
  },
  {
    id: 'momiji',
    nameJa: '紅葉',
    reading: 'もみじ',
    romaji: 'Momiji',
    nameEn: 'Maple leaves',
    category: 'plant',
    peak: [10, 11],
    wearBest: [9, 10],
    wearGood: [11],
    wearAvoid: [12, 1],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '秋(10〜11月)',
        meaning: '秋の深まりと移ろいの美を表す。紅葉狩りの風雅に通じる。',
        note: '桜と組み合わせた「桜楓(おうふう)」は春と秋の両方を含むため季節を問わず着られる。青いままの「青楓」なら初夏の柄になる。',
      },
      en: {
        season: 'Autumn (Oct–Nov)',
        meaning:
          'Represents the deepening of autumn and the beauty of change, echoing the elegant tradition of leaf-viewing (momijigari).',
        note: 'Paired with cherry blossoms as "oh-fu" (spanning both spring and autumn), it can be worn year-round. Depicted still green ("ao-kaede"), it becomes an early-summer motif instead.',
      },
    },
    prompts: [
      'a kimono with red maple leaves momiji autumn pattern',
      'Japanese textile with scattered maple leaf motifs',
    ],
  },
  {
    id: 'suisen',
    nameJa: '水仙',
    reading: 'すいせん',
    romaji: 'Suisen',
    nameEn: 'Narcissus',
    category: 'flower',
    peak: [12, 1, 2],
    wearBest: [12, 1],
    wearGood: [11, 2],
    wearAvoid: [3, 4],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '冬(12〜2月)',
        meaning: '雪の中でも咲くことから、清らかさ・不老を表す。正月の花としても親しまれる。',
        note: '細長い葉と、中心が筒状になった白黄の花が特徴。冬の装いに清潔感を添える。',
      },
      en: {
        season: 'Winter (Dec–Feb)',
        meaning:
          'Blooming even in snow, it symbolizes purity and eternal youth, and is a beloved flower of the New Year.',
        note: 'Slender leaves and a white-and-yellow trumpet-shaped bloom bring a crisp, clean feeling to winter dress.',
      },
    },
    prompts: [
      'a kimono with narcissus daffodil suisen flower pattern',
      'Japanese textile with white narcissus flowers and long leaves',
    ],
  },
  {
    id: 'yuri',
    nameJa: '百合',
    reading: 'ゆり',
    romaji: 'Yuri',
    nameEn: 'Lily',
    category: 'flower',
    peak: [6, 7, 8],
    wearBest: [5, 6, 7],
    wearGood: [4, 8],
    wearAvoid: [9, 10],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '夏(6〜8月)',
        meaning: '純潔・威厳。大輪で華やかなため、夏の訪問着の主役の柄になる。',
        note: '花の大きさゆえに柄としての存在感が強いので、帯や小物は控えめに合わせると品よくまとまる。',
      },
      en: {
        season: 'Summer (Jun–Aug)',
        meaning:
          'Symbolizes purity and dignity. Its large, showy blooms make it a striking centerpiece motif on summer visiting kimono.',
        note: 'Because the flower is so prominent, pairing it with a subdued obi and accessories keeps the overall look elegant.',
      },
    },
    prompts: [
      'a kimono with lily yuri large trumpet flower pattern',
      'Japanese textile with white lily flowers',
    ],
  },
  {
    id: 'shakuyaku',
    nameJa: '芍薬',
    reading: 'しゃくやく',
    romaji: 'Shakuyaku',
    nameEn: 'Chinese peony',
    category: 'flower',
    peak: [5, 6],
    wearBest: [4, 5],
    wearGood: [3, 6],
    wearAvoid: [7, 8],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '初夏(5〜6月)',
        meaning: '「立てば芍薬」と称される美しさの象徴。牡丹と並ぶ華やかな花文様。',
        note: '牡丹が木なのに対し芍薬は草で、葉の切れ込みが浅く茎がすっと立つ。牡丹より一月ほど遅い花。',
      },
      en: {
        season: 'Early summer (May–Jun)',
        meaning:
          'Praised in the old saying "standing like a shakuyaku," it symbolizes graceful beauty and rivals peony as a showy floral motif.',
        note: 'Unlike the woody botan, shakuyaku is an herbaceous plant with shallow leaf notches and an upright stem. It blooms about a month later than botan.',
      },
    },
    prompts: [
      'a kimono with Chinese peony shakuyaku flower pattern',
      'Japanese textile with round full peony flowers on straight stems',
    ],
  },
  {
    id: 'ajisai',
    nameJa: '紫陽花',
    reading: 'あじさい',
    romaji: 'Ajisai',
    nameEn: 'Hydrangea',
    category: 'flower',
    peak: [6, 7],
    wearBest: [5, 6],
    wearGood: [7],
    wearAvoid: [8, 9],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '梅雨(6〜7月)',
        meaning:
          '小花が集まって咲く姿から家族円満・団欒を表す。色が移ろうことから「七変化」とも呼ばれる。',
        note: '梅雨どきの柄。雨や流水の意匠と合わせると季節感が際立つ。',
      },
      en: {
        season: 'Rainy season (Jun–Jul)',
        meaning:
          'Clusters of small blossoms suggest family harmony and togetherness. Its shifting colors have earned it the nickname "seven transformations."',
        note: 'A rainy-season motif that reads even more clearly when paired with rain or flowing-water designs.',
      },
    },
    prompts: [
      'a kimono with hydrangea ajisai clustered small flowers',
      'Japanese textile with blue purple hydrangea ball flowers',
    ],
  },
  {
    id: 'hasu',
    nameJa: '蓮',
    reading: 'はす',
    romaji: 'Hasu',
    nameEn: 'Lotus',
    category: 'flower',
    peak: [7, 8],
    wearBest: [6, 7],
    wearGood: [8],
    wearAvoid: [9, 10],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '夏(7〜8月)',
        meaning: '泥中から清らかな花を咲かせることから、清浄・悟りの象徴。仏教と結びつきが深い。',
        note: '大きな円い葉と淡紅の花。夏の涼感を出す柄として夏物に使われる。',
        taboo: '仏教色が強い文様のため、婚礼などの慶事では避けられることがある。',
      },
      en: {
        season: 'Summer (Jul–Aug)',
        meaning:
          'Rising clean from muddy water, the lotus symbolizes purity and enlightenment, closely tied to Buddhist imagery.',
        note: 'Large round leaves and soft pink blossoms bring a cooling summer feel to summer kimono.',
        taboo: 'Its strong Buddhist association means it is sometimes avoided for celebratory occasions such as weddings.',
      },
    },
    prompts: [
      'a kimono with lotus hasu flower and round leaf pattern',
      'Japanese textile with pink lotus blossoms on water',
    ],
  },
  {
    id: 'sazanka',
    nameJa: '山茶花',
    reading: 'さざんか',
    romaji: 'Sazanka',
    nameEn: 'Sasanqua camellia',
    category: 'flower',
    peak: [11, 12, 1],
    wearBest: [11, 12],
    wearGood: [10, 1],
    wearAvoid: [2, 3],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '初冬(11〜1月)',
        meaning: '寒さに向かう季節に咲くことから、困難に打ち克つ強さを表す。',
        note: '椿によく似るが、山茶花は花弁が一枚ずつ散り、椿より一足早く咲く。冬の入口の柄。',
      },
      en: {
        season: 'Early winter (Nov–Jan)',
        meaning:
          'Blooming as the cold sets in, it symbolizes the strength to overcome hardship.',
        note: 'Closely resembles camellia, but its petals fall one at a time and it blooms slightly earlier — a motif for the doorway into winter.',
      },
    },
    prompts: [
      'a kimono with sasanqua camellia winter flower pattern',
      'Japanese textile with pink sasanqua flowers',
    ],
  },
  {
    id: 'momo',
    nameJa: '桃',
    reading: 'もも',
    romaji: 'Momo',
    nameEn: 'Peach blossom',
    category: 'flower',
    peak: [3],
    wearBest: [2, 3],
    wearGood: [1, 4],
    wearAvoid: [5, 6],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '早春(3月)',
        meaning:
          '古来より邪気を祓う霊力があるとされる。桃の節句(3月3日)の花で、女児の成長を願う柄。',
        note: '桜より丸く、梅より大きい花形。雛祭りの時季に合わせて着ると意味が生きる。',
      },
      en: {
        season: 'Early spring (Mar)',
        meaning:
          'Long believed to ward off evil spirits, peach is the flower of the Girls\' Festival (Mar 3), worn to wish for a daughter\'s healthy growth.',
        note: 'Rounder than sakura and larger than ume. Wearing it around Hinamatsuri gives the motif its fullest meaning.',
      },
    },
    prompts: [
      'a kimono with peach blossom momo flower pattern',
      'Japanese textile with pink peach blossoms on branches',
    ],
  },
  {
    id: 'nanohana',
    nameJa: '菜の花',
    reading: 'なのはな',
    romaji: 'Nanohana',
    nameEn: 'Rapeseed blossom',
    category: 'flower',
    peak: [3, 4],
    wearBest: [2, 3],
    wearGood: [4],
    wearAvoid: [5, 6],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '早春(3〜4月)',
        meaning: '春の訪れと明るさの象徴。一面に咲く景色から、のびやかさを表す。',
        note: '小さな黄色い十字の花が群れて描かれる。蝶や霞と組み合わせると春らしさが増す。',
      },
      en: {
        season: 'Early spring (Mar–Apr)',
        meaning:
          'Symbolizes the arrival of spring and brightness; fields of it in bloom evoke a sense of openness.',
        note: 'Depicted as clusters of small, cross-shaped yellow flowers. Pairing with butterflies or mist strengthens the springtime feel.',
      },
    },
    prompts: [
      'a kimono with yellow rapeseed canola flower field pattern',
      'Japanese textile with small yellow spring flowers',
    ],
  },
  {
    id: 'akikusa',
    nameJa: '秋草',
    reading: 'あきくさ',
    romaji: 'Akikusa',
    nameEn: 'Autumn grasses',
    category: 'plant',
    peak: [8, 9, 10],
    wearBest: [8, 9],
    wearGood: [7, 10],
    wearAvoid: [11, 12],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '秋(8〜10月)',
        meaning:
          '萩・薄・桔梗・撫子など秋の草花を取り合わせた文様。日本的な無常観と風雅を表す。',
        note: '真夏のうちから着はじめて秋の訪れを先取りするのが粋とされる、代表的な「先取り」の柄。',
      },
      en: {
        season: 'Autumn (Aug–Oct)',
        meaning:
          'A grouping of autumn wildflowers and grasses — bush clover, pampas grass, bellflower, dianthus — expressing a distinctly Japanese sense of transience and refinement.',
        note: 'A textbook example of "wearing ahead of the season": stylish dressers begin wearing it in late summer, anticipating autumn\'s arrival.',
      },
    },
    prompts: [
      'a kimono with autumn grasses pattern of mixed wild flowers and pampas',
      'Japanese textile with delicate autumn plants and grasses',
    ],
  },
  {
    id: 'tachibana',
    nameJa: '橘',
    reading: 'たちばな',
    romaji: 'Tachibana',
    nameEn: 'Tachibana citrus',
    category: 'plant',
    peak: null,
    wearBest: [],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年(吉祥文様)',
        meaning:
          '常緑で実を長く保つことから不老長寿・子孫繁栄を表す。有職文様のひとつで格が高い。',
        note: '丸い実と光沢のある葉が対で描かれる。吉祥文様のため季節を問わず着られ、礼装にも向く。',
      },
      en: {
        season: 'Year-round (auspicious motif)',
        meaning:
          'An evergreen that holds its fruit for a long time, symbolizing longevity and flourishing descendants. A prestigious classical court motif (yusoku-monyo).',
        note: 'Depicted as round fruit paired with glossy leaves. Being an auspicious motif, it suits formal wear at any time of year.',
      },
    },
    prompts: [
      'a kimono with tachibana mandarin orange fruit and leaf crest pattern',
      'Japanese textile with round citrus fruit and paired leaves',
    ],
  },
  {
    id: 'hanabishi',
    nameJa: '花菱',
    reading: 'はなびし',
    romaji: 'Hanabishi',
    nameEn: 'Hanabishi diamond floral',
    category: 'geometric',
    peak: null,
    wearBest: [],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年(有職文様)',
        meaning:
          '菱形に花を図案化した有職文様。公家装束に用いられた格の高い柄で、繁栄を表す。',
        note: '特定の花を指さない図案化された文様のため、季節に縛られず一年中着られる。',
      },
      en: {
        season: 'Year-round (classical court motif)',
        meaning:
          'A flower stylized into a diamond shape, once used on court noble attire — a prestigious motif symbolizing prosperity.',
        note: 'Because it does not represent any specific flower, it carries no seasonal restriction and can be worn all year.',
      },
    },
    prompts: [
      'a kimono with hanabishi diamond shaped stylized flower pattern',
      'Japanese textile with geometric rhombus floral motifs',
    ],
  },
  {
    id: 'karakusa',
    nameJa: '唐草',
    reading: 'からくさ',
    romaji: 'Karakusa',
    nameEn: 'Karakusa arabesque',
    category: 'geometric',
    peak: null,
    wearBest: [],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年(吉祥文様)',
        meaning: '蔓が途切れず伸び続けることから、長寿と子孫繁栄を表す。',
        note: '単独でも使われるが、牡丹唐草・菊唐草のように花と組み合わせると、その花も通年の吉祥文様として扱われる。',
      },
      en: {
        season: 'Year-round (auspicious motif)',
        meaning:
          'An unbroken, ever-extending scrolling vine, symbolizing longevity and flourishing descendants.',
        note: 'Used alone, or combined with a flower (e.g. "botan-karakusa," "kiku-karakusa") — in which case that flower, too, becomes a year-round auspicious motif.',
      },
    },
    prompts: [
      'a kimono with karakusa arabesque scrolling vine pattern',
      'Japanese textile with continuous curling vine scrollwork',
    ],
  },

  // ──────────────────── 草木・自然象 ────────────────────
  {
    id: 'matsu',
    nameJa: '松',
    reading: 'まつ',
    romaji: 'Matsu',
    nameEn: 'Pine',
    category: 'plant',
    peak: null,
    wearBest: [12, 1],
    wearGood: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年(冬・正月に映える)',
        meaning:
          '常緑で樹齢が長いことから長寿・不変の象徴。松竹梅の筆頭で、最も格の高い吉祥文様のひとつ。',
        note: '通年の文様だが、正月まわりの装いにはとくにふさわしい。若松・老松・松葉など図案の種類が多い。',
      },
      en: {
        season: 'Year-round (best at New Year)',
        meaning:
          'Evergreen and long-lived, pine symbolizes longevity and constancy. First among the "Three Friends of Winter" and one of the most prestigious auspicious motifs.',
        note: 'Worn year-round, but especially fitting around New Year. Appears in many forms: young pine, old pine, pine needles.',
      },
    },
    prompts: [
      'a kimono with pine tree matsu needle pattern',
      'Japanese textile with stylized pine branches and needles',
    ],
  },
  {
    id: 'take',
    nameJa: '竹',
    reading: 'たけ',
    romaji: 'Take',
    nameEn: 'Bamboo',
    category: 'plant',
    peak: null,
    wearBest: [],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年(夏に涼やか)',
        meaning:
          'まっすぐ伸び、しなって折れないことから、成長・清廉・強さを表す。松竹梅のひとつ。',
        note: '通年着られるが、青々とした笹葉の意匠は夏に涼しげで好まれる。',
      },
      en: {
        season: 'Year-round (cooling in summer)',
        meaning:
          'Growing straight and bending without breaking, bamboo symbolizes growth, integrity, and resilience. One of the "Three Friends of Winter."',
        note: 'Worn year-round, though fresh green bamboo-leaf designs are especially favored for their cooling look in summer.',
      },
    },
    prompts: [
      'a kimono with bamboo take stalk and leaf pattern',
      'Japanese textile with green bamboo culms and leaves',
    ],
  },
  {
    id: 'shochikubai',
    nameJa: '松竹梅',
    reading: 'しょうちくばい',
    romaji: 'Shochikubai',
    nameEn: 'Pine, bamboo and plum',
    category: 'auspicious',
    peak: null,
    wearBest: [12, 1],
    wearGood: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年(慶事の代表柄)',
        meaning:
          '寒さに耐える三つの植物「歳寒三友」を組み合わせた、最も代表的な吉祥文様。おめでたい席の定番。',
        note: '梅単体なら冬の柄だが、松竹梅として組めば季節を問わない祝いの柄になる。婚礼・お宮参り・成人式など慶事全般に向く。',
      },
      en: {
        season: 'Year-round (the classic celebratory motif)',
        meaning:
          'The "Three Friends of Winter" combined — pine, bamboo, and plum — the single most iconic auspicious motif, a staple for celebrations.',
        note: 'Plum alone is a winter motif, but combined as shochikubai it becomes a celebratory design worn any time of year — fitting for weddings, shrine visits, and coming-of-age ceremonies.',
      },
    },
    prompts: [
      'a kimono with pine bamboo and plum shochikubai auspicious pattern',
      'Japanese textile combining pine needles, bamboo and plum blossoms',
    ],
  },
  {
    id: 'yukiwa',
    nameJa: '雪輪',
    reading: 'ゆきわ',
    romaji: 'Yukiwa',
    nameEn: 'Yukiwa snow ring',
    category: 'nature',
    peak: [12, 1, 2],
    wearBest: [11, 12, 1],
    wearGood: [2, 6, 7, 8],
    wearAvoid: [4, 5],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '冬(11〜1月)/夏の涼感',
        meaning: '雪の結晶を円く図案化した文様。雪は豊作の兆しとされ、実りを願う意味を持つ。',
        note: '冬の柄でありながら、夏物では「見た目に涼しい」柄として好んで使われる、季節がふたつある珍しい文様。',
      },
      en: {
        season: 'Winter (Nov–Jan) / cooling in summer',
        meaning:
          'A snow crystal stylized into a circle. Snow was seen as an omen of a good harvest, so the motif carries a wish for abundance.',
        note: 'An unusual motif with two seasons: worn as a winter design, but also popular on summer fabrics for its visually cooling effect.',
      },
    },
    prompts: [
      'a kimono with yukiwa snowflake circle pattern',
      'Japanese textile with round stylized snow crystal motifs',
    ],
  },
  {
    id: 'seigaiha',
    nameJa: '青海波',
    reading: 'せいがいは',
    romaji: 'Seigaiha',
    nameEn: 'Seigaiha wave',
    category: 'geometric',
    peak: null,
    wearBest: [],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年(夏に涼やか)',
        meaning:
          '無限に広がる穏やかな波から、平穏な暮らしがいつまでも続くことを願う吉祥文様。',
        note: '通年の文様だが、水を連想させるため夏に好まれる。地紋として使われることも多い。',
      },
      en: {
        season: 'Year-round (cooling in summer)',
        meaning:
          'Endless, gentle repeating waves express a wish for peaceful life to continue forever — an auspicious motif.',
        note: 'Worn year-round, though its watery association makes it especially popular in summer. Often used as a background ground-pattern.',
      },
    },
    prompts: [
      'a kimono with seigaiha overlapping wave fan pattern',
      'Japanese textile with repeating concentric arc wave motifs',
    ],
  },
  {
    id: 'ryusui',
    nameJa: '流水',
    reading: 'りゅうすい',
    romaji: 'Ryusui',
    nameEn: 'Flowing water',
    category: 'nature',
    peak: null,
    wearBest: [6, 7, 8],
    wearGood: [1, 2, 3, 4, 5, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年(夏に最も映える)',
        meaning: '流れる水は淀まないことから、苦難を洗い流し清める意味を持つ。',
        note: '単独では通年だが、桜と組めば春、紅葉と組めば秋(龍田川)というように、合わせる柄で季節が決まる。',
      },
      en: {
        season: 'Year-round (best in summer)',
        meaning: 'Ever-flowing water, which never stagnates, symbolizes washing away hardship and purification.',
        note: 'Year-round on its own, but the season shifts depending on what it is paired with — spring with cherry blossoms, autumn with maple leaves ("Tatsuta River").',
      },
    },
    prompts: [
      'a kimono with flowing water ryusui curved line pattern',
      'Japanese textile with stylized stream and water currents',
    ],
  },
  {
    id: 'kumo',
    nameJa: '雲取り',
    reading: 'くもどり',
    romaji: 'Kumodori',
    nameEn: 'Cloud motif',
    category: 'nature',
    peak: null,
    wearBest: [],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年',
        meaning: '雲は雨をもたらし実りを生むことから吉兆とされる。形を変え続ける姿は変転と無限を表す。',
        note: '雲の輪郭で画面を区切り、その中に季節の花を描く構図が多い。その場合の季節は中の花で決まる。',
      },
      en: {
        season: 'Year-round',
        meaning:
          'Clouds bring rain and abundance, making them an omen of good fortune. Their ever-shifting shape suggests change and the infinite.',
        note: 'Often used as an outline dividing the design into sections, each filled with a seasonal flower — in which case the season follows that flower.',
      },
    },
    prompts: [
      'a kimono with stylized cloud kumo motif pattern',
      'Japanese textile with curling cloud bands',
    ],
  },

  // ────────────────── 吉祥・器物・生き物 ──────────────────
  {
    id: 'ougi',
    nameJa: '扇・扇面',
    reading: 'おうぎ・せんめん',
    romaji: 'Ogi / Senmen',
    nameEn: 'Folding fan',
    category: 'auspicious',
    peak: null,
    wearBest: [],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年(慶事向き)',
        meaning: '末に向かって広がる形から「末広がり」= 繁栄・発展を表す。祝いの席の定番文様。',
        note: '扇の面の中に季節の花を描く「扇面散らし」も多く、その場合は中の花が季節を決める。',
      },
      en: {
        season: 'Year-round (celebratory)',
        meaning:
          'Its shape, widening toward the end, represents "spreading prosperity" — a staple motif for celebrations.',
        note: 'Often scattered across the fabric with seasonal flowers painted inside each fan ("senmen-chirashi"), in which case the flowers set the season.',
      },
    },
    prompts: [
      'a kimono with folding fan ogi sensu pattern',
      'Japanese textile with scattered decorative folding fans',
    ],
  },
  {
    id: 'noshi',
    nameJa: '熨斗',
    reading: 'のし',
    romaji: 'Noshi',
    nameEn: 'Noshi ribbon bundle',
    category: 'auspicious',
    peak: null,
    wearBest: [],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年(慶事向き)',
        meaning: '進物に添える熨斗を束ねた「束ね熨斗」は、多くの人からの祝福が集まることを表す。',
        note: '振袖や留袖の主役になる華やかな柄。慶事全般に使え、季節を選ばない。',
      },
      en: {
        season: 'Year-round (celebratory)',
        meaning:
          'A bundle of the decorative noshi strips traditionally attached to gifts, representing blessings gathered from many people.',
        note: 'A showy motif often used as the centerpiece on furisode or tomesode. Suitable for celebrations at any time of year.',
      },
    },
    prompts: [
      'a kimono with bundled noshi ribbon strips pattern',
      'Japanese textile with long colorful ribbon bundle motif',
    ],
  },
  {
    id: 'temari',
    nameJa: '手毬',
    reading: 'てまり',
    romaji: 'Temari',
    nameEn: 'Temari ball',
    category: 'auspicious',
    peak: null,
    wearBest: [],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年(正月・祝いに映える)',
        meaning:
          '丸い形から円満を、糸を幾重にも巻く手間から「大切に育てられた娘」を表す。女児の成長を願う柄。',
        note: '七五三や成人式など、子どもや若い女性の祝い着に多い。正月の装いにもよく合う。',
      },
      en: {
        season: 'Year-round (best at New Year and celebrations)',
        meaning:
          'Its round shape suggests harmony, and the many wound threads evoke a daughter raised with great care — a motif wishing for a girl\'s healthy growth.',
        note: 'Common on celebratory kimono for children and young women, such as at Shichi-Go-San or coming-of-age ceremonies. Also suits New Year attire.',
      },
    },
    prompts: [
      'a kimono with temari decorative thread ball pattern',
      'Japanese textile with round embroidered ball motifs',
    ],
  },
  {
    id: 'tsuru',
    nameJa: '鶴',
    reading: 'つる',
    romaji: 'Tsuru',
    nameEn: 'Crane',
    category: 'creature',
    peak: null,
    wearBest: [],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年(慶事の代表柄)',
        meaning:
          '「鶴は千年」の長寿と、生涯つがいを変えないことから夫婦円満を表す。婚礼衣装の代表的な文様。',
        note: '格の高い吉祥文様で、留袖・振袖・打掛に広く使われる。季節を問わない。',
      },
      en: {
        season: 'Year-round (the classic celebratory motif)',
        meaning:
          'Per the saying "the crane lives a thousand years," it symbolizes longevity, and because cranes mate for life, marital harmony as well — a defining motif for wedding attire.',
        note: 'A high-status auspicious motif, widely used on tomesode, furisode, and uchikake. Worn regardless of season.',
      },
    },
    prompts: [
      'a kimono with crane tsuru bird pattern',
      'Japanese textile with flying white cranes',
    ],
  },
  {
    id: 'kikko',
    nameJa: '亀甲',
    reading: 'きっこう',
    romaji: 'Kikko',
    nameEn: 'Tortoiseshell hexagon',
    category: 'geometric',
    peak: null,
    wearBest: [],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年(吉祥文様)',
        meaning:
          '亀の甲羅を模した六角形の連続文様。「鶴は千年、亀は万年」の長寿を表す有職文様。',
        note: '地紋として使われることが多く、中に花を入れた「亀甲花菱」は格の高い礼装向けの柄。',
      },
      en: {
        season: 'Year-round (auspicious motif)',
        meaning:
          'A repeating hexagonal lattice modeled on a tortoise shell. Per the saying "the crane a thousand years, the tortoise ten thousand," it is a classical motif for longevity.',
        note: 'Often used as a ground pattern. Filled with a floral diamond ("kikko-hanabishi"), it becomes a high-status motif fit for formal wear.',
      },
    },
    prompts: [
      'a kimono with kikko hexagonal tortoiseshell lattice pattern',
      'Japanese textile with repeating hexagon geometric grid',
    ],
  },
  {
    id: 'chou',
    nameJa: '蝶',
    reading: 'ちょう',
    romaji: 'Cho',
    nameEn: 'Butterfly',
    category: 'creature',
    peak: [3, 4, 5],
    wearBest: [3, 4, 5],
    wearGood: [1, 2, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '春(3〜5月)/通年可',
        meaning: '幼虫から蛹を経て美しく飛び立つ姿から、成長・変化・立身出世を表す。',
        note: '春の柄として使われることが多いが、有職文様としての「向い蝶」などは通年着られる。',
      },
      en: {
        season: 'Spring (Mar–May) / year-round when stylized',
        meaning:
          'Its transformation from larva to chrysalis to graceful flight symbolizes growth, change, and rising in life.',
        note: 'Most often a spring motif, but classical stylized forms such as "facing butterflies" (mukai-cho) are worn year-round.',
      },
    },
    prompts: ['a kimono with butterfly cho pattern', 'Japanese textile with stylized butterflies'],
  },
  {
    id: 'tombo',
    nameJa: '蜻蛉',
    reading: 'とんぼ',
    romaji: 'Tombo',
    nameEn: 'Dragonfly',
    category: 'creature',
    peak: [8, 9, 10],
    wearBest: [8, 9],
    wearGood: [7, 10],
    wearAvoid: [11, 12],
    stylizedYearRound: false,
    text: {
      ja: {
        season: '秋(8〜10月)',
        meaning: '前にしか進まないことから「勝ち虫」と呼ばれ、勝利・前進の象徴。武具の意匠にも多い。',
        note: '男物や男児の祝い着に好まれる。秋の柄だが、涼を呼ぶ意匠として夏物にも使われる。',
      },
      en: {
        season: 'Autumn (Aug–Oct)',
        meaning:
          'Never flying backward, the dragonfly was called the "victory insect," symbolizing progress and triumph — a common motif on armor.',
        note: "A favorite on men's and boys' celebratory kimono. Primarily an autumn motif, but also used on summer fabrics for its cooling effect.",
      },
    },
    prompts: [
      'a kimono with dragonfly tombo pattern',
      'Japanese textile with dragonflies among grasses',
    ],
  },
  {
    id: 'usagi',
    nameJa: '兎',
    reading: 'うさぎ',
    romaji: 'Usagi',
    nameEn: 'Rabbit',
    category: 'creature',
    peak: [8, 9],
    wearBest: [8, 9],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '秋(月見)/通年可',
        meaning: '跳ねる姿から飛躍・向上を、多産であることから子孫繁栄を表す。',
        note: '月や薄と組み合わせた「月に兎」は月見の頃の柄。単独の兎文なら季節を問わない。',
      },
      en: {
        season: 'Autumn (moon-viewing) / year-round when solo',
        meaning:
          'Its leaping suggests advancement and growth, and its fertility suggests flourishing descendants.',
        note: 'Paired with the moon and pampas grass ("rabbit under the moon"), it becomes a moon-viewing-season motif; a solo rabbit motif carries no seasonal restriction.',
      },
    },
    prompts: ['a kimono with rabbit usagi pattern', 'Japanese textile with white rabbits and moon'],
  },
  {
    id: 'houou',
    nameJa: '鳳凰',
    reading: 'ほうおう',
    romaji: 'Hoo',
    nameEn: 'Phoenix',
    category: 'creature',
    peak: null,
    wearBest: [],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年(最も格の高い文様のひとつ)',
        meaning: '聖なる君主が現れる時に姿を見せるという伝説の霊鳥。平和と繁栄の瑞兆。',
        note: '格が非常に高いため、婚礼衣装や留袖など礼装に用いられる。普段着には重すぎる。',
      },
      en: {
        season: 'Year-round (one of the most prestigious motifs)',
        meaning:
          'A legendary bird said to appear when a sage ruler comes to power — an omen of peace and prosperity.',
        note: 'Its status is very high, reserved for formal wear such as wedding attire and tomesode. Too grand for everyday dress.',
      },
    },
    prompts: [
      'a kimono with phoenix hoo mythical bird pattern',
      'Japanese textile with ornate phoenix and long tail feathers',
    ],
  },
  {
    id: 'asanoha',
    nameJa: '麻の葉',
    reading: 'あさのは',
    romaji: 'Asanoha',
    nameEn: 'Asanoha hemp leaf',
    category: 'geometric',
    peak: null,
    wearBest: [],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年',
        meaning:
          '麻はまっすぐ丈夫に育つことから、子どもの健やかな成長を願う文様。魔除けの意味も持つ。',
        note: '産着や子どもの着物の定番。幾何文様なので季節を問わず、浴衣から小紋まで幅広く使われる。',
      },
      en: {
        season: 'Year-round',
        meaning:
          'Hemp grows straight and strong, so this geometric star pattern carries a wish for a child\'s healthy growth, and doubles as a protective charm.',
        note: "A classic for baby clothes and children's kimono. Being a geometric motif, it carries no seasonal restriction and appears on everything from yukata to fine-pattern kimono.",
      },
    },
    prompts: [
      'a kimono with asanoha hemp leaf star geometric pattern',
      'Japanese textile with repeating six-pointed hemp leaf lattice',
    ],
  },
  {
    id: 'shippou',
    nameJa: '七宝',
    reading: 'しっぽう',
    romaji: 'Shippo',
    nameEn: 'Shippo interlocking circles',
    category: 'geometric',
    peak: null,
    wearBest: [],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年(吉祥文様)',
        meaning:
          '円が四方に無限に連なることから、円満・調和・ご縁が続くことを表す。仏教の七つの宝に由来する。',
        note: '地紋や小紋によく使われる。中央に花を入れた「七宝花菱」は格が上がり礼装にも向く。',
      },
      en: {
        season: 'Year-round (auspicious motif)',
        meaning:
          'Circles endlessly interlocking in every direction, symbolizing harmony and connections that continue without end. Named for the seven treasures of Buddhism.',
        note: 'A common ground pattern. Filled with a flower at the center ("shippo-hanabishi"), it gains status and suits formal wear.',
      },
    },
    prompts: [
      'a kimono with shippo overlapping circle geometric pattern',
      'Japanese textile with interlocking circles forming petal shapes',
    ],
  },
  {
    id: 'ichimatsu',
    nameJa: '市松',
    reading: 'いちまつ',
    romaji: 'Ichimatsu',
    nameEn: 'Ichimatsu checkerboard',
    category: 'geometric',
    peak: null,
    wearBest: [],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年',
        meaning: '途切れず続く格子から、繁栄と発展が絶えないことを表す。',
        note: '江戸時代の役者・佐野川市松が袴に用いて流行したのが名の由来。モダンな印象で洋風の場にも合わせやすい。',
      },
      en: {
        season: 'Year-round',
        meaning: 'An unbroken repeating checkered grid, symbolizing prosperity and growth without interruption.',
        note: 'Named after Edo-period kabuki actor Sanogawa Ichimatsu, who made it fashionable on his hakama. Reads as modern and pairs easily with Western-style settings.',
      },
    },
    prompts: [
      'a kimono with ichimatsu checkerboard checked pattern',
      'Japanese textile with alternating square checker grid',
    ],
  },
  {
    id: 'yagasuri',
    nameJa: '矢絣',
    reading: 'やがすり',
    romaji: 'Yagasuri',
    nameEn: 'Yagasuri arrow feather',
    category: 'geometric',
    peak: null,
    wearBest: [],
    wearGood: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wearAvoid: [],
    stylizedYearRound: true,
    text: {
      ja: {
        season: '通年(卒業式の定番)',
        meaning:
          '放った矢が戻らないことから、まっすぐ進む意志を表す。的を射る=幸運をつかむ意味も。',
        note: '袴と合わせた卒業式の装いの定番。明治・大正の女学生風の趣がある。',
        taboo: '「矢が戻らない」ことを縁起がよいとする説と、嫁ぎ先から戻らないと解する説の両方があり、婚礼で用いる際は好みが分かれる。',
      },
      en: {
        season: 'Year-round (a graduation-day staple)',
        meaning:
          'An arrow that never returns once shot symbolizes forward resolve; hitting the mark also suggests seizing good fortune.',
        note: 'A staple with hakama at graduation ceremonies, evoking the schoolgirl style of the Meiji and Taisho eras.',
        taboo: 'Opinion is split on "the arrow never returns": some read it as auspicious, others as an unwelcome image of a bride never returning home — so views vary for wedding use.',
      },
    },
    prompts: [
      'a kimono with yagasuri arrow feather stripe pattern',
      'Japanese textile with repeating arrow fletching motifs',
    ],
  },
]

/** id からの逆引き。 */
export const MOTIF_BY_ID = new Map(MOTIFS.map((m) => [m.id, m]))
