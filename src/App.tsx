import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CandidateList } from './components/CandidateList'
import { ImagePicker } from './components/ImagePicker'
import { MotifCard } from './components/MotifCard'
import { MotifPicker } from './components/MotifPicker'
import { SeasonHeatmap } from './components/SeasonHeatmap'
import type { Lang, Month } from './data/types'
import { t } from './i18n/strings'
import { MONTH_NAMES_JA, MONTHS, buildVerdict } from './logic/season'
import { localClipRecognizer } from './recognizers/localClip'
import type { LoadProgress, RecognitionResult } from './recognizers/types'

const CONFIDENCE_KEY = {
  high: 'confHigh',
  medium: 'confMedium',
  low: 'confLow',
} as const

const MONTH_ABBR_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const LANG_STORAGE_KEY = 'hana-awase:lang'

function detectInitialLang(): Lang {
  // URLに ?lang=ja / ?lang=en があれば最優先(ホームページの表示言語のまま
  // アプリを開けるようにするため)。
  try {
    const urlLang = new URLSearchParams(window.location.search).get('lang')
    if (urlLang === 'ja' || urlLang === 'en') return urlLang
  } catch {
    // ignore
  }
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY)
    if (saved === 'ja' || saved === 'en') return saved
  } catch {
    // localStorage が使えない環境ではブラウザの言語設定にフォールバックする。
  }
  return navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'en'
}

function formatBytes(n: number): string {
  return `${(n / 1024 / 1024).toFixed(0)}MB`
}

function progressMessage(p: LoadProgress, lang: Lang): string {
  if (p.phase === 'downloading') {
    const label = t(lang, 'progressDownloading')
    if (p.loadedBytes === undefined || p.totalBytes === undefined) return label
    const sizes = `${formatBytes(p.loadedBytes)} / ${formatBytes(p.totalBytes)}`
    return lang === 'en' ? `${label} (${sizes})` : `${label}（${sizes}）`
  }
  return t(lang, 'progressIndexing')
}

export default function App() {
  const [lang, setLang] = useState<Lang>(detectInitialLang)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [result, setResult] = useState<RecognitionResult | null>(null)
  const [selected, setSelected] = useState<string[]>([])
  const [targetMonth, setTargetMonth] = useState<Month>(new Date().getMonth() + 1)
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState<LoadProgress | null>(null)
  const [progressLabel, setProgressLabel] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)

  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang)
    } catch {
      // 保存できなくても表示自体は問題なく続けられる。
    }
  }, [lang])

  // ?lang= で開かれた場合、初期表示には反映済みなのでURLからは消しておく。
  useEffect(() => {
    try {
      const url = new URL(window.location.href)
      if (url.searchParams.has('lang')) {
        url.searchParams.delete('lang')
        window.history.replaceState(null, '', url.pathname + url.search + url.hash)
      }
    } catch {
      // ignore
    }
  }, [])

  // 生成した object URL は差し替え・破棄のたびに解放する。
  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl)
    }
  }, [imageUrl])

  const handlePick = useCallback((file: File) => {
    setImageUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
    setResult(null)
    setSelected([])
    setError(null)
  }, [])

  const handleClear = useCallback(() => {
    setImageUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setResult(null)
    setSelected([])
    setError(null)
  }, [])

  const toggle = useCallback((motifId: string) => {
    setSelected((prev) =>
      prev.includes(motifId) ? prev.filter((id) => id !== motifId) : [...prev, motifId],
    )
  }, [])

  const analyze = useCallback(async () => {
    if (!imageUrl) return
    setBusy(true)
    setError(null)
    const onProgress = (p: LoadProgress) => {
      setProgress(p)
      setProgressLabel(progressMessage(p, lang))
    }
    onProgress({ ratio: 0, phase: 'downloading' })
    try {
      await localClipRecognizer.prepare(onProgress)
      setProgress({ ratio: 1, phase: 'indexing' })
      setProgressLabel(t(lang, 'progressAnalyzing'))
      const res = await localClipRecognizer.recognize(imageUrl)
      setResult(res)
      // 確信を持てた時だけ、最有力候補をあらかじめ選んでおく。
      setSelected(res.inconclusive ? [] : res.candidates.slice(0, 1).map((c) => c.motifId))
      if (res.inconclusive) setPickerOpen(true)
    } catch (e) {
      console.error(e)
      setError(t(lang, 'errorAnalyze'))
    } finally {
      setBusy(false)
      setProgress(null)
    }
  }, [imageUrl, lang])

  const verdict = useMemo(() => buildVerdict(selected, targetMonth, lang), [selected, targetMonth, lang])

  // 判定が出たら結果までスクロールする。
  useEffect(() => {
    if (verdict && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    // 月・言語の切り替えでは動かさない。柄の構成が変わった時だけ。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected.join(',')])

  const monthLabel = (m: Month) => (lang === 'en' ? MONTH_ABBR_EN[m - 1] : `${m}月（${MONTH_NAMES_JA[m - 1]}）`)

  return (
    <div className="app">
      <header className="masthead">
        <div className="lang-toggle" role="group" aria-label={t(lang, 'langToggleLabel')}>
          <button
            type="button"
            className={`lang-toggle__btn${lang === 'ja' ? ' lang-toggle__btn--on' : ''}`}
            aria-pressed={lang === 'ja'}
            onClick={() => setLang('ja')}
          >
            日本語
          </button>
          <button
            type="button"
            className={`lang-toggle__btn${lang === 'en' ? ' lang-toggle__btn--on' : ''}`}
            aria-pressed={lang === 'en'}
            onClick={() => setLang('en')}
          >
            English
          </button>
        </div>
        <h1 className="masthead__title">{t(lang, 'title')}</h1>
        <p className="masthead__lead">{t(lang, 'lead')}</p>
        <div className="masthead__rule" />
      </header>

      {/* ── 1. 写真 ── */}
      <section className="panel">
        <h2 className="panel__title">{t(lang, 'step1Title')}</h2>
        <p className="panel__note">{t(lang, 'step1Note')}</p>
        <ImagePicker imageUrl={imageUrl} onPick={handlePick} onClear={handleClear} lang={lang} />

        {imageUrl && (
          <>
            <div className="btn-row" style={{ marginTop: 16 }}>
              <button type="button" className="btn btn--accent" onClick={analyze} disabled={busy}>
                {busy ? t(lang, 'btnAnalyzing') : t(lang, 'btnAnalyze')}
              </button>
            </div>
            {!result && !busy && <p className="notice notice--tip">{t(lang, 'setupTip')}</p>}
          </>
        )}

        {progress && (
          <div style={{ marginTop: 16 }}>
            <div className="progress">
              <div className="progress__bar" style={{ width: `${Math.round(progress.ratio * 100)}%` }} />
            </div>
            <div className="progress__label">{progressLabel}</div>
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </section>

      {/* ── 2. 柄をえらぶ ── */}
      <section className="panel">
        <h2 className="panel__title">{t(lang, 'step2Title')}</h2>
        <p className="panel__note">{result ? t(lang, 'step2NoteResult') : t(lang, 'step2NoteEmpty')}</p>

        {result && (
          <>
            <div style={{ marginBottom: 14 }}>
              <span className={`badge badge--${result.confidence}`}>{t(lang, CONFIDENCE_KEY[result.confidence])}</span>
            </div>

            {result.inconclusive && <p className="notice">{t(lang, 'inconclusiveNote')}</p>}

            <div style={{ marginTop: result.inconclusive ? 14 : 0 }}>
              <CandidateList candidates={result.candidates} selected={selected} onToggle={toggle} lang={lang} />
            </div>
          </>
        )}

        <div className="btn-row" style={{ marginTop: result ? 16 : 0 }}>
          <button
            type="button"
            className="btn btn--quiet"
            onClick={() => setPickerOpen((v) => !v)}
            aria-expanded={pickerOpen}
          >
            {pickerOpen ? t(lang, 'btnClosePicker') : t(lang, 'btnTogglePicker')}
          </button>
          {selected.length > 0 && (
            <button type="button" className="btn btn--quiet" onClick={() => setSelected([])}>
              {t(lang, 'btnClearSelection')}
            </button>
          )}
        </div>

        {pickerOpen && (
          <div style={{ marginTop: 18 }}>
            <MotifPicker selected={selected} onToggle={toggle} lang={lang} />
          </div>
        )}
      </section>

      {/* ── 3. 結果 ── */}
      <div ref={resultRef}>
        {verdict && (
          <>
            <section className={`verdict verdict--${verdict.targetFitness}`}>
              <p className="verdict__month">
                {lang === 'en' ? monthLabel(verdict.targetMonth) : `${verdict.targetMonth}月 — ${MONTH_NAMES_JA[verdict.targetMonth - 1]}`}
              </p>
              <h2 className="verdict__headline">{verdict.headline}</h2>
              <p className="verdict__detail">{verdict.detail}</p>
            </section>

            <section className="panel">
              <h2 className="panel__title">{t(lang, 'step3Title')}</h2>
              <p className="panel__note">{t(lang, 'step3Note')}</p>
              <SeasonHeatmap
                months={verdict.months}
                targetMonth={targetMonth}
                onSelectMonth={setTargetMonth}
                lang={lang}
              />

              <div className="month-select" style={{ marginTop: 18 }}>
                <label htmlFor="month">{t(lang, 'monthSelectLabel')}</label>
                <select
                  id="month"
                  value={targetMonth}
                  onChange={(e) => setTargetMonth(Number(e.target.value) as Month)}
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {monthLabel(m)}
                    </option>
                  ))}
                </select>
              </div>

              {verdict.stylizedExceptions.length > 0 && (
                <p className="notice notice--tip">
                  {verdict.stylizedExceptions
                    .map((m) => (lang === 'en' ? m.nameEn : m.nameJa))
                    .join(lang === 'en' ? ' and ' : '・')}{' '}
                  {t(lang, 'stylizedNote')}
                </p>
              )}

              {verdict.yearRoundProfiles.length > 0 && (
                <p className="notice notice--tip">
                  {verdict.yearRoundProfiles
                    .map((p) => (lang === 'en' ? p.motif.nameEn : p.motif.nameJa))
                    .join(lang === 'en' ? ' and ' : '・')}{' '}
                  {t(lang, 'yearRoundNote')}
                </p>
              )}
            </section>

            <section className="panel">
              <h2 className="panel__title">{t(lang, 'step4Title')}</h2>
              <p className="panel__note">{t(lang, 'step4Note')}</p>
              {[...verdict.seasonalProfiles, ...verdict.yearRoundProfiles].map((p) => (
                <MotifCard key={p.motif.id} profile={p} lang={lang} />
              ))}
            </section>
          </>
        )}
      </div>

      <footer className="foot">
        <p>
          {t(lang, 'footNote')}
          <br />
          {t(lang, 'footNote2')}
        </p>
        <p className="foot__brand">合同会社影虎 — kagetora LLC</p>
      </footer>
    </div>
  )
}
