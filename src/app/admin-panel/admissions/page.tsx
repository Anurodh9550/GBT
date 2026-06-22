"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin-panel/AdminPageHeader";
import { adminApi } from "@/lib/admin-api";

export default function AdminAdmissionsPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const load = () => adminApi.admissions.list().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: number, status: string) => {
    await adminApi.admissions.update(id, { status });
    load();
  };

  return (
    <>
      <AdminPageHeader title="Admission Applications" subtitle="Review and manage student applications" />
      <div className="card-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Course</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={String(a.id)} className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium">{String(a.full_name)}</td>
                <td className="px-4 py-3">{String(a.email)}</td>
                <td className="px-4 py-3">{String(a.phone)}</td>
                <td className="px-4 py-3">{String(a.course_name || a.course || "—")}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                    a.status === "pending" ? "bg-amber-100 text-amber-700" :
                    a.status === "accepted" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
                  }`}>{String(a.status)}</span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={String(a.status)}
                    onChange={(e) => updateStatus(Number(a.id), e.target.value)}
                    className="rounded border px-2 py-1 text-xs"
                  >
                    {["pending", "reviewed", "accepted", "rejected"].map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No applications yet</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
