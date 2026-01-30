export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export function getToken(): string | null {
  return localStorage.getItem("auth:token");
}

export function setToken(token: string) {
  localStorage.setItem("auth:token", token);
}

export function clearToken() {
  localStorage.removeItem("auth:token");
}

export function authHeader() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}
