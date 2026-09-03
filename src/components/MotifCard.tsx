import type { Lang, MotifCategory } from '../data/types'
import { t } from '../i18n/strings'
import { FITNESS_LABEL, type MotifProfile } from '../logic/season'

const CATEGORY_KEY: Record<MotifCategory, Parameters<typeof t>[1]> = {
  flower: 'catFlower',
  plant: 'catPlant',
  nature: 'catNature',
  auspicious: 'catAuspicious',
  creature: 'catCreature',
  geometric: 'catGeometric',
}

export function MotifCard({ profile, lang }: { profile: MotifProfile; lang: Lang }) {
  const { motif, months } = profile
  const text = motif.text[lang]

  return (
    <article className="motif-card">
      <div className="motif-card__head">
        <h3 className="motif-card__name">{lang === 'en' ? motif.nameEn : motif.nameJa}</h3>
        <span className="motif-card__en">
          {lang === 'en' ? `${motif.romaji} / ${motif.nameJa}` : `${motif.reading} / ${motif.nameEn}`}
        </span>
        <span className="badge badge--cat">{t(lang, CATEGORY_KEY[motif.category])}</span>
      </div>
      <div className="motif-card__season">{text.season}</div>

      <dl>
        <dt>{lang === 'en' ? 'Meaning & origin' : '意味・由来'}</dt>
        <dd>{text.meaning}</dd>
        <dt>{lang === 'en' ? 'Wearing notes' : '着こなしの目安'}</dt>
        <dd>{text.note}</dd>
      </dl>

      <div className="motif-card__strip" aria-hidden="true">
        {months.map(({ month, fitness }) => (
          <span
            key={month}
            style={{ background: `var(--fit-${fitness})` }}
            title={`${month} — ${FITNESS_LABEL[lang][fitness]}`}
          />
        ))}
      </div>

      {text.taboo && (
        <p className="notice">
          {t(lang, 'tabooLabel')} — {text.taboo}
        </p>
      )}
    </article>
  )
}
