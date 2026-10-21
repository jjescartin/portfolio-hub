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