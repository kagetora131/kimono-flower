import type { Fitness, Month } from '../data/types'
import { FITNESS_LABEL, FITNESS_MARK, MONTH_NAMES_JA, type MonthFitness } from '../logic/season'

const FITNESS_ORDER: Fitness[] = ['best', 'good', 'caution', 'avoid']

interface Props {
  months: MonthFitness[]
  targetMonth: Month
  onSelectMonth: (month: Month) => void
}

export function SeasonHeatmap({ months, targetMonth, onSelectMonth }: Props) {
  return (
    <div>
      <div className="heatmap">
        {months.map(({ month, fitness }) => (
          <button
            key={month}
            type="button"
            className={`heatcell heatcell--${fitness}${month === targetMonth ? ' heatcell--target' : ''}`}
            onClick={() => onSelectMonth(month)}
            title={`${month}月(${MONTH_NAMES_JA[month - 1]}) — ${FITNESS_LABEL[fitness]}`}
            aria-label={`${month}月 ${FITNESS_LABEL[fitness]}`}
            aria-pressed={month === targetMonth}
          >
            <span className="heatcell__month">{month}</span>
            <span className="heatcell__mark" aria-hidden="true">
              {FITNESS_MARK[fitness]}
            </span>
          </button>
        ))}
      </div>

      <div className="legend">
        {FITNESS_ORDER.map((f) => (
          <span key={f} className="legend__item">
            <span className="legend__swatch" style={{ background: `var(--fit-${f})` }} />
            {FITNESS_MARK[f]} {FITNESS_LABEL[f]}
          </span>
        ))}
      </div>
    </div>
  )
}
