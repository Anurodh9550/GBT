"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminPageHeader from "@/components/admin-panel/AdminPageHeader";
import { adminApi } from "@/lib/admin-api";

const erpStats = [
  { key: "students", label: "Students", href: "/admin-panel/students", accent: "text-indigo-600 bg-indigo-50" },
  { key: "faculty", label: "Faculty", href: "/admin-panel/faculty", accent: "text-sky-600 bg-sky-50" },
  { key: "assignments", label: "Assignments", href: "/admin-panel/assignments", accent: "text-violet-600 bg-violet-50" },
  { key: "erp_announcements", label: "ERP Notices", href: "/admin-panel/erp-announcements", accent: "text-orange-600 bg-orange-50" },
  { key: "attendance_records", label: "Attendance", href: "/admin-panel/attendance", accent: "text-green-700 bg-green-50" },
  { key: "marks", label: "Marks", href: "/admin-panel/marks", accent: "text-blue-600 bg-blue-50" },
  { key: "lectures", label: "Lectures", href: "/admin-panel/lectures", accent: "text-pink-600 bg-pink-50" },
  { key: "pending_leaves", label: "Pending Leaves", href: "/admin-panel/leave", accent: "text-amber-700 bg-amber-50" },
];

const quickActions = [
  { label: "Add Student", href: "/admin-panel/students", desc: "Create new student account" },
  { label: "Add Faculty", href: "/admin-panel/faculty", desc: "Create faculty account" },
  { label: "Post ERP Notice", href: "/admin-panel/erp-announcements", desc: "Notify students/faculty" },
  { label: "Mark Attendance", href: "/admin-panel/attendance", desc: "Record daily attendance" },
  { label: "Enter Marks", href: "/admin-panel/marks", desc: "MST & final evaluation" },
  { label: "Review Leaves", href: "/admin-panel/leave", desc: "Approve or reject requests" },
];

const cmsStats = [
  { key: "courses", label: "Courses", href: "/admin-panel/courses" },
  { key: "departments", label: "Departments", href: "/admin-panel/departments" },
  { key: "pending_admissions", label: "Pending Admissions", href: "/admin-panel/admissions" },
  { key: "unread_messages", label: "Unread Messages", href: "/admin-panel/messages" },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .dashboard()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const pendingTotal =
    (stats.pending_leaves ?? 0) + (stats.pending_admissions ?? 0) + (stats.unread_messages ?? 0);

  return (
    <>
      <AdminPageHeader
        title="ERP Control Dashboard"
        subtitle="Manage students, faculty, academics, and college website from one place"
        badge="Live"
      />

      {pendingTotal > 0 && (
        <div className="admin-pending-banner mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-amber-900">Action required</p>
            <p className="text-xs text-amber-700">
              {stats.pending_leaves ? `${stats.pending_leaves} leave(s)` : ""}
              {stats.pending_leaves && stats.pending_admissions ? " · " : ""}
              {stats.pending_admissions ? `${stats.pending_admissions} admission(s)` : ""}
              {(stats.pending_leaves || stats.pending_admissions) && stats.unread_messages ? " · " : ""}
              {stats.unread_messages ? `${stats.unread_messages} message(s)` : ""}
              {" "}need your attention
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(stats.pending_leaves ?? 0) > 0 && (
              <Link href="/admin-panel/leave" className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:brightness-110">
                Review Leaves
              </Link>
            )}
            {(stats.pending_admissions ?? 0) > 0 && (
              <Link href="/admin-panel/admissions" className="rounded-lg border border-amber-400 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-50">
                Admissions
              </Link>
            )}
          </div>
        </div>
      )}

      <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">ERP Overview</h2>
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {erpStats.map((card) => (
          <Link key={card.key} href={card.href} className="admin-stat-card group">
            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${card.accent}`}>
              {card.label}
            </span>
            <p className="mt-2 font-serif text-3xl font-bold text-brand-maroon">
              {loading ? "…" : (stats[card.key] ?? 0)}
            </p>
          </Link>
        ))}
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Quick Actions</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {quickActions.map((action) => (
              <Link
                key={action.href + action.label}
                href={action.href}
                className="admin-stat-card flex flex-col gap-1"
              >
                <span className="font-semibold text-brand-maroon group-hover:text-brand-orange">{action.label}</span>
                <span className="text-xs text-slate-500">{action.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Website CMS</h2>
          <div className="admin-table-wrap divide-y divide-slate-100">
            {cmsStats.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="flex items-center justify-between px-4 py-3 text-sm transition hover:bg-slate-50"
              >
                <span className="text-slate-600">{item.label}</span>
                <span className="font-bold text-brand-maroon">{loading ? "…" : (stats[item.key] ?? 0)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
