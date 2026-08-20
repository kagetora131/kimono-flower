import { useMemo, useState } from 'react'
import { MOTIFS } from '../data/motifs'
import type { MotifCategory } from '../data/types'

const CATEGORY_LABEL: Record<MotifCategory | 'all', string> = {
  all: 'すべて',
  flower: '花',
  plant: '草木',
  nature: '自然',
  auspicious: '吉祥・器物',
  creature: '生き物',
  geometric: '幾何',
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
}

export function MotifPicker({ selected, onToggle }: Props) {
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
            {CATEGORY_LABEL[key]}
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
              <b>{motif.nameJa}</b>
              <small>{motif.season}</small>
            </button>
          )
        })}
      </div>
    </div>
  )
}
