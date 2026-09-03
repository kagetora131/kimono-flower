import { useCallback, useRef, useState } from 'react'
import type { Lang } from '../data/types'
import { t } from '../i18n/strings'

interface Props {
  imageUrl: string | null
  onPick: (file: File) => void
  onClear: () => void
  lang: Lang
}

export function ImagePicker({ imageUrl, onPick, onClear, lang }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0]
      if (file && file.type.startsWith('image/')) onPick(file)
    },
    [onPick],
  )

  if (imageUrl) {
    return (
      <div>
        <div className="preview">
          <img src={imageUrl} alt={lang === 'en' ? 'The kimono photo you loaded' : '読み込んだ着物の写真'} />
        </div>
        <div className="btn-row" style={{ marginTop: 14 }}>
          <button type="button" className="btn btn--quiet" onClick={onClear}>
            {t(lang, 'btnReselect')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div
        className={`dropzone${dragging ? ' dropzone--active' : ''}`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
      >
        {t(lang, 'dropzone')}
        <br />
        {t(lang, 'dropzoneSub')}
      </div>

      <div className="btn-row" style={{ marginTop: 16 }}>
        <button type="button" className="btn btn--primary" onClick={() => cameraRef.current?.click()}>
          {t(lang, 'btnCamera')}
        </button>
        <button type="button" className="btn btn--quiet" onClick={() => fileRef.current?.click()}>
          {t(lang, 'btnChooseImage')}
        </button>
      </div>

      <input
        ref={cameraRef}
        className="hidden-input"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <input
        ref={fileRef}
        className="hidden-input"
        type="file"
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}
