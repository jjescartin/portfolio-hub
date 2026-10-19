type DotNavProps = {
  labels: readonly string[]
  current: number
  onSelect: (index: number) => void
}

export default function DotNav({ labels, current, onSelect }: DotNavProps) {
  return (
    <nav
      className="fixed right-4 top-1/2 z-100 flex -translate-y-1/2 flex-col gap-3"
      aria-label="Sections"
    >
      {labels.map((label, i) => (
        <button
          key={label}
          type="button"
          aria-label={`Go to ${label}`}
          aria-current={i === current}
          onClick={() => onSelect(i)}
          className="size-3.5 cursor-pointer rounded-full border-2 border-white mix-blend-difference
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white
            aria-[current=true]:bg-white"
        />
      ))}
    </nav>
  )
}