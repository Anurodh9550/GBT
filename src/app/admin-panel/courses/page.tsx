"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin-panel/AdminPageHeader";
import { adminApi } from "@/lib/admin-api";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Record<string, unknown>[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    code: "", slug: "", title: "", description: "", poster_image_url: "", icon: "📚",
  });

  const load = () => adminApi.courses.list().then(setCourses).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await adminApi.courses.create({
      ...form,
      poster_title: form.title,
      is_featured: true,
      is_active: true,
      sort_order: courses.length,
    });
    setShowForm(false);
    setForm({ code: "", slug: "", title: "", description: "", poster_image_url: "", icon: "📚" });
    load();
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this course?")) return;
    await adminApi.courses.delete(slug);
    load();
  };

  return (
    <>
      <AdminPageHeader
        title="Courses"
        subtitle="Manage featured courses on the website"
        action={
          <button type="button" onClick={() => setShowForm(!showForm)} className="btn-primary text-xs">
            {showForm ? "Cancel" : "+ Add Course"}
          </button>
        }
      />

      {showForm && (
        <form onSubmit={handleSubmit} className="card-surface mb-6 grid gap-4 p-6 sm:grid-cols-2">
          {(["code", "slug", "title", "poster_image_url", "icon"] as const).map((field) => (
            <div key={field}>
              <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">{field.replace("_", " ")}</label>
              <input
                required={field !== "icon"}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">Description</label>
            <textarea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary">Save Course</button>
          </div>
        </form>
      )}

      <div className="card-surface overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={String(c.slug)} className="border-b border-slate-100">
                <td className="px-4 py-3 font-semibold text-brand-maroon">{String(c.code)}</td>
                <td className="px-4 py-3">{String(c.title)}</td>
                <td className="px-4 py-3">{c.is_featured ? "✓" : "—"}</td>
                <td className="px-4 py-3">{c.is_active ? "✓" : "—"}</td>
                <td className="px-4 py-3">
                  <button type="button" onClick={() => handleDelete(String(c.slug))} className="text-xs font-semibold text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
