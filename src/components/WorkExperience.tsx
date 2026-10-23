import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { COMPANIES, type Category } from '../data/experience'
import { ROLE_PROFILES } from '../data/roles'
import { useRoleKey } from '../hooks/useRoles'

const LABELS: Record<Category, string> = { backend: 'Backend', frontend: 'Frontend', tools: 'Tools' }

const CATEGORY_OF: Record<string, Category> = {}
for (const c of COMPANIES) {
  for (const cat of Object.keys(c.skills) as Category[]) {
    for (const s of c.skills[cat]) CATEGORY_OF[s.name.toLowerCase()] ??= cat
  }
}

// Full class names, so Tailwind can see them
const TAG_STYLES: Record<Category, string> = {
  backend: 'border-sky-500/50 bg-sky-500/15',
  frontend: 'border-violet-500/50 bg-violet-500/15',
  tools: 'border-amber-500/50 bg-amber-500/15',
}
const TAG_DEFAULT = 'border-current/25'

function Bar({ level, on }: { level: number; on: boolean }) {
  return (
    <div className="flex gap-1" aria-label={`Level ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`h-1.5 w-4 rounded-full ${
            n <= level ? (on ? 'bg-emerald-500' : 'bg-current opacity-40') : 'bg-current opacity-10'
          }`}
        />
      ))}
    </div>
  )
}

function SkillsContent({ roleKey }: { roleKey: string }) {
  const profile = ROLE_PROFILES[roleKey] ?? ROLE_PROFILES.fullstack
  const [companyId, setCompanyId] = useState(profile.company)
  const [picked, setPicked] = useState<Category | 'none' | null>(null)

  const company = COMPANIES.find((c) => c.id === companyId) ?? COMPANIES[0]
  const hi = new Set(profile.highlight.map((s) => s.toLowerCase()))
  const isHi = (name: string) => hi.has(name.toLowerCase())

  const visible = profile.categoryOrder.filter((c) => company.skills[c].length > 0)
  const open = picked === 'none' ? null : picked && visible.includes(picked) ? picked : visible[0]

  return (
    <div className="mx-auto flex h-dvh w-full max-w-xl flex-col px-6 pb-6 pr-10 pt-10 text-left sm:pr-6">
      {/* Zone 1: header + company dropdown (top) */}
      <div className="shrink-0">
        <h2 id="work-title" className="text-3xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">What I Bring</h2>
        <p className="mt-2 opacity-70">Technologies I've used to build and maintain software.</p>

        <div className="mt-6">
          <span className="text-xs font-medium uppercase tracking-wide opacity-60">Company</span>
          <Listbox value={companyId} onChange={setCompanyId}>
            <div className="relative mt-1">
              <ListboxButton className="w-full rounded-lg border border-current/20 px-4 py-3 text-left">
                <span className="block font-medium">{company.title}</span>
                <span className="block text-sm opacity-60">{company.company}</span>
              </ListboxButton>
              <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-current/20 bg-neutral-900 text-white shadow-lg">
                {COMPANIES.map((c) => (
                  <ListboxOption
                    key={c.id}
                    value={c.id}
                    className="cursor-pointer px-4 py-3 data-[focus]:bg-white/10 data-[selected]:bg-white/5"
                  >
                    <span className="block font-medium">{c.title}</span>
                    <span className="block text-sm text-neutral-400">{c.company}</span>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
      </div>

      {/* Zone 2: accordions (fills remaining space, scrolls on its own) */}
      <div className="mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto">
        {visible.map((cat, i) => {
          const skills = [...company.skills[cat]].sort((a, b) => Number(isHi(b.name)) - Number(isHi(a.name)))
          const isOpen = open === cat
          return (
            <div key={cat} className={`rounded-lg border ${i === 0 ? 'border-emerald-500/60' : 'border-current/15'}`}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setPicked(isOpen ? 'none' : cat)}
                className="flex w-full items-center justify-between px-4 py-3 font-semibold"
              >
                {LABELS[cat]}
                <span aria-hidden className="opacity-50">{isOpen ? '−' : '+'}</span>
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
                inert={!isOpen}
              >
                <div className="min-h-0 overflow-hidden">
                  <ul className="space-y-2 px-4 pb-4">
                    {skills.map((s) => (
                      <li key={s.name} className="flex items-center justify-between gap-3">
                        <span className={isHi(s.name) ? 'font-semibold' : 'opacity-60'}>{s.name}</span>
                        <Bar level={s.level} on={isHi(s.name)} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Zone 3: role tags (pinned to the bottom) */}
      <div className="mt-4 shrink-0">
        <span className="text-xs font-medium uppercase tracking-wide opacity-60">Key skills for this role</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {profile.tags.map((t) => {
            const cat = CATEGORY_OF[t.toLowerCase()]
            return (
              <span
                key={t}
                className={`rounded-full border px-3 py-1 text-sm ${cat ? TAG_STYLES[cat] : TAG_DEFAULT}`}
              >
                {t}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function WorkExperience() {
  const roleKey = useRoleKey()
  return <SkillsContent key={roleKey} roleKey={roleKey} />
}