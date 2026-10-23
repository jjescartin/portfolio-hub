export type Tone = "light" | "dark"

export type Section = {
  id: string
  label: string
  tone: Tone
}

export const SECTIONS: readonly Section[] = [
  { id: "home", label: "Home", tone: "light" },
  { id: "experience", label: "Experience", tone: "light" },
  { id: "projects", label: "Projects", tone: "light" },
  { id: "contact", label: "Contact", tone: "dark" },
]

export const LABELS: readonly string[] = SECTIONS.map((s) => s.label)