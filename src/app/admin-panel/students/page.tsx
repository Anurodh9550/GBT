"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin-panel/AdminPageHeader";
import AdminDataTable from "@/components/admin-panel/AdminDataTable";
import AdminFormPanel, { AdminField } from "@/components/admin-panel/AdminFormPanel";
import { useAdminToast } from "@/components/admin-panel/AdminProvider";
import { useAdminList } from "@/hooks/useAdminList";
import { adminApi, getCourseOptions } from "@/lib/admin-api";
import { ADMIN_INPUT, ADMIN_SELECT, parseAdminError } from "@/lib/admin-utils";

export default function AdminStudentsPage() {
  const { toast } = useAdminToast();
  const loadFn = useCallback(() => adminApi.students.list(), []);
  const { items, total, loading, search, setSearch, reload } = useAdminList(loadFn, [
    "roll_number", "first_name", "last_name", "course_name", "batch",
  ]);

  const [courses, setCourses] = useState<{ id: number; code: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    username: "", password: "", first_name: "", last_name: "", email: "",
    roll_number: "", course: "", semester: "1", batch: "2024-28",
  });

  useEffect(() => {
    getCourseOptions().then(setCourses).catch(console.error);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.students.create({
        ...form,
        course: form.course ? Number(form.course) : null,
        semester: Number(form.semester),
      });
      toast("Student account created successfully");
      setShowForm(false);
      setForm({ username: "", password: "", first_name: "", last_name: "", email: "", roll_number: "", course: "", semester: "1", batch: "2024-28" });
      reload();
    } catch (err) {
      toast(parseAdminError(err), "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Student Management"
        subtitle="Create and manage student ERP accounts — login via roll number"
        badge={`${total} enrolled`}
        action={
          <button type="button" onClick={() => setShowForm(!showForm)} className="btn-primary text-xs">
            {showForm ? "Cancel" : "+ Add Student"}
          </button>
        }
      />

      {showForm && (
        <AdminFormPanel title="New Student Account" onSubmit={handleSubmit} submitLabel="Create Student" loading={saving}>
          <AdminField label="Username"><input required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className={ADMIN_INPUT} /></AdminField>
          <AdminField label="Password"><input required type="password" minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={ADMIN_INPUT} /></AdminField>
          <AdminField label="First Name"><input required value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} className={ADMIN_INPUT} /></AdminField>
          <AdminField label="Last Name"><input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} className={ADMIN_INPUT} /></AdminField>
          <AdminField label="Email"><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={ADMIN_INPUT} /></AdminField>
          <AdminField label="Roll Number"><input required value={form.roll_number} onChange={(e) => setForm({ ...form, roll_number: e.target.value })} className={ADMIN_INPUT} placeholder="GBT2024001" /></AdminField>
          <AdminField label="Course">
            <select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className={ADMIN_SELECT}>
              <option value="">Select course</option>
              {courses.map((c) => <option key={c.id} value={c.id}>{c.code}</option>)}
            </select>
          </AdminField>
          <AdminField label="Semester"><input type="number" min={1} max={8} value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} className={ADMIN_INPUT} /></AdminField>
          <AdminField label="Batch"><input value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value })} className={ADMIN_INPUT} /></AdminField>
        </AdminFormPanel>
      )}

      <AdminDataTable
        loading={loading}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by roll no, name, course..."
        rows={items}
        emptyMessage="No students found. Add your first student above."
        columns={[
          { key: "roll_number", label: "Roll No", render: (r) => <span className="font-mono font-semibold text-brand-maroon">{String(r.roll_number)}</span> },
          { key: "name", label: "Name", render: (r) => `${r.first_name} ${r.last_name}` },
          { key: "course_name", label: "Course" },
          { key: "semester", label: "Sem", align: "center" },
          { key: "batch", label: "Batch", align: "center" },
          {
            key: "is_active",
            label: "Status",
            align: "center",
            render: (r) => (
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${r.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                {r.is_active ? "Active" : "Inactive"}
              </span>
            ),
          },
        ]}
      />
    </>
  );
}
