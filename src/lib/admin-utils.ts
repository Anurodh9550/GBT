export const ADMIN_INPUT =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange";

export const ADMIN_SELECT = `${ADMIN_INPUT} cursor-pointer`;

export function parseAdminError(err: unknown): string {
  if (err instanceof Error) {
    try {
      const parsed = JSON.parse(err.message) as Record<string, unknown>;
      if (typeof parsed.detail === "string") return parsed.detail;
      const first = Object.values(parsed)[0];
      if (Array.isArray(first)) return String(first[0]);
      if (typeof first === "string") return first;
    } catch {
      return err.message;
    }
    return err.message;
  }
  return "Something went wrong. Please try again.";
}

export function formatAdminDate(value: unknown): string {
  if (!value) return "—";
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function filterRows(
  rows: Record<string, unknown>[],
  query: string,
  keys?: string[]
): Record<string, unknown>[] {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((row) => {
    const values = keys
      ? keys.map((k) => String(row[k] ?? ""))
      : Object.values(row).map((v) => String(v ?? ""));
    return values.some((v) => v.toLowerCase().includes(q));
  });
}
