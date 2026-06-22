"use client";

type Column = {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  render?: (row: Record<string, unknown>) => React.ReactNode;
};

type AdminDataTableProps = {
  columns: Column[];
  rows: Record<string, unknown>[];
  loading?: boolean;
  error?: string;
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  emptyMessage?: string;
  rowKey?: string;
};

export default function AdminDataTable({
  columns,
  rows,
  loading,
  error,
  search,
  onSearchChange,
  searchPlaceholder = "Search records...",
  emptyMessage = "No records found",
  rowKey = "id",
}: AdminDataTableProps) {
  return (
    <div className="admin-table-wrap">
      {onSearchChange && (
        <div className="border-b border-slate-100 px-4 py-3">
          <input
            type="search"
            value={search ?? ""}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full max-w-sm rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange sm:w-72"
          />
        </div>
      )}

      {error && (
        <div className="border-b border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 ${col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-slate-400">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-orange border-t-transparent" />
                    Loading...
                  </span>
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={String(row[rowKey])} className="border-b border-slate-50 transition hover:bg-slate-50/60">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-3 ${col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"}`}
                    >
                      {col.render ? col.render(row) : String(row[col.key] ?? "—")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
