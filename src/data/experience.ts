// data/experience.ts
// Array order inside each category = display order (most important first).
export type Category = "backend" | "frontend" | "tools";

export interface Skill {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
}

export interface Company {
  id: string;
  title: string;
  company: string;
  skills: Record<Category, Skill[]>;
}

export const COMPANIES: Company[] = [
  {
    id: "microsourcing",
    title: "Mid-Level Full Stack Developer",
    company: "MicroSourcing",
    skills: {
      backend: [
        { name: "PHP", level: 5 },
        { name: "Laravel", level: 5 },
        { name: "RESTful API", level: 5 },
        { name: "MySQL", level: 5 },
        { name: "SQL", level: 5 },
        { name: "Service Layer", level: 5 },
        { name: "Laravel Query Builder", level: 5 },
        { name: "Payment API Integration", level: 5 },
      ],
      frontend: [
        { name: "JavaScript", level: 3 },
        { name: "Laravel Blade", level: 3 },
        { name: "HTML", level: 3 },
        { name: "CSS", level: 3 },
        { name: "jQuery", level: 3 },
        { name: "Bootstrap", level: 3 },
        { name: "Multi-step Form Development", level: 3 },
      ],
      tools: [
        { name: "Git", level: 4 },
        { name: "PHPUnit", level: 3 },
        { name: "Code Review", level: 3 },
        { name: "MySQL Workbench", level: 3 },
        { name: "ChatGPT", level: 3},
        { name: "Claude", level: 3}
      ],
    },
  },
  {
    id: "8bacus",
    title: "Full Stack Developer",
    company: "8bacus",
    skills: {
      backend: [
        { name: "PHP", level: 5 },
        { name: "Laravel", level: 5 },
        { name: "RESTful API", level: 5 },
        { name: "MySQL", level: 5 },
        { name: "Service Layer", level: 5 },
        { name: "Third-Party API Integration", level: 5 },
        { name: "WebSocket", level: 5 },
        { name: "Laravel Query Builder", level: 5 },
        { name: "CTE", level: 5 },
        { name: "CQRS", level: 3 },
      ],
      frontend: [
        { name: "JavaScript", level: 5 },
        { name: "React", level: 3 },
        { name: "TypeScript", level: 4 },
        { name: "Vue.js", level: 5 },
        { name: "Laravel Blade", level: 5 },
        { name: "Tailwind CSS", level: 4 },
        { name: "jQuery", level: 5 },
        { name: "HTML", level: 5 },
        { name: "CSS", level: 5 },
      ],
      tools: [
        { name: "Git", level: 4 },
        { name: "Code Review", level: 4 },
        { name: "PHPUnit", level: 4 },
        { name: "Postman", level: 4 },
        { name: "npm", level: 3 },
        { name: "DBeaver", level: 4 },
        { name: "ChatGPT", level: 3}
      ],
    },
  },
  {
    id: "elgada",
    title: "Jr. Full Stack Developer",
    company: "Elgada BPO Solutions, Inc.",
    skills: {
      backend: [
        { name: "PHP", level: 5 },
        { name: "CodeIgniter", level: 5 },
        { name: "RESTful API", level: 5 },
        { name: "MySQL", level: 5 },
        { name: "Eloquent ORM", level: 5 },
        { name: "Redis", level: 5 },
      ],
      frontend: [
        { name: "JavaScript", level: 3 },
        { name: "jQuery", level: 5 },
        { name: "HTML", level: 3 },
        { name: "CSS", level: 3 },
        { name: "PHP View", level: 3 },
      ],
      tools: [
        { name: "Git", level: 4 },
        { name: "PHPUnit", level: 4 },
        { name: "Postman", level: 4 },
        { name: "Code Review", level: 3 },
        { name: "Scrum / Agile", level: 4 },
        { name: "nginx", level: 4 },
        { name: "VMware Workstation", level: 4 },
      ],
    },
  },
  {
    id: "ncmh",
    title: "Web Developer",
    company: "National Center for Mental Health",
    skills: {
      backend: [
        { name: "PHP", level: 5 },
        { name: "CodeIgniter", level: 5 },
        { name: "MySQL", level: 5 },
        { name: "CodeIgniter Query Builder", level: 5 },
      ],
      frontend: [
        { name: "JavaScript", level: 3 },
        { name: "jQuery", level: 3 },
        { name: "HTML", level: 3 },
        { name: "CSS", level: 3 },
        { name: "Bootstrap", level: 3 },
      ],
      tools: [
        { name: "Git", level: 4 },
        { name: "Docker", level: 4 },
        { name: "Code Review", level: 3 },
        { name: "Scrum / Agile", level: 4 },
        { name: "MySQL Workbench", level: 3 },
        { name: "XAMPP", level: 4 },
      ],
    },
  },
  {
    id: "leekie",
    title: "Junior Back End Web Developer",
    company: "LEEKIE Enterprise Inc.",
    skills: {
      backend: [
        { name: "PHP", level: 5 },
        { name: "Laravel", level: 5 },
        { name: "RESTful API", level: 5 },
        { name: "CodeIgniter", level: 5 },
        { name: "MySQL", level: 5 },
      ],
      frontend: [],
      tools: [
        { name: "Git", level: 4 },
        { name: "MySQL Workbench", level: 3 },
        { name: "XAMPP", level: 4 },
      ],
    },
  },
  {
    id: "blackfort",
    title: "Junior Web Developer",
    company: "Blackfort Consulting Inc.",
    skills: {
      backend: [
        { name: "C#", level: 5 },
        { name: "ASP.NET", level: 5 },
        { name: "MVC", level: 5 },
        { name: "MySQL", level: 5 },
      ],
      frontend: [
        { name: "JavaScript", level: 3 },
        { name: "jQuery", level: 3 },
        { name: "HTML", level: 3 },
        { name: "CSS", level: 3 },
      ],
      tools: [
        { name: "Git", level: 4 },
        { name: "Visual Studio", level: 4 },
        { name: "MySQL Workbench", level: 3 },
      ],
    },
  },
  {
    id: "abztrak",
    title: "System Programmer",
    company: "Abztrak Inc",
    skills: {
      backend: [
        { name: "Java", level: 5 },
        { name: "Kotlin", level: 5 },
        { name: "Room Database", level: 5 },
        { name: "SQL", level: 5 },
      ],
      frontend: [],
      tools: [
        { name: "Git", level: 4 },
        { name: "Android Studio", level: 4 },
      ],
    },
  },
];