// data/experience.ts
// Array order = display order: companies newest first, skills most important first.
export type Category = "backend" | "frontend" | "mobile" | "ai" | "security" | "testing" | "tools";

// Fallback tab order for categories a role profile doesn't list.
export const CATEGORIES: readonly Category[] = ["backend", "frontend", "mobile", "ai", "security", "testing", "tools"];

export type PracticeIcon =
  | "spec" | "check" | "shield" | "chat" | "wrench" | "checkbox" | "layers" | "eye" | "branch"
  | "cycle" | "users" | "gauge" | "search" | "book" | "phone" | "swap" | "bug";

export interface Practice {
  title: string;
  detail: string;
  icon: PracticeIcon;
  aiNative?: boolean; // AI-native practices get the teal accent
}

export interface Company {
  id: string; // referenced by RoleProfile.company in roles.ts
  title: string;
  company: string;
  period: string;
  // Tabs this company leads with, unless the visitor's ?role points at this company
  tabOrder?: Category[];
  skills: Partial<Record<Category, string[]>>;
  howIWork: Practice[];
}

export const COMPANIES: Company[] = [
  {
    id: "consultant",
    title: "Product Engineer (AI-Native)",
    company: "Independent Software Consultant",
    period: "Jun 2026 – Present",
    tabOrder: ["ai", "mobile", "backend", "frontend", "security", "testing", "tools"],
    skills: {
      ai: ["Claude Code", "OpenSpec", "Anthropic Claude API", "Multi-Agent Workflows"],
      mobile: ["React Native", "Expo", "Expo Router", "NativeWind", "Reanimated", "Skia", "EAS Build / Update", "Zustand", "React Hook Form + Zod"],
      backend: [
        "Supabase", "PostgreSQL", "Deno Edge Functions", "Node.js", "pg_cron", "PostGIS", "pgvector", "Supabase Realtime",
        "Cloudflare R2", "AWS S3", "Firebase Cloud Messaging", "Twilio", "Apple App Store / Google Play APIs",
      ],
      frontend: ["React", "TypeScript", "Vite", "React Router", "Tailwind CSS", "Radix UI", "TanStack Table"],
      security: ["Supabase Auth", "JWT", "Row-Level Security", "MFA (TOTP)", "Apple / Google Sign-In", "Rate limiting"],
      testing: ["pgTAP", "Maestro", "Jest", "Vitest", "Testing Library", "Playwright", "Deno test"],
      tools: ["CircleCI", "Sentry", "Docker", "WSL2", "pnpm", "Husky", "ClickUp"],
    },
    howIWork: [
      { title: "Spec-driven development", detail: "OpenSpec + Claude Code, spec before code", icon: "spec", aiNative: true },
      { title: "Test-driven development", detail: "Tests guide planning and validation", icon: "check", aiNative: true },
      { title: "Security by default", detail: "Supabase Auth, JWT, RLS, rate limiting", icon: "shield" },
    ],
  },
  {
    id: "microsourcing",
    title: "Mid-Level Full Stack Developer (PHP / Laravel)",
    company: "MicroSourcing",
    period: "Nov 2025 – May 2026",
    skills: {
      backend: ["PHP", "Laravel", "RESTful API", "MySQL", "SQL", "Service Layer", "Laravel Query Builder", "Payment API Integration"],
      frontend: ["JavaScript", "Laravel Blade", "HTML", "CSS", "jQuery", "Bootstrap", "Multi-step Form Development"],
      tools: ["Git", "PHPUnit", "Code Review", "MySQL Workbench", "ChatGPT", "Claude (chat)"],
    },
    howIWork: [
      { title: "AI as a second opinion", detail: "Pasted code into ChatGPT/Claude, then verified and tested fixes myself", icon: "chat" },
      { title: "Refactor while building", detail: "Split large methods into focused ones", icon: "wrench" },
      { title: "Validate on both sides", detail: "Client-side checks + Laravel FormRequest", icon: "checkbox" },
    ],
  },
  {
    id: "8bacus",
    title: "Full Stack Developer",
    company: "8Bacus",
    period: "Jul 2024 – Sep 2025",
    skills: {
      backend: ["PHP", "Laravel", "RESTful API", "MySQL", "Service Layer", "Third-Party API Integration", "WebSocket", "Laravel Query Builder", "CTE", "CQRS"],
      frontend: ["JavaScript", "React", "TypeScript", "Vue.js", "Laravel Blade", "Tailwind CSS", "jQuery", "HTML", "CSS"],
      tools: ["Git", "Code Review", "PHPUnit", "Postman", "npm", "DBeaver", "ChatGPT"],
    },
    howIWork: [
      { title: "Service layer + CQRS", detail: "Logic in services and command/query components", icon: "layers" },
      { title: "Code review", detail: "Formal and collaborative, staging to production", icon: "eye" },
      { title: "Right tool for the job", detail: "Chose React over Blade for project needs", icon: "branch" },
    ],
  },
  {
    id: "elgada",
    title: "Jr. Full Stack Developer",
    company: "Elgada BPO Solutions, Inc.",
    period: "Jan 2023 – Mar 2024",
    skills: {
      backend: ["PHP", "CodeIgniter", "RESTful API", "MySQL", "Eloquent ORM", "Redis"],
      frontend: ["JavaScript", "jQuery", "HTML", "CSS", "PHP View"],
      tools: ["Git", "PHPUnit", "Postman", "Code Review", "Scrum / Agile", "nginx", "VMware Workstation"],
    },
    howIWork: [
      { title: "Scrum team", detail: "Standups, code reviews, iterative delivery", icon: "cycle" },
      { title: "Automated testing", detail: "PHPUnit for features and reports", icon: "check" },
      { title: "Query performance", detail: "Eloquent scopes + Redis caching", icon: "gauge" },
    ],
  },
  {
    id: "ncmh",
    title: "Web Developer",
    company: "National Center for Mental Health",
    period: "Apr 2021 – Jun 2022",
    skills: {
      backend: ["PHP", "CodeIgniter", "MySQL", "CodeIgniter Query Builder"],
      frontend: ["JavaScript", "jQuery", "HTML", "CSS", "Bootstrap"],
      tools: ["Git", "Docker", "Code Review", "Scrum / Agile", "MySQL Workbench", "XAMPP"],
    },
    howIWork: [
      { title: "Agile, 3-developer team", detail: "Sprints, planning, Scrum/Kanban", icon: "cycle" },
      { title: "Requirements from users", detail: "Worked directly with doctors and nurses", icon: "users" },
      { title: "Demo and feedback", detail: "Tested features with hospital users", icon: "chat" },
    ],
  },
  {
    id: "leekie",
    title: "Junior Back End Programmer",
    company: "LEEKIE Enterprise Inc.",
    period: "Mar 2020 – Aug 2020",
    skills: {
      backend: ["PHP", "Laravel", "RESTful API", "CodeIgniter", "MySQL"],
      tools: ["Git", "MySQL Workbench", "XAMPP"],
    },
    howIWork: [
      { title: "Learn the system first", detail: "Study and test existing API endpoints", icon: "search" },
      { title: "Documentation", detail: "Shared technical notes for the team", icon: "book" },
    ],
  },
  {
    id: "abztrak",
    title: "System Programmer",
    company: "Abztrak Inc",
    period: "Dec 2018 – May 2019",
    skills: {
      backend: ["Java", "Kotlin", "Room Database", "SQL"],
      tools: ["Git", "Android Studio"],
    },
    howIWork: [
      { title: "Feature parity", detail: "Ported an existing POS system to Android", icon: "swap" },
      { title: "Device testing", detail: "Physical devices, Android 4.4–7.1", icon: "phone" },
      { title: "Debugging", detail: "Fixed bugs while shipping enhancements", icon: "bug" },
    ],
  },
];
