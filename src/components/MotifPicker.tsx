import { useMemo, useState } from 'react'
import { MOTIFS } from '../data/motifs'
import type { Lang, MotifCategory } from '../data/types'
import { t } from '../i18n/strings'

const CATEGORY_KEY: Record<MotifCategory | 'all', Parameters<typeof t>[1]> = {
  all: 'filterAll',
  flower: 'catFlower',
  plant: 'catPlant',
  nature: 'catNature',
  auspicious: 'catAuspicious',
  creature: 'catCreature',
  geometric: 'catGeometric',
}

const ORDER: (MotifCategory | 'all')[] = [
  'all',
  'flower',
  'plant',
  'nature',
  'creature',
  'auspicious',
  'geometric',
]

interface Props {
  selected: string[]
  onToggle: (motifId: string) => void
  lang: Lang
}

export function MotifPicker({ selected, onToggle, lang }: Props) {
  const [filter, setFilter] = useState<MotifCategory | 'all'>('all')

  const list = useMemo(
    () => (filter === 'all' ? MOTIFS : MOTIFS.filter((m) => m.category === filter)),
    [filter],
  )

  return (
    <div>
      <div className="picker__filters">
        {ORDER.map((key) => (
          <button
            key={key}
            type="button"
            className={`chip${filter === key ? ' chip--on' : ''}`}
            onClick={() => setFilter(key)}
          >
            {t(lang, CATEGORY_KEY[key])}
          </button>
        ))}
      </div>

      <div className="picker__grid">
        {list.map((motif) => {
          const on = selected.includes(motif.id)
          return (
            <button
              key={motif.id}
              type="button"
              className={`picker__item${on ? ' picker__item--on' : ''}`}
              aria-pressed={on}
              onClick={() => onToggle(motif.id)}
            >
              <b>{lang === 'en' ? motif.nameEn : motif.nameJa}</b>
              <small>{motif.text[lang].season}</small>
            </button>
          )
        })}
      </div>
    </div>
  )
}
