// components/DotNav.tsx
import { useCallback, useEffect, useRef, useState } from "react"

type DotNavProps = {
  labels: readonly string[]
  current: number
  onSelect: (index: number) => void
}

const FLASH_MS = 1500

export default function DotNav({ labels, current, onSelect }: DotNavProps) {
  const [flash, setFlash] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const prev = useRef(current)

  const showBriefly = useCallback(() => {
    window.clearTimeout(timer.current)
    setFlash(true)
    timer.current = window.setTimeout(() => setFlash(false), FLASH_MS)
  }, [])

  // Flash the active label when the panel changes (not on first load)
  useEffect(() => {
    if (prev.current !== current) {
      prev.current = current
      showBriefly()
    }
  }, [current, showBriefly])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <nav
      className="group fixed right-0 top-1/2 z-100 flex -translate-y-1/2 flex-col"
      aria-label="Sections"
    >
      {labels.map((label, i) => (
        <button
          key={label}
          type="button"
          aria-label={`Go to ${label}`}
          aria-current={i === current}
          onClick={() => {
            onSelect(i)
            showBriefly() // also re-shows the label when tapping the active dot
          }}
          className="group/dot relative flex size-11 cursor-pointer items-center justify-center outline-none"
        >
          {/* Visible dot: still 14px, hit area is 44px */}
          <span
            aria-hidden="true"
            className="size-3.5 rounded-full border-2 border-white mix-blend-difference
              group-aria-[current=true]/dot:bg-white
              group-focus-visible/dot:outline-3 group-focus-visible/dot:outline-offset-2 group-focus-visible/dot:outline-white"
          />

          {/* Label grows to the LEFT of the dot; never blocks taps */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-full top-0 flex h-full items-center pr-1"
          >
            <span
              data-show={i === current && flash}
              className="translate-x-2 whitespace-nowrap rounded-full bg-gray-900/85 px-3 py-1 text-sm font-medium text-white opacity-0 backdrop-blur-sm transition duration-200
                motion-reduce:translate-x-0
                data-[show=true]:translate-x-0 data-[show=true]:opacity-100
                md:group-hover:translate-x-0 md:group-hover:opacity-100
                md:group-focus-within:translate-x-0 md:group-focus-within:opacity-100"
            >
              {label}
            </span>
          </span>
        </button>
      ))}
    </nav>
  )
}