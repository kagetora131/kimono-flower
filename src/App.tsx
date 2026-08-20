import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CandidateList } from './components/CandidateList'
import { ImagePicker } from './components/ImagePicker'
import { MotifCard } from './components/MotifCard'
import { MotifPicker } from './components/MotifPicker'
import { SeasonHeatmap } from './components/SeasonHeatmap'
import type { Month } from './data/types'
import { MONTH_NAMES_JA, MONTHS, buildVerdict } from './logic/season'
import { localClipRecognizer } from './recognizers/localClip'
import type { LoadProgress, RecognitionResult } from './recognizers/types'

const CONFIDENCE_TEXT = {
  high: { label: '確信度 高い', cls: 'high' },
  medium: { label: '確信度 中くらい', cls: 'medium' },
  low: { label: '確信度 低い', cls: 'low' },
} as const

export default function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [result, setResult] = useState<RecognitionResult | null>(null)
  const [selected, setSelected] = useState<string[]>([])
  const [targetMonth, setTargetMonth] = useState<Month>(new Date().getMonth() + 1)
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState<LoadProgress | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)

  const resultRef = useRef<HTMLDivElement>(null)

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
    setProgress({ ratio: 0, message: 'AIモデルを準備しています' })
    try {
      await localClipRecognizer.prepare(setProgress)
      setProgress({ ratio: 1, message: '柄を読み取っています' })
      const res = await localClipRecognizer.recognize(imageUrl)
      setResult(res)
      // 確信を持てた時だけ、最有力候補をあらかじめ選んでおく。
      setSelected(res.inconclusive ? [] : res.candidates.slice(0, 1).map((c) => c.motifId))
      if (res.inconclusive) setPickerOpen(true)
    } catch (e) {
      console.error(e)
      setError(
        'AIモデルの読み込みまたは判定に失敗しました。通信環境を確認して再度お試しいただくか、下の「柄を一覧から選ぶ」から手で選んでください。',
      )
    } finally {
      setBusy(false)
      setProgress(null)
    }
  }, [imageUrl])

  const verdict = useMemo(() => buildVerdict(selected, targetMonth), [selected, targetMonth])

  // 判定が出たら結果までスクロールする。
  useEffect(() => {
    if (verdict && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    // 月の切り替えでは動かさない。柄の構成が変わった時だけ。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected.join(',')])

  return (
    <div className="app">
      <header className="masthead">
        <h1 className="masthead__title">花あわせ</h1>
        <p className="masthead__lead">着物の柄を読み取り、着るのにふさわしい季節を提案します</p>
        <div className="masthead__rule" />
      </header>

      {/* ── 1. 写真 ── */}
      <section className="panel">
        <h2 className="panel__title">一 . 写真を選ぶ</h2>
        <p className="panel__note">
          判定はすべてお使いの端末の中で行われます。写真がどこかに送信されることはありません。
        </p>
        <ImagePicker imageUrl={imageUrl} onPick={handlePick} onClear={handleClear} />

        {imageUrl && (
          <>
            <div className="btn-row" style={{ marginTop: 16 }}>
              <button type="button" className="btn btn--accent" onClick={analyze} disabled={busy}>
                {busy ? '判定しています…' : 'この写真で柄を判定する'}
              </button>
            </div>
            {!result && !busy && (
              <p className="notice notice--tip">
                初回は約150MBのAIモデルを読み込みます（以降はブラウザに保存され、二回目からはすぐ判定できます）。
                読み込まずに使いたい場合は、下の「柄を一覧から選ぶ」から手で選んでも同じ結果が得られます。
              </p>
            )}
          </>
        )}

        {progress && (
          <div style={{ marginTop: 16 }}>
            <div className="progress">
              <div className="progress__bar" style={{ width: `${Math.round(progress.ratio * 100)}%` }} />
            </div>
            <div className="progress__label">{progress.message}</div>
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </section>

      {/* ── 2. 柄をえらぶ ── */}
      <section className="panel">
        <h2 className="panel__title">二 . 柄をえらぶ</h2>
        <p className="panel__note">
          {result
            ? 'AIの判定は目安です。違っていれば選び直してください。複数の柄が描かれている場合は、まとめて選べます。'
            : '写真を判定するか、一覧から柄を選んでください。柄さえ決まれば、写真がなくても季節の提案は使えます。'}
        </p>

        {result && (
          <>
            <div style={{ marginBottom: 14 }}>
              <span className={`badge badge--${CONFIDENCE_TEXT[result.confidence].cls}`}>
                {CONFIDENCE_TEXT[result.confidence].label}
              </span>
            </div>

            {result.inconclusive && (
              <p className="notice">
                候補が僅差で、柄を絞り込めませんでした。花柄ではない可能性もあります。
                下の候補に心当たりがなければ、柄がはっきり写るよう寄りで撮り直すか、
                一覧から手で選んでください。
              </p>
            )}

            <div style={{ marginTop: result.inconclusive ? 14 : 0 }}>
              <CandidateList candidates={result.candidates} selected={selected} onToggle={toggle} />
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
            {pickerOpen ? '一覧を閉じる' : '柄を一覧から選ぶ'}
          </button>
          {selected.length > 0 && (
            <button type="button" className="btn btn--quiet" onClick={() => setSelected([])}>
              選択を解除
            </button>
          )}
        </div>

        {pickerOpen && (
          <div style={{ marginTop: 18 }}>
            <MotifPicker selected={selected} onToggle={toggle} />
          </div>
        )}
      </section>

      {/* ── 3. 結果 ── */}
      <div ref={resultRef}>
        {verdict && (
          <>
            <section className={`verdict verdict--${verdict.targetFitness}`}>
              <p className="verdict__month">
                {verdict.targetMonth}月 — {MONTH_NAMES_JA[verdict.targetMonth - 1]}
              </p>
              <h2 className="verdict__headline">{verdict.headline}</h2>
              <p className="verdict__detail">{verdict.detail}</p>
            </section>

            <section className="panel">
              <h2 className="panel__title">三 . 一年の着どき</h2>
              <p className="panel__note">
                月をえらぶと、その月を基準に判定し直します。着物の柄は実際の盛りより
                半月から一月ほど早く着るのが粋とされ、その考え方を反映しています。
              </p>
              <SeasonHeatmap
                months={verdict.months}
                targetMonth={targetMonth}
                onSelectMonth={setTargetMonth}
              />

              <div className="month-select" style={{ marginTop: 18 }}>
                <label htmlFor="month">基準にする月</label>
                <select
                  id="month"
                  value={targetMonth}
                  onChange={(e) => setTargetMonth(Number(e.target.value) as Month)}
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}月（{MONTH_NAMES_JA[m - 1]}）
                    </option>
                  ))}
                </select>
              </div>

              {verdict.stylizedExceptions.length > 0 && (
                <p className="notice notice--tip">
                  {verdict.stylizedExceptions.map((m) => m.nameJa).join('・')}
                  は、写実的に描かれていれば季節の柄ですが、図案化・様式化されたものや
                  吉祥文様と組み合わされたものは通年着られるとされます。
                  お手元の柄が抽象的な意匠であれば、上の判定より広く着られると考えてください。
                </p>
              )}

              {verdict.yearRoundProfiles.length > 0 && (
                <p className="notice notice--tip">
                  {verdict.yearRoundProfiles.map((p) => p.motif.nameJa).join('・')}
                  は季節を選ばない文様のため、月の判定には含めていません。
                </p>
              )}
            </section>

            <section className="panel">
              <h2 className="panel__title">四 . 柄の意味</h2>
              <p className="panel__note">
                選んだ柄それぞれの由来と、着こなしの目安です。
              </p>
              {[...verdict.seasonalProfiles, ...verdict.yearRoundProfiles].map((p) => (
                <MotifCard key={p.motif.id} profile={p} />
              ))}
            </section>
          </>
        )}
      </div>

      <footer className="foot">
        <p>
          着用時期は一般的な目安であり、流派・地域・意匠によって考え方は異なります。
          <br />
          大切な場面の装いは、呉服店や着付けの専門家にご相談ください。
        </p>
        <p className="foot__brand">合同会社影虎 — kagetora LLC</p>
      </footer>
    </div>
  )
}
