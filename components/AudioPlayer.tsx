'use client'
// components/AudioPlayer.tsx
// ─────────────────────────────────────────────────────────────────────────
// 'use client' required — we use useRef + useState to control the <audio>
// element. The browser audio API is not available on the server.
//
// This is a good example of the Server/Client split:
//   • The product page (server) fetches data and renders the layout
//   • This component (client) handles only the interactive audio part
// ─────────────────────────────────────────────────────────────────────────

import { useRef, useState } from 'react'

interface AudioDemo {
  title: string
  file: string
  bpm?: number
}

interface AudioPlayerProps {
  demos: AudioDemo[]
}

export default function AudioPlayer({ demos }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const play = (idx: number) => {
    const audio = audioRef.current
    if (!audio) return

    if (activeIdx === idx) {
      // Toggle play/pause for the same track
      if (playing) {
        audio.pause()
        setPlaying(false)
      } else {
        audio.play()
        setPlaying(true)
      }
      return
    }

    // Switch to a new track
    audio.src = `/audio/${demos[idx].file}`
    audio.play()
    setActiveIdx(idx)
    setPlaying(true)
    setProgress(0)
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    setProgress((audio.currentTime / audio.duration) * 100)
  }

  const handleEnded = () => {
    setPlaying(false)
    setProgress(0)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    if (idx !== activeIdx || !audioRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = ratio * audioRef.current.duration
  }

  return (
    <div className="space-y-3">
      {/* Hidden native audio element — we drive it with our custom UI */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {demos.map((demo, idx) => {
        const isActive = activeIdx === idx
        const isPlaying = isActive && playing

        return (
          <div
            key={demo.file}
            className={`border rounded-sm transition-colors ${isActive
              ? 'border-orange-500 bg-orange-500/5'
              : 'border-stone-800 hover:border-stone-600'
              }`}
          >
            <div className="flex items-center gap-4 px-4 py-3">
              {/* Play / pause button */}
              <button
                onClick={() => play(idx)}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-stone-700 hover:border-orange-500 hover:text-orange-500 transition-colors shrink-0 text-stone-400"
              >
                {isPlaying ? (
                  // Pause icon
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <rect x="1.5" y="1" width="3" height="10" rx="1" />
                    <rect x="7.5" y="1" width="3" height="10" rx="1" />
                  </svg>
                ) : (
                  // Play icon
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M2 1.5 L10 6 L2 10.5 Z" />
                  </svg>
                )}
              </button>

              {/* Track info */}
              <div className="flex-1 min-w-0">
                <p className={`font-body text-sm truncate ${isActive ? 'text-amber-100' : 'text-stone-400'}`}>
                  {demo.title}
                </p>
                {demo.bpm && (
                  <p className="font-mono text-xs text-stone-600 mt-0.5">{demo.bpm} BPM</p>
                )}

                {/* Progress bar — only shown for the active track */}
                {isActive && (
                  <div
                    className="mt-2 h-px bg-stone-800 cursor-pointer relative"
                    onClick={(e) => handleSeek(e, idx)}
                  >
                    <div
                      className="absolute top-0 left-0 h-full bg-orange-500 transition-none"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}

      <p className="font-mono text-xs text-stone-500 pt-1">
        * Audio demos are recorded directly from the plugin and some of them are processed with a very subtle reverb to show you more of what's possible to achieve easily with the tool.
      </p>
    </div>
  )
}
