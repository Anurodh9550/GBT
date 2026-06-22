"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin-panel/AdminPageHeader";
import { adminApi, getCourseOptions, getFacultyUserOptions } from "@/lib/admin-api";

const inputCls = "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm";

export default function AdminCourseContentPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [courses, setCourses] = useState<{ id: number; code: string }[]>([]);
  const [faculty, setFaculty] = useState<{ id: number; label: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", course: "", faculty: "", external_url: "" });

  const load = () => adminApi.courseContent.list().then(setItems).catch(console.error);
  useEffect(() => { load(); getCourseOptions().then(setCourses); getFacultyUserOptions().then(setFaculty); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await adminApi.courseContent.create({ ...form, course: Number(form.course), faculty: Number(form.faculty) });
    setShowForm(false);
    load();
  };

  return (
    <>
      <AdminPageHeader title="Course Content" subtitle="Study materials for Student ERP" action={
        <button type="button" onClick={() => setShowForm(!showForm)} className="btn-primary text-xs">{showForm ? "Cancel" : "+ Add Content"}</button>
      } />
      {showForm && (
        <form onSubmit={handleSubmit} className="card-surface mb-6 grid gap-4 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2"><label className="mb-1 block text-xs font-semibold text-slate-500">Title</label><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} /></div>
          <div><label className="mb-1 block text-xs font-semibold text-slate-500">Course</label><select required value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className={inputCls}><option value="">Select</option>{courses.map((c) => <option key={c.id} value={c.id}>{c.code}</option>)}</select></div>
          <div><label className="mb-1 block text-xs font-semibold text-slate-500">Faculty</label><select required value={form.faculty} onChange={(e) => setForm({ ...form, faculty: e.target.value })} className={inputCls}><option value="">Select</option>{faculty.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}</select></div>
          <div className="sm:col-span-2"><label className="mb-1 block text-xs font-semibold text-slate-500">Link / URL</label><input value={form.external_url} onChange={(e) => setForm({ ...form, external_url: e.target.value })} className={inputCls} /></div>
          <button type="submit" className="btn-primary sm:col-span-2">Save</button>
        </form>
      )}
      <div className="card-surface divide-y">{items.map((c) => (
        <div key={String(c.id)} className="flex justify-between p-4"><div><p className="font-semibold">{String(c.title)}</p><p className="text-xs text-slate-500">{String(c.course_name)}</p></div>
          <button type="button" onClick={() => { if (confirm("Delete?")) adminApi.courseContent.delete(Number(c.id)).then(load); }} className="text-xs text-red-600">Delete</button></div>
      ))}</div>
    </>
  );
}
