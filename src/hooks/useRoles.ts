import { ALIASES, DEFAULT_ROLE, ROLES } from "../data/roles";

const SUFFIX = /(developer|engineer|programmer|dev)$/;

export function useRoleKey(): string {
  const raw = new URLSearchParams(window.location.search).get("role") ?? "";
  let key = raw.toLowerCase().replace(/[\s_-]/g, "").replace(SUFFIX, "");
  if (Object.hasOwn(ALIASES, key)) key = ALIASES[key];
  return Object.hasOwn(ROLES, key) ? key : "fullstack";
}

export function useRole(): string {
  return ROLES[useRoleKey()] ?? DEFAULT_ROLE;
}