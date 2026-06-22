"use client";

import { FormEvent, useEffect, useState, useCallback } from "react";
import AdminPageHeader from "@/components/admin-panel/AdminPageHeader";
import AdminDataTable from "@/components/admin-panel/AdminDataTable";
import AdminFormPanel, { AdminField } from "@/components/admin-panel/AdminFormPanel";
import { useAdminToast } from "@/components/admin-panel/AdminProvider";
import { useAdminList } from "@/hooks/useAdminList";
import { adminApi, getCourseOptions, getStudentUserOptions } from "@/lib/admin-api";
import { ADMIN_INPUT, ADMIN_SELECT, parseAdminError } from "@/lib/admin-utils";

export default function AdminMarksPage() {
  const { toast } = useAdminToast();
  const loadFn = useCallback(() => adminApi.marks.list(), []);
  const { items, total, loading, search, setSearch, reload } = useAdminList(loadFn, [
    "student_name", "course_name", "exam_type",
  ]);

  const [students, setStudents] = useState<{ id: number; label: string }[]>([]);
  const [courses, setCourses] = useState<{ id: number; code: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ student: "", course: "", exam_type: "mst", marks_obtained: "", max_marks: "100" });

  useEffect(() => {
    getStudentUserOptions().then(setStudents);
    getCourseOptions().then(setCourses);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.marks.create({
        student: Number(form.student),
        course: Number(form.course),
        exam_type: form.exam_type,
        marks_obtained: form.marks_obtained,
        max_marks: form.max_marks,
      });
      toast("Marks saved successfully");
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
        title="Marks & Evaluation"
        subtitle="Enter MST and final examination marks for students"
        badge={`${total} entries`}
        action={
          <button type="button" onClick={() => setShowForm(!showForm)} className="btn-primary text-xs">
            {showForm ? "Cancel" : "+ Enter Marks"}
          </button>
        }
      />

      {showForm && (
        <AdminFormPanel title="Enter Marks" onSubmit={handleSubmit} loading={saving}>
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
          <AdminField label="Exam Type">
            <select value={form.exam_type} onChange={(e) => setForm({ ...form, exam_type: e.target.value })} className={ADMIN_SELECT}>
              <option value="mst">MST (Mid-Sem)</option>
              <option value="final">Final Evaluation</option>
            </select>
          </AdminField>
          <AdminField label="Marks Obtained"><input required type="number" min={0} value={form.marks_obtained} onChange={(e) => setForm({ ...form, marks_obtained: e.target.value })} className={ADMIN_INPUT} /></AdminField>
          <AdminField label="Max Marks"><input required type="number" min={1} value={form.max_marks} onChange={(e) => setForm({ ...form, max_marks: e.target.value })} className={ADMIN_INPUT} /></AdminField>
        </AdminFormPanel>
      )}

      <AdminDataTable
        loading={loading}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search student, course, exam type..."
        rows={items}
        emptyMessage="No marks entered yet"
        columns={[
          { key: "student_name", label: "Student" },
          { key: "course_name", label: "Course" },
          { key: "exam_type", label: "Type", align: "center", render: (r) => <span className="uppercase font-semibold text-xs">{String(r.exam_type)}</span> },
          {
            key: "marks",
            label: "Score",
            align: "center",
            render: (r) => (
              <span className="font-bold text-brand-maroon">
                {String(r.marks_obtained)}<span className="font-normal text-slate-400">/{String(r.max_marks)}</span>
              </span>
            ),
          },
        ]}
      />
    </>
  );
}
