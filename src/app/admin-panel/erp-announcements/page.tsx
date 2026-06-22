"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin-panel/AdminPageHeader";
import { adminApi } from "@/lib/admin-api";

const inputCls = "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm";

export default function AdminErpAnnouncementsPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", target: "student" });

  const load = () => adminApi.erpAnnouncements.list().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await adminApi.erpAnnouncements.create({ ...form, is_active: true });
    setShowForm(false);
    load();
  };

  return (
    <>
      <AdminPageHeader title="ERP Announcements" subtitle="Notices for Student & Faculty ERP dashboards" action={
        <button type="button" onClick={() => setShowForm(!showForm)} className="btn-primary text-xs">{showForm ? "Cancel" : "+ Post Notice"}</button>
      } />
      {showForm && (
        <form onSubmit={handleSubmit} className="card-surface mb-6 space-y-4 p-6">
          <div><label className="mb-1 block text-xs font-semibold text-slate-500">Title</label><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} /></div>
          <div><label className="mb-1 block text-xs font-semibold text-slate-500">Content</label><textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={3} className={inputCls} /></div>
          <div><label className="mb-1 block text-xs font-semibold text-slate-500">Target</label>
            <select value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} className={inputCls}>
              <option value="all">All</option><option value="student">Students</option><option value="faculty">Faculty</option>
            </select></div>
          <button type="submit" className="btn-primary">Publish</button>
        </form>
      )}
      <div className="card-surface divide-y">
        {items.map((a) => (
          <div key={String(a.id)} className="flex items-start justify-between gap-4 p-4">
            <div>
              <p className="font-semibold text-brand-maroon">{String(a.title)}</p>
              <p className="mt-1 text-sm text-slate-600">{String(a.content)}</p>
              <p className="mt-1 text-xs text-slate-400">Target: {String(a.target)}</p>
            </div>
            <button type="button" onClick={() => { if (confirm("Delete?")) adminApi.erpAnnouncements.delete(Number(a.id)).then(load); }} className="text-xs text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
