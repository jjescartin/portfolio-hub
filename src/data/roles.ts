export const DEFAULT_ROLE = "Full Stack Developer";

export const ROLES: Record<string, string> = {
  fullstack: "Full Stack Developer",
  midlevelfullstack: "Mid Level Full Stack Developer",
  php: "PHP Developer",
  laravel: "Laravel Developer",
  backend: "Backend Developer",
  frontend: "Frontend Developer",
  react: "React Developer",
};

// Different words, same role
export const ALIASES: Record<string, string> = {
  reactjs: "react",
  web: "fullstack",
};

type Category = "backend" | "frontend" | "tools";

export interface RoleProfile {
  company: string;                                // id from experience.ts
  categoryOrder: [Category, Category, Category];  // first = open by default
  highlight: string[];                            // emphasized if the company has it
  tags: string[];                                 // bottom tags, same for every company
}

const fullstack: RoleProfile = {
  company: "8bacus",
  categoryOrder: ["backend", "frontend", "tools"],
  highlight: ["PHP", "Laravel", "RESTful API", "MySQL", "JavaScript", "React", "HTML", "CSS"],
  tags: ["PHP", "Laravel", "React", "JavaScript", "MySQL", "RESTful API"],
};

const backend: RoleProfile = {
  company: "8bacus",
  categoryOrder: ["backend", "tools", "frontend"],
  highlight: ["PHP", "Laravel", "RESTful API", "MySQL", "Service Layer", "Third-Party API Integration"],
  tags: ["PHP", "Laravel", "MySQL", "RESTful API", "Redis", "Docker"],
};

const frontend: RoleProfile = {
  company: "8bacus",
  categoryOrder: ["frontend", "tools", "backend"],
  highlight: ["JavaScript", "React", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
  tags: ["React", "JavaScript", "TypeScript", "Vue.js", "Tailwind CSS", "HTML", "CSS"],
};

const java: RoleProfile = {
  company: "abztrak",
  categoryOrder: ["backend", "tools", "frontend"],
  highlight: ["Java", "Kotlin", "Room Database", "SQL"],
  tags: ["Java", "Kotlin", "SQL"],
};

export const ROLE_PROFILES: Record<string, RoleProfile> = {
  fullstack,
  midlevelfullstack: fullstack,
  backend,
  php: { ...backend, highlight: ["PHP", "MySQL", "RESTful API", "Laravel"], tags: ["PHP", "Laravel", "MySQL", "RESTful API"] },
  laravel: { ...backend, highlight: ["Laravel", "PHP", "Laravel Query Builder", "Service Layer"], tags: ["Laravel", "PHP", "MySQL", "RESTful API"] },
  frontend,
  react: { ...frontend, highlight: ["React", "JavaScript", "TypeScript"], tags: ["React", "JavaScript", "TypeScript", "Tailwind CSS"] },
  java,
};