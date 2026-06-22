"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin-panel/AdminPageHeader";
import { adminApi, getCourseOptions, getFacultyUserOptions } from "@/lib/admin-api";

const inputCls = "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm";

export default function AdminAssignmentsPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [courses, setCourses] = useState<{ id: number; code: string }[]>([]);
  const [faculty, setFaculty] = useState<{ id: number; label: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", course: "", faculty: "", due_date: "" });

  const load = () => adminApi.assignments.list().then(setItems).catch(console.error);
  useEffect(() => {
    load();
    getCourseOptions().then(setCourses);
    getFacultyUserOptions().then(setFaculty);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await adminApi.assignments.create({
      title: form.title,
      description: form.description,
      course: Number(form.course),
      faculty: Number(form.faculty),
      due_date: form.due_date || null,
      is_active: true,
    });
    setShowForm(false);
    load();
  };

  return (
    <>
      <AdminPageHeader title="Assignments" subtitle="Student ERP — Assignment module" action={
        <button type="button" onClick={() => setShowForm(!showForm)} className="btn-primary text-xs">{showForm ? "Cancel" : "+ Add Assignment"}</button>
      } />
      {showForm && (
        <form onSubmit={handleSubmit} className="card-surface mb-6 grid gap-4 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2"><label className="mb-1 block text-xs font-semibold text-slate-500">Title</label><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} /></div>
          <div className="sm:col-span-2"><label className="mb-1 block text-xs font-semibold text-slate-500">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className={inputCls} /></div>
          <div><label className="mb-1 block text-xs font-semibold text-slate-500">Course</label><select required value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className={inputCls}><option value="">Select</option>{courses.map((c) => <option key={c.id} value={c.id}>{c.code}</option>)}</select></div>
          <div><label className="mb-1 block text-xs font-semibold text-slate-500">Faculty</label><select required value={form.faculty} onChange={(e) => setForm({ ...form, faculty: e.target.value })} className={inputCls}><option value="">Select</option>{faculty.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}</select></div>
          <div><label className="mb-1 block text-xs font-semibold text-slate-500">Due Date</label><input type="datetime-local" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} className={inputCls} /></div>
          <button type="submit" className="btn-primary sm:col-span-2">Save</button>
        </form>
      )}
      <div className="card-surface overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3 text-left">Title</th><th className="px-4 py-3 text-left">Course</th><th className="px-4 py-3 text-left">Faculty</th><th className="px-4 py-3">Action</th></tr></thead>
          <tbody>{items.map((a) => (
            <tr key={String(a.id)} className="border-b"><td className="px-4 py-3">{String(a.title)}</td><td className="px-4 py-3">{String(a.course_name)}</td><td className="px-4 py-3">{String(a.faculty_name)}</td>
              <td className="px-4 py-3 text-center"><button type="button" onClick={() => { if (confirm("Delete?")) adminApi.assignments.delete(Number(a.id)).then(load); }} className="text-xs text-red-600">Delete</button></td></tr>
          ))}</tbody>
        </table>
      </div>
    </>
  );
}
