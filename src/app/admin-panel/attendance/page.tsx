"use client";

import { FormEvent, useEffect, useState, useCallback } from "react";
import AdminPageHeader from "@/components/admin-panel/AdminPageHeader";
import AdminDataTable from "@/components/admin-panel/AdminDataTable";
import AdminFormPanel, { AdminField } from "@/components/admin-panel/AdminFormPanel";
import { useAdminToast } from "@/components/admin-panel/AdminProvider";
import { useAdminList } from "@/hooks/useAdminList";
import { adminApi, getCourseOptions, getStudentUserOptions } from "@/lib/admin-api";
import { ADMIN_INPUT, ADMIN_SELECT, formatAdminDate, parseAdminError } from "@/lib/admin-utils";

const statusStyle: Record<string, string> = {
  present: "bg-green-100 text-green-700",
  absent: "bg-red-100 text-red-600",
  late: "bg-amber-100 text-amber-700",
};

export default function AdminAttendancePage() {
  const { toast } = useAdminToast();
  const loadFn = useCallback(() => adminApi.attendance.list(), []);
  const { items, total, loading, search, setSearch, reload } = useAdminList(loadFn, [
    "student_name", "course_name", "status", "date",
  ]);

  const [students, setStudents] = useState<{ id: number; label: string }[]>([]);
  const [courses, setCourses] = useState<{ id: number; code: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ student: "", course: "", date: new Date().toISOString().slice(0, 10), status: "present" });

  useEffect(() => {
    getStudentUserOptions().then(setStudents);
    getCourseOptions().then(setCourses);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.attendance.create({
        student: Number(form.student),
        course: Number(form.course),
        date: form.date,
        status: form.status,
      });
      toast("Attendance recorded");
      setShowForm(false);
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
        title="Attendance Management"
        subtitle="Mark and review student attendance records"
        badge={`${total} records`}
        action={
          <button type="button" onClick={() => setShowForm(!showForm)} className="btn-primary text-xs">
            {showForm ? "Cancel" : "+ Mark Attendance"}
          </button>
        }
      />

      {showForm && (
        <AdminFormPanel title="Mark Attendance" onSubmit={handleSubmit} loading={saving}>
          <AdminField label="Student">
            <select required value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })} className={ADMIN_SELECT}>
              <option value="">Select student</option>
              {students.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </AdminField>
          <AdminField label="Course">
            <select required value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className={ADMIN_SELECT}>
              <option value="">Select course</option>
              {courses.map((c) => <option key={c.id} value={c.id}>{c.code}</option>)}
            </select>
          </AdminField>
          <AdminField label="Date"><input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={ADMIN_INPUT} /></AdminField>
          <AdminField label="Status">
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={ADMIN_SELECT}>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
          </AdminField>
        </AdminFormPanel>
      )}

      <AdminDataTable
        loading={loading}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search student, course, date..."
        rows={items}
        emptyMessage="No attendance records yet"
        columns={[
          { key: "student_name", label: "Student" },
          { key: "course_name", label: "Course" },
          { key: "date", label: "Date", align: "center", render: (r) => formatAdminDate(r.date) },
          {
            key: "status",
            label: "Status",
            align: "center",
            render: (r) => (
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${statusStyle[String(r.status)] || "bg-slate-100"}`}>
                {String(r.status)}
              </span>
            ),
          },
        ]}
      />
    </>
  );
}
