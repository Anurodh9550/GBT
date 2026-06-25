export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export function apiConnectionError(): string {
  if (typeof window !== "undefined" && !window.location.hostname.includes("localhost")) {
    if (API_URL.includes("127.0.0.1") || API_URL.includes("localhost")) {
      return "API not configured. In Vercel → Settings → Environment Variables, set NEXT_PUBLIC_API_URL to your Render backend (e.g. https://backend-gbt.onrender.com), then redeploy.";
    }
  }
  return "Cannot reach server. Start backend: cd backend && python manage.py runserver";
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit & { token?: string }
): Promise<T> {
  const { token, ...rest } = options || {};
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(rest.headers || {}),
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, { ...rest, headers });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as {
      detail?: string;
      non_field_errors?: string[];
      [key: string]: unknown;
    };
    const firstVal = Object.values(err)[0];
    const message =
      err.detail ||
      err.non_field_errors?.[0] ||
      (Array.isArray(firstVal) ? String(firstVal[0]) : typeof firstVal === "string" ? firstVal : undefined) ||
      `API error ${res.status}`;
    throw new Error(typeof message === "string" ? message : "Request failed");
  }
  return res.json();
}

export const api = {
  courses: () => apiFetch<{ results?: unknown[] } | unknown[]>("/api/cms/courses/?featured=true"),
  departments: () => apiFetch<{ results?: unknown[] } | unknown[]>("/api/cms/departments/"),
  news: () => apiFetch<{ results?: unknown[] } | unknown[]>("/api/cms/news/"),
  gallery: () => apiFetch<{ results?: unknown[] } | unknown[]>("/api/cms/gallery/"),
  testimonials: () => apiFetch<{ results?: unknown[] } | unknown[]>("/api/cms/testimonials/"),
  stats: (section = "hero") => apiFetch<{ results?: unknown[] } | unknown[]>(`/api/cms/stats/?section=${section}`),
  announcements: () => apiFetch<{ results?: unknown[] } | unknown[]>("/api/cms/announcements/"),
  submitAdmission: (data: Record<string, unknown>) =>
    apiFetch("/api/cms/admissions/", { method: "POST", body: JSON.stringify(data) }),
  submitContact: (data: Record<string, unknown>) =>
    apiFetch("/api/cms/contact/", { method: "POST", body: JSON.stringify(data) }),
  studentLogin: (username: string, password: string) =>
    apiFetch<{ access: string; refresh: string; user: unknown }>("/api/auth/student/login/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  facultyLogin: (username: string, password: string) =>
    apiFetch<{ access: string; refresh: string; user: unknown }>("/api/auth/faculty/login/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
};

export { API_URL };
