import type { ReactNode } from 'react'

type PanelProps = {
  id: string
  index: number
  current: number
  total: number
  className?: string
  children: ReactNode
}

export default function Panel({ id, index, current, total, className = '', children }: PanelProps) {
  const state = index < current ? '-translate-y-full' : index > current ? 'brightness-75' : ''

  return (
    <section
      id={id}
      className={`fixed inset-0 flex h-dvh items-center justify-center will-change-transform
        transition-[translate,filter] duration-[900ms] ease-[cubic-bezier(0.77,0,0.175,1)]
        motion-reduce:duration-[1ms] ${className} ${state}`}
      style={{ zIndex: total - index }}
      aria-labelledby={`${id}-title`}
      inert={index !== current}
    >
      {children}
    </section>
  )
}