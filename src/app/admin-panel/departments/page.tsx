"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin-panel/AdminPageHeader";
import { adminApi } from "@/lib/admin-api";

export default function AdminDepartmentsPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ slug: "", name: "", icon: "computer", duration: "", description: "" });

  const load = () => adminApi.departments.list().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await adminApi.departments.create({ ...form, is_active: true, sort_order: items.length });
    setShowForm(false);
    load();
  };

  return (
    <>
      <AdminPageHeader
        title="Departments"
        action={<button type="button" onClick={() => setShowForm(!showForm)} className="btn-primary text-xs">{showForm ? "Cancel" : "+ Add"}</button>}
      />
      {showForm && (
        <form onSubmit={handleSubmit} className="card-surface mb-6 grid gap-4 p-6 sm:grid-cols-2">
          {(["slug", "name", "duration", "icon"] as const).map((f) => (
            <div key={f}>
              <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">{f}</label>
              <input required value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">Description</label>
            <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <button type="submit" className="btn-primary sm:col-span-2">Save</button>
        </form>
      )}
      <div className="card-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
            <tr><th className="px-4 py-3 text-left">Name</th><th className="px-4 py-3 text-left">Duration</th><th className="px-4 py-3">Actions</th></tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={String(d.slug)} className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium">{String(d.name)}</td>
                <td className="px-4 py-3 text-slate-500">{String(d.duration)}</td>
                <td className="px-4 py-3 text-center">
                  <button type="button" onClick={() => { if (confirm("Delete?")) adminApi.departments.delete(String(d.slug)).then(load); }} className="text-xs text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
