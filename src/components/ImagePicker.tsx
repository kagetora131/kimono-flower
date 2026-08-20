import { useCallback, useRef, useState } from 'react'

interface Props {
  imageUrl: string | null
  onPick: (file: File) => void
  onClear: () => void
}

export function ImagePicker({ imageUrl, onPick, onClear }: Props) {
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
          <img src={imageUrl} alt="読み込んだ着物の写真" />
        </div>
        <div className="btn-row" style={{ marginTop: 14 }}>
          <button type="button" className="btn btn--quiet" onClick={onClear}>
            写真を選び直す
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
        着物・帯の写真をここにドラッグするか、下のボタンから選んでください
        <br />
        柄がはっきり写るよう、寄りで撮ると精度が上がります
      </div>

      <div className="btn-row" style={{ marginTop: 16 }}>
        <button type="button" className="btn btn--primary" onClick={() => cameraRef.current?.click()}>
          カメラで撮る
        </button>
        <button type="button" className="btn btn--quiet" onClick={() => fileRef.current?.click()}>
          画像を選ぶ
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
