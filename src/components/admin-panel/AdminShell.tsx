"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { clearAdminSession, getAdminToken, getAdminUser } from "@/lib/admin-auth";
import { siteConfig } from "@/lib/site-config";
import {
  IconBell, IconBook, IconBuilding, IconCalendar, IconChart, IconCheck,
  IconClipboard, IconDashboard, IconForm, IconGlobe, IconMail, IconMegaphone,
  IconNews, IconUsers, IconVideo,
} from "@/components/admin-panel/AdminIcons";

type NavItem = { label: string; href: string; icon: React.ReactNode };

const erpNav: NavItem[] = [
  { label: "Dashboard", href: "/admin-panel", icon: <IconDashboard /> },
  { label: "Students", href: "/admin-panel/students", icon: <IconUsers /> },
  { label: "Faculty", href: "/admin-panel/faculty", icon: <IconUsers /> },
  { label: "ERP Notices", href: "/admin-panel/erp-announcements", icon: <IconBell /> },
  { label: "Assignments", href: "/admin-panel/assignments", icon: <IconClipboard /> },
  { label: "Lectures", href: "/admin-panel/lectures", icon: <IconVideo /> },
  { label: "Course Content", href: "/admin-panel/course-content", icon: <IconBook /> },
  { label: "Attendance", href: "/admin-panel/attendance", icon: <IconCheck /> },
  { label: "Marks", href: "/admin-panel/marks", icon: <IconChart /> },
  { label: "Leave Applications", href: "/admin-panel/leave", icon: <IconCalendar /> },
];

const websiteNav: NavItem[] = [
  { label: "Courses", href: "/admin-panel/courses", icon: <IconBook /> },
  { label: "Departments", href: "/admin-panel/departments", icon: <IconBuilding /> },
  { label: "News", href: "/admin-panel/news", icon: <IconNews /> },
  { label: "Announcements", href: "/admin-panel/announcements", icon: <IconMegaphone /> },
  { label: "Admissions", href: "/admin-panel/admissions", icon: <IconForm /> },
  { label: "Messages", href: "/admin-panel/messages", icon: <IconMail /> },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = getAdminUser();

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin-login");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-orange border-t-transparent" />
          Loading ERP Admin...
        </div>
      </div>
    );
  }

  const logout = () => {
    clearAdminSession();
    router.push("/admin-login");
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const active = pathname === item.href;
    return (
      <Link
        href={item.href}
        onClick={() => setSidebarOpen(false)}
        className={`admin-nav-link ${active ? "admin-nav-link-active" : ""}`}
      >
        <span className="shrink-0 opacity-90">{item.icon}</span>
        {item.label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link href="/admin-panel" className="flex items-center gap-2.5">
            <Image src={siteConfig.logo} alt={siteConfig.name} width={32} height={32} className="rounded-full" />
            <div className="hidden sm:block">
              <span className="block font-serif text-sm font-bold leading-tight text-brand-maroon">GBT ERP Admin</span>
              <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400">Control Panel</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/student-login" target="_blank" className="hidden text-xs font-medium text-slate-500 hover:text-brand-orange sm:inline">
            Student ERP ↗
          </Link>
          <Link href="/faculty-login" target="_blank" className="hidden text-xs font-medium text-slate-500 hover:text-brand-orange sm:inline">
            Faculty ERP ↗
          </Link>
          <Link href="/" target="_blank" className="text-xs font-medium text-slate-500 hover:text-brand-orange">
            <IconGlobe className="inline h-3.5 w-3.5" /> Site
          </Link>
          <div className="hidden h-6 w-px bg-slate-200 sm:block" />
          <span className="hidden text-sm text-slate-600 sm:inline">
            {user?.first_name || user?.username}
          </span>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg bg-brand-maroon px-3 py-1.5 text-xs font-semibold text-white hover:brightness-110"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`admin-sidebar fixed inset-y-14 left-0 z-30 w-64 transform overflow-y-auto transition-transform lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="p-3">
            <p className="admin-nav-section mt-1">ERP Management</p>
            {erpNav.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
            <p className="admin-nav-section mt-6">Website CMS</p>
            {websiteNav.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>
        </aside>

        {sidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 top-14 z-20 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          />
        )}

        <main className="min-h-[calc(100vh-3.5rem)] flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
