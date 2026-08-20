import type { MotifCategory } from '../data/types'
import { FITNESS_LABEL, type MotifProfile } from '../logic/season'

const CATEGORY_LABEL: Record<MotifCategory, string> = {
  flower: '花',
  plant: '草木',
  nature: '自然',
  auspicious: '吉祥・器物',
  creature: '生き物',
  geometric: '幾何文様',
}

export function MotifCard({ profile }: { profile: MotifProfile }) {
  const { motif, months } = profile

  return (
    <article className="motif-card">
      <div className="motif-card__head">
        <h3 className="motif-card__name">{motif.nameJa}</h3>
        <span className="motif-card__en">
          {motif.reading} / {motif.nameEn}
        </span>
        <span className="badge badge--cat">{CATEGORY_LABEL[motif.category]}</span>
      </div>
      <div className="motif-card__season">{motif.season}</div>

      <dl>
        <dt>意味・由来</dt>
        <dd>{motif.meaning}</dd>
        <dt>着こなしの目安</dt>
        <dd>{motif.note}</dd>
      </dl>

      <div className="motif-card__strip" aria-hidden="true">
        {months.map(({ month, fitness }) => (
          <span
            key={month}
            style={{ background: `var(--fit-${fitness})` }}
            title={`${month}月 ${FITNESS_LABEL[fitness]}`}
          />
        ))}
      </div>

      {motif.taboo && <p className="notice">場面についての注意 — {motif.taboo}</p>}
    </article>
  )
}
