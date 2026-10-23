import { SECTIONS } from "../data/navigation"

type NavProps = {
  current: number
  onSelect: (index: number) => void
}

// Swap for the same font class your footer wordmark uses
const brandFont = "font-serif"

// Match this duration to your panel slide so the bar doesn't lag the curtain
const fade = "transition-colors duration-500 ease-out motion-reduce:transition-none"

export default function Nav({ current, onSelect }: NavProps) {
  const dark = SECTIONS[current]?.tone === "dark"

  const allen = dark ? "text-white" : "text-gray-900 dark:text-white"
  const esc = dark ? "text-teal-400" : "text-teal-700 dark:text-teal-400"
  const linkActive = dark ? "text-teal-400" : "text-teal-700 dark:text-teal-400"
  const linkIdle = dark
    ? "text-white/60 hover:text-white"
    : "text-gray-900/60 hover:text-gray-900 dark:text-white/60 dark:hover:text-white"

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-100 flex h-12 items-center justify-between px-5 md:h-20 md:px-16 lg:px-24">
      <button
        type="button"
        onClick={() => onSelect(0)}
        aria-label="AllenESC, back to top"
        className={`${brandFont} pointer-events-auto cursor-pointer text-xl md:text-2xl font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500`}
      >
        <span className={`${allen} ${fade}`}>Allen</span>
        <span className={`${esc} ${fade}`}>ESC</span>
      </button>

      <nav aria-label="Primary" className="pointer-events-auto hidden gap-8 md:flex">
        {SECTIONS.slice(1).map((section, i) => {
          const index = i + 1
          const active = current === index
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-current={active ? "page" : undefined}
              className={`${fade} cursor-pointer text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500 ${
                active ? linkActive : linkIdle
              }`}
            >
              {section.label}
            </button>
          )
        })}
      </nav>
    </header>
  )
}