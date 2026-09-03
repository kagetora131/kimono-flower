import { MOTIF_BY_ID } from '../data/motifs'
import type { Lang } from '../data/types'
import type { Candidate } from '../recognizers/types'

interface Props {
  candidates: Candidate[]
  selected: string[]
  onToggle: (motifId: string) => void
  lang: Lang
}

export function CandidateList({ candidates, selected, onToggle, lang }: Props) {
  const top = candidates[0]?.score ?? 1

  return (
    <div className="candidates">
      {candidates.map((c) => {
        const motif = MOTIF_BY_ID.get(c.motifId)
        if (!motif) return null
        const on = selected.includes(c.motifId)
        const name = lang === 'en' ? motif.nameEn : motif.nameJa
        const sub = lang === 'en' ? motif.romaji : motif.reading
        return (
          <button
            key={c.motifId}
            type="button"
            className={`candidate${on ? ' candidate--on' : ''}`}
            aria-pressed={on}
            onClick={() => onToggle(c.motifId)}
          >
            <span className="candidate__check" aria-hidden="true">
              ✓
            </span>
            <span className="candidate__body">
              <span className="candidate__name">
                {name}
                <span className="candidate__reading">{sub}</span>
              </span>
              <span className="candidate__season">{motif.text[lang].season}</span>
            </span>
            <span className="candidate__score" aria-hidden="true">
              <span className="candidate__bar">
                <span style={{ width: `${Math.round((c.score / top) * 100)}%` }} />
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
