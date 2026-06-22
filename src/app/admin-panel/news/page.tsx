"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin-panel/AdminPageHeader";
import { adminApi } from "@/lib/admin-api";

export default function AdminNewsPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", tag: "General", content: "", published_date: new Date().toISOString().slice(0, 10) });

  const load = () => adminApi.news.list().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await adminApi.news.create({ ...form, is_published: true });
    setShowForm(false);
    load();
  };

  return (
    <>
      <AdminPageHeader title="News & Events" action={<button type="button" onClick={() => setShowForm(!showForm)} className="btn-primary text-xs">{showForm ? "Cancel" : "+ Add News"}</button>} />
      {showForm && (
        <form onSubmit={handleSubmit} className="card-surface mb-6 grid gap-4 p-6 sm:grid-cols-2">
          <div><label className="mb-1 block text-xs font-semibold text-slate-500">Title</label><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-xs font-semibold text-slate-500">Slug</label><input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-xs font-semibold text-slate-500">Tag</label>
            <select value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm">
              {["Event", "Placement", "Admission", "Academic", "General"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div><label className="mb-1 block text-xs font-semibold text-slate-500">Date</label><input type="date" required value={form.published_date} onChange={(e) => setForm({ ...form, published_date: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div className="sm:col-span-2"><label className="mb-1 block text-xs font-semibold text-slate-500">Content</label><textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={3} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <button type="submit" className="btn-primary sm:col-span-2">Publish</button>
        </form>
      )}
      <div className="card-surface divide-y">
        {items.map((n) => (
          <div key={String(n.id)} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-semibold text-brand-maroon">{String(n.title)}</p>
              <p className="text-xs text-slate-500">{String(n.tag)} · {String(n.published_date)}</p>
            </div>
            <button type="button" onClick={() => { if (confirm("Delete?")) adminApi.news.delete(Number(n.id)).then(load); }} className="text-xs text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
