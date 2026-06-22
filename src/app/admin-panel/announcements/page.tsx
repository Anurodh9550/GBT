"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin-panel/AdminPageHeader";
import { adminApi } from "@/lib/admin-api";

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState({ message: "", link: "", link_label: "Learn More" });
  const [showForm, setShowForm] = useState(false);

  const load = () => adminApi.announcements.list().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await adminApi.announcements.create({ ...form, is_active: true });
    setShowForm(false);
    load();
  };

  return (
    <>
      <AdminPageHeader title="Announcements" subtitle="Top bar announcements on the website" action={<button type="button" onClick={() => setShowForm(!showForm)} className="btn-primary text-xs">{showForm ? "Cancel" : "+ Add"}</button>} />
      {showForm && (
        <form onSubmit={handleSubmit} className="card-surface mb-6 space-y-4 p-6">
          <div><label className="mb-1 block text-xs font-semibold text-slate-500">Message</label><input required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1 block text-xs font-semibold text-slate-500">Link URL</label><input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-xs font-semibold text-slate-500">Link Label</label><input value={form.link_label} onChange={(e) => setForm({ ...form, link_label: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          </div>
          <button type="submit" className="btn-primary">Save</button>
        </form>
      )}
      <div className="card-surface divide-y">
        {items.map((a) => (
          <div key={String(a.id)} className="flex items-center justify-between p-4">
            <p className="text-sm">{String(a.message)}</p>
            <button type="button" onClick={() => { if (confirm("Delete?")) adminApi.announcements.delete(Number(a.id)).then(load); }} className="text-xs text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
