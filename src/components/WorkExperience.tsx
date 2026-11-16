import { useLayoutEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react'
import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CATEGORIES, COMPANIES, type Category, type Practice, type PracticeIcon } from '../data/experience'
import { ROLE_PROFILES } from '../data/roles'
import { useRoleKey } from '../hooks/useRoles'

const LABELS: Record<Category, string> = {
  backend: 'Backend',
  frontend: 'Frontend',
  mobile: 'Mobile',
  ai: 'AI-Native',
  security: 'Security',
  testing: 'Testing',
  tools: 'Tools',
}

// Full class names, so Tailwind can see them. Active fills pass 4.5:1 with white text.
const TAB_ACTIVE: Record<Category, string> = {
  backend: 'border-violet-600 bg-violet-600',
  frontend: 'border-rose-600 bg-rose-600',
  mobile: 'border-cyan-700 bg-cyan-700',
  ai: 'border-teal-700 bg-teal-700',
  security: 'border-lime-700 bg-lime-700',
  testing: 'border-indigo-600 bg-indigo-600',
  tools: 'border-amber-700 bg-amber-700',
}

const DOT: Record<Category, string> = {
  backend: 'bg-violet-500',
  frontend: 'bg-rose-500',
  mobile: 'bg-cyan-600',
  ai: 'bg-teal-600',
  security: 'bg-lime-600',
  testing: 'bg-indigo-500',
  tools: 'bg-amber-600',
}

// 24x24 stroke icons (one path each)
const PATHS: Record<PracticeIcon, string> = {
  spec: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z M14 3v5h5 M9 13h6 M9 17h4',
  check: 'M22 11.1V12a10 10 0 1 1-5.9-9.1 M22 4 12 14.01l-3-3',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  chat: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  wrench: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  checkbox: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  layers: 'M12 2 2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z',
  branch: 'M6 3v12 M18 9a3 3 0 1 0 0-6a3 3 0 1 0 0 6z M6 21a3 3 0 1 0 0-6a3 3 0 1 0 0 6z M18 9a9 9 0 0 1-9 9',
  cycle: 'M21 12a9 9 0 1 1-3-6.7L21 8 M21 3v5h-5',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8a4 4 0 1 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  gauge: 'M12 14l4-4 M3.34 19a10 10 0 1 1 17.32 0',
  search: 'M11 19a8 8 0 1 0 0-16a8 8 0 1 0 0 16z M21 21l-4.35-4.35',
  book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  phone: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M12 18h.01',
  swap: 'M17 1l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h14 M7 23l-4-4 4-4 M21 13v2a4 4 0 0 1-4 4H3',
  bug: 'M9 7.13v-1a3 3 0 1 1 6 0v1 M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z M12 20v-9 M6 13H2 M22 13h-4',
}

// Pill styles, shared by the visible list and the hidden measuring copy
const PILL = 'rounded-full border px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-[15px]'
const PILL_HI = 'border-gray-950 bg-gray-950 font-medium text-white'
const PILL_LO = 'border-current/25'

// Matches Tailwind's `md` breakpoint (the nav bar and the other panels switch here too)
const DESKTOP_QUERY = '(min-width: 768px)'
// Short phones (e.g. iPhone SE). Must match the max-md:[@media(max-height:680px)] classes below.
const SHORT_PHONE_QUERY = '(max-width: 767px) and (max-height: 680px)'

function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

function PracticeGlyph({ icon, aiNative }: Pick<Practice, 'icon' | 'aiNative'>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`mt-px size-5 shrink-0 md:size-[22px] ${aiNative ? 'text-teal-700' : 'text-sky-700'}`}
    >
      <path d={PATHS[icon]} />
    </svg>
  )
}

function SkillsContent({ roleKey }: { roleKey: string }) {
  const profile = ROLE_PROFILES[roleKey] ?? ROLE_PROFILES.fullstack
  const [companyId, setCompanyId] = useState(profile.company)
  const [picked, setPicked] = useState<Category | null>(null)
  const [expanded, setExpanded] = useState(false)
  const isDesktop = useMedia(DESKTOP_QUERY)
  const isShortPhone = useMedia(SHORT_PHONE_QUERY)

  const company = COMPANIES.find((c) => c.id === companyId) ?? COMPANIES[0]
  const hi = new Set(profile.highlight.map((s) => s.toLowerCase()))
  const isHi = (name: string) => hi.has(name.toLowerCase())

  // The role's order leads on the role's own company; elsewhere the company's tabOrder leads.
  // Then any other category this company has. Empty categories are dropped.
  const companyOrder = company.tabOrder ?? []
  const lead = profile.company === company.id ? profile.categoryOrder : companyOrder
  const tabs = [...new Set([...lead, ...profile.categoryOrder, ...companyOrder, ...CATEGORIES])].filter(
    (c) => (company.skills[c]?.length ?? 0) > 0,
  )
  const active = picked && tabs.includes(picked) ? picked : tabs[0]
  const skills = [...(company.skills[active] ?? [])].sort((a, b) => Number(isHi(b)) - Number(isHi(a)))
  // Phones: the pill box fills the space above "How I work", and shows as many pills as fit.
  // A hidden copy of the full list is measured, so taller screens simply show more pills.
  const panelRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLUListElement>(null)
  const [fit, setFit] = useState(Infinity)

  useLayoutEffect(() => {
    const panel = panelRef.current
    const list = measureRef.current
    if (isDesktop || !panel || !list) return
    const compute = () => {
      const s = getComputedStyle(panel)
      const room = panel.clientHeight - parseFloat(s.paddingTop) - parseFloat(s.paddingBottom)
      const items = Array.from(list.children) as HTMLElement[]
      let n = items.filter((el) => el.offsetTop + el.offsetHeight <= room).length
      if (n < items.length) n = Math.max(1, n - 1) // leave a slot for "+N more"
      setFit(n)
    }
    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(panel)
    return () => ro.disconnect()
  }, [isDesktop, active, company.id])

  const canCollapse = !isDesktop && fit < skills.length
  const shown = canCollapse && !expanded ? skills.slice(0, fit) : skills

  const selectCompany = (id: string) => {
    setCompanyId(id)
    setPicked(null)
    setExpanded(false)
  }

  const selectTab = (cat: Category) => {
    setPicked(cat)
    setExpanded(false)
  }

  // Tabs pattern: Left/Right move between tabs (Up/Down stay with panel navigation)
  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = tabs[(i + step + tabs.length) % tabs.length]
    selectTab(next)
    document.getElementById(`skills-tab-${next}`)?.focus()
  }

  return (
    // Phones: bottom padding grows with screen height, so "How I work" sits higher on taller phones
    <div className="mx-auto flex h-dvh w-full max-w-xl flex-col px-6 pb-5 pr-10 pt-14 text-left sm:pr-6 max-md:[@media(min-height:700px)]:pb-8 max-md:[@media(min-height:780px)]:pb-14 max-md:[@media(min-height:860px)]:pb-20 md:max-w-none md:px-16 md:pb-10 md:pt-24 lg:px-24">
      <div className="shrink-0">
        <h2 id="work-title" className="text-3xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">What I Bring</h2>
        <p className="mt-2 hidden opacity-70 md:block md:text-lg">How I build, and what I build with.</p>
      </div>

      {/* Mobile: one column, "How I work" pinned to the bottom.
          Desktop: Stack | Company on one row, pills | How I work aligned below. */}
      <div className="mt-3 flex min-h-0 flex-1 flex-col md:mt-10 md:grid md:flex-none md:grid-cols-[minmax(0,1fr)_min(45%,35rem)] md:gap-x-8">
        <Field className="shrink-0 md:col-start-2 md:row-start-1">
          {/* Visually hidden on very short phones (e.g. iPhone SE in Safari, ~550px tall, 667px in DevTools); still read by screen readers */}
          <Label className="text-xs font-medium uppercase tracking-wide opacity-60 max-md:[@media(max-height:680px)]:sr-only">Company</Label>
          <Listbox value={company.id} onChange={selectCompany}>
            <div className="relative mt-1 max-md:[@media(max-height:680px)]:mt-0">
              <ListboxButton className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-current/20 px-4 py-2.5 text-left md:py-3">
                <span className="min-w-0">
                  <span className="block font-medium">{company.title}</span>
                  <span className="block text-sm opacity-60">
                    {company.company} · {company.period}
                  </span>
                </span>
                <span aria-hidden className="shrink-0 opacity-50">▾</span>
              </ListboxButton>
              <ListboxOptions
                data-scrollable
                className="absolute z-10 mt-1 max-h-72 w-full overflow-auto overscroll-contain rounded-lg border border-gray-300 bg-white text-gray-900 shadow-lg"
              >
                {COMPANIES.map((c) => (
                  <ListboxOption
                    key={c.id}
                    value={c.id}
                    className="cursor-pointer px-4 py-3 data-[focus]:bg-gray-100 data-[selected]:bg-gray-50"
                  >
                    <span className="block font-medium">{c.title}</span>
                    <span className="block text-sm text-gray-500">
                      {c.company} · {c.period}
                    </span>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </Field>

        <div className="mt-4 flex shrink-0 flex-col md:col-start-1 md:row-start-1 md:mt-0">
          {/* Same rule as the Company label: hidden on very short phones (e.g. iPhone SE) */}
          <span className="text-xs font-medium uppercase tracking-wide opacity-60 max-md:[@media(max-height:680px)]:hidden">Tech Stack</span>
          <div
            role="tablist"
            aria-label="Skill categories"
            // Short phones: one row that scrolls sideways (data-scrollable lets the swipe through
            // instead of changing panels). Taller screens: tabs wrap.
            data-scrollable={isShortPhone ? '' : undefined}
            className={`mt-1 flex gap-2 max-md:[@media(max-height:680px)]:mt-0 md:flex-1 md:content-center ${
              isShortPhone
                ? 'overflow-x-auto overscroll-x-contain [mask-image:linear-gradient(to_right,black_85%,transparent)] [scrollbar-width:none]'
                : 'flex-wrap'
            }`}
          >
            {tabs.map((cat, i) => {
              const on = cat === active
              return (
                <button
                  key={cat}
                  id={`skills-tab-${cat}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="skills-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => selectTab(cat)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={`flex min-h-10 shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border px-3.5 text-sm font-medium outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 md:min-h-11 md:px-[18px] md:text-[15px] ${
                    on ? `${TAB_ACTIVE[cat]} text-white` : 'border-current/20'
                  }`}
                >
                  <span aria-hidden className={`size-2 rounded-full ${on ? 'bg-white' : DOT[cat]}`} />
                  {LABELS[cat]}
                  <span className={`hidden text-[13px] md:inline ${on ? 'text-white/80' : 'opacity-60'}`}>
                    {company.skills[cat]?.length}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div
          id="skills-panel"
          role="tabpanel"
          aria-labelledby={`skills-tab-${active}`}
          ref={panelRef}
          className={`relative mt-2.5 rounded-xl border border-current/15 bg-white/50 p-4 md:col-start-1 md:row-start-2 md:mt-4 md:flex-none md:overflow-visible md:p-6 ${
            expanded ? 'shrink-0' : 'min-h-0 flex-1 overflow-hidden'
          }`}
        >
          {/* Invisible full list, measured to decide how many pills fit (phones only) */}
          <ul
            ref={measureRef}
            aria-hidden="true"
            className="pointer-events-none invisible absolute inset-x-4 top-4 flex flex-wrap gap-1.5 md:hidden"
          >
            {skills.map((s) => (
              <li key={s} className={`${PILL} ${isHi(s) ? PILL_HI : PILL_LO}`}>
                {s}
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-1.5 md:gap-2">
            {shown.map((s) => (
              <li key={s} className={`${PILL} ${isHi(s) ? PILL_HI : PILL_LO}`}>
                {s}
              </li>
            ))}
            {canCollapse && (
              <li>
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setExpanded((v) => !v)}
                  className="cursor-pointer rounded-full border border-dashed border-teal-700/60 px-3 py-1.5 text-sm font-medium text-teal-700"
                >
                  {expanded ? 'Show less' : `+${skills.length - fit} more`}
                </button>
              </li>
            )}
          </ul>
        </div>

        {company.howIWork.length > 0 && (
          <section
            aria-labelledby="how-i-work-title"
            className="mt-auto shrink-0 pt-4 md:col-start-2 md:row-start-2 md:mt-4 md:rounded-xl md:border md:border-current/15 md:bg-white/50 md:pt-0"
          >
            <h3
              id="how-i-work-title"
              className="text-xs font-semibold uppercase tracking-wide md:border-b md:border-current/10 md:px-5 md:py-3"
            >
              <span className="opacity-60">How I work</span>
            </h3>
            <ul className="mt-2 rounded-xl border border-current/15 bg-white/50 md:mt-0 md:rounded-none md:border-0 md:bg-transparent">
              {company.howIWork.map((p) => (
                <li
                  key={p.title}
                  className="flex gap-3 border-t border-current/10 px-3.5 py-2.5 first:border-t-0 md:gap-3.5 md:px-5 md:py-4"
                >
                  <PracticeGlyph icon={p.icon} aiNative={p.aiNative} />
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold md:text-base">{p.title}</span>
                    <span className="block text-[13px] opacity-70 md:text-sm">{p.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}

export default function WorkExperience() {
  const roleKey = useRoleKey()
  return <SkillsContent key={roleKey} roleKey={roleKey} />
}
