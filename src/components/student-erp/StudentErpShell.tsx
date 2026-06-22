"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { studentErpGroups, studentErpNav } from "@/lib/student-erp-nav";
import { siteConfig } from "@/lib/site-config";

const SESSION_KEY = "gbt-student-session";

export type StudentSession = {
  name: string;
  roll: string;
};

export function getStudentSession(): StudentSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as StudentSession) : null;
  } catch {
    return null;
  }
}

export function setStudentSession(session: StudentSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearStudentSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function NavGroup({
  label,
  items,
  pathname,
  defaultOpen,
}: {
  label: string;
  items: { label: string; href: string }[];
  pathname: string;
  defaultOpen?: boolean;
}) {
  const isActive = items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
  const [open, setOpen] = useState(defaultOpen ?? isActive);

  return (
    <div className="border-b border-slate-200/80">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between px-4 py-3 text-left text-xs font-bold tracking-wide text-slate-600 hover:bg-white ${
          isActive ? "bg-white text-brand-maroon" : ""
        }`}
      >
        {label}
        <span className={`text-slate-400 transition ${open ? "rotate-180" : ""}`}>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && (
        <ul className="bg-white pb-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block py-2 pl-8 pr-4 text-sm transition hover:text-brand-orange ${
                  pathname === item.href ? "font-semibold text-brand-orange" : "text-slate-600"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function StudentErpShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<StudentSession | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = getStudentSession();
    if (!current) {
      router.replace("/student-login");
      return;
    }
    setSession(current);
    setReady(true);
  }, [router]);

  if (!ready || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-sm text-slate-500">
        Loading Student ERP...
      </div>
    );
  }

  const logout = () => {
    clearStudentSession();
    router.push("/student-login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between bg-brand-maroon px-3 text-white shadow-md sm:px-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link href="/student-erp" className="flex items-center gap-2">
            <Image src={siteConfig.logo} alt={siteConfig.name} width={36} height={36} className="rounded-full ring-2 ring-white/30" />
            <span className="hidden font-semibold sm:inline">{siteConfig.name}</span>
          </Link>
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-white/10"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
              {session.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
            <span className="hidden max-w-[140px] truncate font-medium sm:inline">{session.name}</span>
            <svg className="h-3.5 w-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-sm text-slate-700 shadow-lg">
              <Link href="/student-erp/my-profile" className="block px-4 py-2 hover:bg-slate-50" onClick={() => setMenuOpen(false)}>
                My Profile
              </Link>
              <Link href="/student-erp/change-password" className="block px-4 py-2 hover:bg-slate-50" onClick={() => setMenuOpen(false)}>
                Change Password
              </Link>
              <button type="button" onClick={logout} className="block w-full px-4 py-2 text-left hover:bg-slate-50">
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-14 left-0 z-30 w-64 transform border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="border-b border-slate-200 bg-slate-50 p-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-maroon/10 font-serif text-xl font-bold text-brand-maroon">
              {session.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-800">Hello, {session.name}</p>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-brand-green">
              <span className="h-2 w-2 rounded-full bg-brand-green" />
              Online
            </p>
          </div>

          <nav className="max-h-[calc(100vh-14rem)] overflow-y-auto">
            {studentErpNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 border-b border-slate-100 px-4 py-3 text-sm font-medium ${
                  pathname === item.href ? "border-l-2 border-l-brand-orange bg-brand-orange/5 text-brand-orange" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                {item.label}
              </Link>
            ))}
            {studentErpGroups.map((group) => (
              <NavGroup
                key={group.label}
                label={group.label}
                items={group.items}
                pathname={pathname}
                defaultOpen={group.label === "ACADEMIA"}
              />
            ))}
          </nav>
        </aside>

        {sidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 top-14 z-20 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
        )}

        {/* Main */}
        <div className="min-h-[calc(100vh-3.5rem)] flex-1 p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}
