"use client";

import { useCallback, useState } from "react";
import AdminPageHeader from "@/components/admin-panel/AdminPageHeader";
import AdminDataTable from "@/components/admin-panel/AdminDataTable";
import { useAdminToast } from "@/components/admin-panel/AdminProvider";
import { useAdminList } from "@/hooks/useAdminList";
import { adminApi } from "@/lib/admin-api";
import { formatAdminDate, parseAdminError } from "@/lib/admin-utils";

const statusStyle: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
};

export default function AdminLeavePage() {
  const { toast } = useAdminToast();
  const [filter, setFilter] = useState("all");
  const loadFn = useCallback(() => adminApi.leave.list(), []);
  const { items, loading, search, setSearch, reload } = useAdminList(loadFn, [
    "applicant_name", "applicant_role", "reason", "status",
  ]);

  const filtered = filter === "all" ? items : items.filter((l) => String(l.status) === filter);
  const pendingCount = items.filter((l) => l.status === "pending").length;

  const updateStatus = async (id: number, status: string) => {
    try {
      await adminApi.leave.update(id, { status });
      toast(`Leave ${status}`);
      reload();
    } catch (err) {
      toast(parseAdminError(err), "error");
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Leave Applications"
        subtitle="Review and approve student & faculty leave requests"
        badge={pendingCount > 0 ? `${pendingCount} pending` : undefined}
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {["all", "pending", "approved", "rejected"].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition ${
              filter === s ? "bg-brand-maroon text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <AdminDataTable
        loading={loading}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by applicant, reason..."
        rows={filtered}
        emptyMessage="No leave applications found"
        columns={[
          { key: "applicant_name", label: "Applicant", render: (r) => <span className="font-medium">{String(r.applicant_name)}</span> },
          { key: "applicant_role", label: "Role", render: (r) => <span className="capitalize">{String(r.applicant_role)}</span> },
          { key: "from_date", label: "From", render: (r) => formatAdminDate(r.from_date) },
          { key: "to_date", label: "To", render: (r) => formatAdminDate(r.to_date) },
          { key: "reason", label: "Reason", render: (r) => <span className="max-w-xs truncate block">{String(r.reason)}</span> },
          {
            key: "status",
            label: "Status",
            align: "center",
            render: (r) => (
              <select
                value={String(r.status)}
                onChange={(e) => updateStatus(Number(r.id), e.target.value)}
                className={`rounded-lg border-0 px-2 py-1 text-xs font-bold capitalize ${statusStyle[String(r.status)] || "bg-slate-100"}`}
              >
                {["pending", "approved", "rejected"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            ),
          },
        ]}
      />
    </>
  );
}
