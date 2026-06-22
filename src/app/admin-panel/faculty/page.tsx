"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin-panel/AdminPageHeader";
import AdminDataTable from "@/components/admin-panel/AdminDataTable";
import AdminFormPanel, { AdminField } from "@/components/admin-panel/AdminFormPanel";
import { useAdminToast } from "@/components/admin-panel/AdminProvider";
import { useAdminList } from "@/hooks/useAdminList";
import { adminApi, getDepartmentOptions } from "@/lib/admin-api";
import { ADMIN_INPUT, ADMIN_SELECT, parseAdminError } from "@/lib/admin-utils";

export default function AdminFacultyPage() {
  const { toast } = useAdminToast();
  const loadFn = useCallback(() => adminApi.faculty.list(), []);
  const { items, total, loading, search, setSearch, reload } = useAdminList(loadFn, [
    "employee_id", "first_name", "last_name", "department_name", "designation",
  ]);

  const [departments, setDepartments] = useState<{ id: number; name: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    username: "", password: "", first_name: "", last_name: "", email: "",
    employee_id: "", department: "", designation: "Assistant Professor",
  });

  useEffect(() => {
    getDepartmentOptions().then(setDepartments).catch(console.error);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.faculty.create({
        ...form,
        department: form.department ? Number(form.department) : null,
      });
      toast("Faculty account created successfully");
      setShowForm(false);
      setForm({ username: "", password: "", first_name: "", last_name: "", email: "", employee_id: "", department: "", designation: "Assistant Professor" });
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
        title="Faculty Management"
        subtitle="Create and manage faculty ERP accounts — login via employee ID"
        badge={`${total} faculty`}
        action={
          <button type="button" onClick={() => setShowForm(!showForm)} className="btn-primary text-xs">
            {showForm ? "Cancel" : "+ Add Faculty"}
          </button>
        }
      />

      {showForm && (
        <AdminFormPanel title="New Faculty Account" onSubmit={handleSubmit} submitLabel="Create Faculty" loading={saving}>
          <AdminField label="Username"><input required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className={ADMIN_INPUT} /></AdminField>
          <AdminField label="Password"><input required type="password" minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={ADMIN_INPUT} /></AdminField>
          <AdminField label="First Name"><input required value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} className={ADMIN_INPUT} /></AdminField>
          <AdminField label="Last Name"><input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} className={ADMIN_INPUT} /></AdminField>
          <AdminField label="Email"><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={ADMIN_INPUT} /></AdminField>
          <AdminField label="Employee ID"><input required value={form.employee_id} onChange={(e) => setForm({ ...form, employee_id: e.target.value })} className={ADMIN_INPUT} placeholder="FAC2021001" /></AdminField>
          <AdminField label="Department">
            <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className={ADMIN_SELECT}>
              <option value="">Select department</option>
              {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </AdminField>
          <AdminField label="Designation"><input required value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className={ADMIN_INPUT} /></AdminField>
        </AdminFormPanel>
      )}

      <AdminDataTable
        loading={loading}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by employee ID, name, department..."
        rows={items}
        emptyMessage="No faculty found. Add your first faculty member above."
        columns={[
          { key: "employee_id", label: "Employee ID", render: (r) => <span className="font-mono font-semibold text-brand-green">{String(r.employee_id)}</span> },
          { key: "name", label: "Name", render: (r) => `${r.first_name} ${r.last_name}` },
          { key: "department_name", label: "Department" },
          { key: "designation", label: "Designation" },
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
