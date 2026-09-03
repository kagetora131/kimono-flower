import type { Fitness, Lang, Month } from '../data/types'
import { FITNESS_LABEL, FITNESS_MARK, MONTH_NAMES_JA, type MonthFitness } from '../logic/season'

const FITNESS_ORDER: Fitness[] = ['best', 'good', 'caution', 'avoid']

const MONTH_ABBR_EN = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

interface Props {
  months: MonthFitness[]
  targetMonth: Month
  onSelectMonth: (month: Month) => void
  lang: Lang
}

export function SeasonHeatmap({ months, targetMonth, onSelectMonth, lang }: Props) {
  return (
    <div>
      <div className="heatmap">
        {months.map(({ month, fitness }) => {
          const monthLabel = lang === 'en' ? MONTH_ABBR_EN[month - 1] : `${month}`
          const fullLabel =
            lang === 'en'
              ? `${MONTH_ABBR_EN[month - 1]} — ${FITNESS_LABEL.en[fitness]}`
              : `${month}月(${MONTH_NAMES_JA[month - 1]}) — ${FITNESS_LABEL.ja[fitness]}`
          return (
            <button
              key={month}
              type="button"
              className={`heatcell heatcell--${fitness}${month === targetMonth ? ' heatcell--target' : ''}`}
              onClick={() => onSelectMonth(month)}
              title={fullLabel}
              aria-label={fullLabel}
              aria-pressed={month === targetMonth}
            >
              <span className="heatcell__month">{monthLabel}</span>
              <span className="heatcell__mark" aria-hidden="true">
                {FITNESS_MARK[fitness]}
              </span>
            </button>
          )
        })}
      </div>

      <div className="legend">
        {FITNESS_ORDER.map((f) => (
          <span key={f} className="legend__item">
            <span className="legend__swatch" style={{ background: `var(--fit-${f})` }} />
            {FITNESS_MARK[f]} {FITNESS_LABEL[lang][f]}
          </span>
        ))}
      </div>
    </div>
  )
}
