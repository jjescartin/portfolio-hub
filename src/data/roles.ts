import type { Category } from "./experience";

export const DEFAULT_ROLE = "Full Stack Developer";

export const ROLES: Record<string, string> = {
  fullstack: "Full Stack Developer",
  midlevelfullstack: "Mid Level Full Stack Developer",
  php: "PHP Developer",
  laravel: "Laravel Developer",
  backend: "Backend Developer",
  frontend: "Frontend Developer",
  react: "React Developer",
  ai: "AI-Native Product Engineer",
  mobile: "Mobile Developer",
  java: "Java Developer",
};

// Different words, same role. Keys are already normalized by useRoleKey
// (lowercase, no spaces/-/_, trailing developer|engineer|programmer|dev removed).
export const ALIASES: Record<string, string> = {
  reactjs: "react",
  web: "fullstack",
  ainative: "ai",
  ainativeproduct: "ai",
  product: "ai",
  reactnative: "mobile",
};

export interface RoleProfile {
  company: string;           // id from experience.ts, shown first
  categoryOrder: Category[]; // tab order; first tab the company has opens by default
  highlight: string[];       // emphasized pills if the company has them
}

const fullstack: RoleProfile = {
  company: "8bacus",
  categoryOrder: ["backend", "frontend", "tools"],
  highlight: ["PHP", "Laravel", "RESTful API", "MySQL", "JavaScript", "React", "HTML", "CSS"],
};

const backend: RoleProfile = {
  company: "8bacus",
  categoryOrder: ["backend", "tools", "frontend"],
  highlight: ["PHP", "Laravel", "RESTful API", "MySQL", "Service Layer", "Third-Party API Integration"],
};

const frontend: RoleProfile = {
  company: "8bacus",
  categoryOrder: ["frontend", "mobile", "tools", "backend"],
  highlight: ["JavaScript", "React", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
};

const ai: RoleProfile = {
  company: "consultant",
  categoryOrder: ["ai", "mobile", "backend", "frontend", "security", "testing", "tools"],
  highlight: ["Claude Code", "OpenSpec", "Anthropic Claude API", "PostgreSQL", "React Native", "Supabase"],
};

const mobile: RoleProfile = {
  company: "consultant",
  categoryOrder: ["mobile", "ai", "backend", "frontend", "security", "testing", "tools"],
  highlight: ["React Native", "Expo", "Supabase", "PostgreSQL", "Maestro"],
};

const java: RoleProfile = {
  company: "abztrak",
  categoryOrder: ["backend", "tools", "frontend"],
  highlight: ["Java", "Kotlin", "Room Database", "SQL"],
};

export const ROLE_PROFILES: Record<string, RoleProfile> = {
  fullstack,
  midlevelfullstack: fullstack,
  backend,
  php: { ...backend, highlight: ["PHP", "MySQL", "RESTful API", "Laravel"] },
  laravel: { ...backend, highlight: ["Laravel", "PHP", "Laravel Query Builder", "Service Layer"] },
  frontend,
  react: { ...frontend, highlight: ["React", "JavaScript", "TypeScript"] },
  ai,
  mobile,
  java,
};
