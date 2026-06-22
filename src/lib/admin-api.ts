import { API_URL } from "@/lib/api";
import { getAdminToken } from "@/lib/admin-auth";

type Paginated<T> = { count: number; results: T[] };

async function adminFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers || {}),
    },
  });
  if (res.status === 401) {
    if (typeof window !== "undefined") window.location.href = "/admin-login";
    throw new Error("Unauthorized");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(err) || `Error ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

function unwrap<T>(data: Paginated<T> | T[]): T[] {
  if (Array.isArray(data)) return data;
  return data.results ?? [];
}

function crud(base: string) {
  return {
    list: () => adminFetch<Paginated<Record<string, unknown>>>(base).then(unwrap),
    create: (data: Record<string, unknown>) =>
      adminFetch(base, { method: "POST", body: JSON.stringify(data) }),
    update: (id: number, data: Record<string, unknown>) =>
      adminFetch(`${base}${id}/`, { method: "PATCH", body: JSON.stringify(data) }),
    delete: (id: number) => adminFetch(`${base}${id}/`, { method: "DELETE" }),
  };
}

export const adminApi = {
  login: async (username: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/admin/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json() as Promise<{ access: string; user: unknown }>;
  },

  dashboard: () => adminFetch<Record<string, number>>("/api/admin/cms/dashboard/"),

  courses: {
    list: () => adminFetch<Paginated<Record<string, unknown>>>("/api/admin/cms/courses/").then(unwrap),
    create: (data: Record<string, unknown>) =>
      adminFetch("/api/admin/cms/courses/", { method: "POST", body: JSON.stringify(data) }),
    delete: (slug: string) => adminFetch(`/api/admin/cms/courses/${slug}/`, { method: "DELETE" }),
  },

  departments: {
    list: () => adminFetch<Paginated<Record<string, unknown>>>("/api/admin/cms/departments/").then(unwrap),
    create: (data: Record<string, unknown>) =>
      adminFetch("/api/admin/cms/departments/", { method: "POST", body: JSON.stringify(data) }),
    delete: (slug: string) => adminFetch(`/api/admin/cms/departments/${slug}/`, { method: "DELETE" }),
  },

  news: {
    list: () => adminFetch<Paginated<Record<string, unknown>>>("/api/admin/cms/news/").then(unwrap),
    create: (data: Record<string, unknown>) =>
      adminFetch("/api/admin/cms/news/", { method: "POST", body: JSON.stringify(data) }),
    delete: (id: number) => adminFetch(`/api/admin/cms/news/${id}/`, { method: "DELETE" }),
  },

  announcements: {
    list: () => adminFetch<Paginated<Record<string, unknown>>>("/api/admin/cms/announcements/").then(unwrap),
    create: (data: Record<string, unknown>) =>
      adminFetch("/api/admin/cms/announcements/", { method: "POST", body: JSON.stringify(data) }),
    delete: (id: number) => adminFetch(`/api/admin/cms/announcements/${id}/`, { method: "DELETE" }),
  },

  admissions: {
    list: () => adminFetch<Paginated<Record<string, unknown>>>("/api/admin/cms/admissions/").then(unwrap),
    update: (id: number, data: Record<string, unknown>) =>
      adminFetch(`/api/admin/cms/admissions/${id}/`, { method: "PATCH", body: JSON.stringify(data) }),
  },

  messages: {
    list: () => adminFetch<Paginated<Record<string, unknown>>>("/api/admin/cms/messages/").then(unwrap),
    update: (id: number, data: Record<string, unknown>) =>
      adminFetch(`/api/admin/cms/messages/${id}/`, { method: "PATCH", body: JSON.stringify(data) }),
  },

  students: {
    list: () => adminFetch<Paginated<Record<string, unknown>>>("/api/admin/accounts/students/").then(unwrap),
    create: (data: Record<string, unknown>) =>
      adminFetch("/api/admin/accounts/students/create/", { method: "POST", body: JSON.stringify(data) }),
  },

  faculty: {
    list: () => adminFetch<Paginated<Record<string, unknown>>>("/api/admin/accounts/faculty/").then(unwrap),
    create: (data: Record<string, unknown>) =>
      adminFetch("/api/admin/accounts/faculty/create/", { method: "POST", body: JSON.stringify(data) }),
  },

  erpAnnouncements: crud("/api/admin/erp/erp-announcements/"),
  assignments: crud("/api/admin/erp/assignments/"),
  lectures: crud("/api/admin/erp/lectures/"),
  courseContent: crud("/api/admin/erp/course-content/"),
  attendance: crud("/api/admin/erp/attendance/"),
  marks: crud("/api/admin/erp/marks/"),
  leave: {
    list: () => adminFetch<Paginated<Record<string, unknown>>>("/api/admin/erp/leave/").then(unwrap),
    update: (id: number, data: Record<string, unknown>) =>
      adminFetch(`/api/admin/erp/leave/${id}/`, { method: "PATCH", body: JSON.stringify(data) }),
  },
};

export type CourseOption = { id: number; code: string; title: string };
export type FacultyOption = { id: number; username: string; employee_id: string; first_name: string };
export type StudentOption = { id: number; username: string; roll_number: string; first_name: string };

export async function getCourseOptions(): Promise<CourseOption[]> {
  const list = await adminApi.courses.list();
  return list.map((c) => ({ id: Number(c.id), code: String(c.code), title: String(c.title) }));
}

export async function getFacultyOptions(): Promise<FacultyOption[]> {
  const list = await adminApi.faculty.list();
  return list.map((f) => ({
    id: Number(f.id),
    username: String(f.username),
    employee_id: String(f.employee_id),
    first_name: String(f.first_name),
  }));
}

export async function getStudentUserOptions(): Promise<{ id: number; label: string }[]> {
  const list = await adminApi.students.list();
  return list.map((s) => ({
    id: Number(s.user_id),
    label: `${s.first_name} ${s.last_name} (${s.roll_number})`,
  }));
}

export async function getDepartmentOptions(): Promise<{ id: number; name: string }[]> {
  const list = await adminApi.departments.list();
  return list.map((d) => ({ id: Number(d.id), name: String(d.name) }));
}

export async function getFacultyUserOptions(): Promise<{ id: number; label: string }[]> {
  const list = await adminApi.faculty.list();
  return list.map((f) => ({
    id: Number(f.user_id),
    label: `${f.first_name} ${f.last_name} (${f.employee_id})`,
  }));
}
