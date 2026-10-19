import { useCallback, useEffect, useRef, useState } from 'react'

// Must match --duration in index.css. The buffer swallows trackpad inertia.
const DURATION = 900
const BUFFER = 200
const WHEEL_THRESHOLD = 10
const SWIPE_THRESHOLD = 50

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Anything inside [data-scrollable] (a modal, a long list) scrolls normally
// instead of triggering a panel change.
const inScrollableArea = (target: EventTarget | null) =>
  target instanceof Element && target.closest('[data-scrollable]') !== null

// Don't hijack Space / arrows while the visitor is typing in the contact form.
const isTypingTarget = (target: EventTarget | null) =>
  target instanceof Element &&
  target.closest('input, textarea, select, [contenteditable="true"]') !== null

function indexFromHash(ids: readonly string[]) {
  const i = ids.indexOf(window.location.hash.slice(1))
  return i === -1 ? 0 : i
}

export function useSnapScroll(ids: readonly string[]) {
  const [current, setCurrent] = useState(() => indexFromHash(ids))
  const currentRef = useRef(current) // latest value for event handlers
  const lockedRef = useRef(false)
  const timerRef = useRef<number | null>(null)

  const goTo = useCallback(
    (i: number) => {
      if (lockedRef.current || i < 0 || i >= ids.length || i === currentRef.current) return

      currentRef.current = i
      setCurrent(i)

      // Keep ?role=... in the URL while updating the hash.
      const { pathname, search } = window.location
      window.history.replaceState(null, '', `${pathname}${search}#${ids[i]}`)

      lockedRef.current = true
      const duration = prefersReducedMotion() ? 1 : DURATION
      timerRef.current = window.setTimeout(() => {
        lockedRef.current = false
      }, duration + BUFFER)
    },
    [ids],
  )

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (inScrollableArea(e.target)) return
      e.preventDefault()
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return
      goTo(currentRef.current + (e.deltaY > 0 ? 1 : -1))
    }

    let touchStartY: number | null = null
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = inScrollableArea(e.target) ? null : e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!inScrollableArea(e.target)) e.preventDefault()
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY === null) return
      const dy = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(dy) > SWIPE_THRESHOLD) goTo(currentRef.current + (dy > 0 ? 1 : -1))
      touchStartY = null
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return
      const next = ['ArrowDown', 'PageDown', ' ']
      const prev = ['ArrowUp', 'PageUp']
      if (next.includes(e.key)) { e.preventDefault(); goTo(currentRef.current + 1) }
      else if (prev.includes(e.key)) { e.preventDefault(); goTo(currentRef.current - 1) }
      else if (e.key === 'Home') { e.preventDefault(); goTo(0) }
      else if (e.key === 'End') { e.preventDefault(); goTo(ids.length - 1) }
    }

    // Back button or a manually edited #hash
    const onHashChange = () => {
      const i = indexFromHash(ids)
      currentRef.current = i
      setCurrent(i)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('hashchange', onHashChange)
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [goTo, ids])

  return { current, goTo }
}