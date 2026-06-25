"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import PageHero from "@/components/PageHero";
import { MotionSection, MotionDiv } from "@/components/motion";
import { setStudentSession } from "@/components/student-erp/StudentErpShell";
import PortalIcon from "@/components/PortalIcon";

export default function StudentLoginPage() {
  const router = useRouter();
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!roll.trim() || !password.trim()) {
      setError("Please enter roll number and password.");
      return;
    }
    setError("");
    try {
      const { api } = await import("@/lib/api");
      const data = await api.studentLogin(roll.trim(), password.trim());
      const user = data.user as { first_name?: string; last_name?: string; student_profile?: { roll_number: string } };
      const name = [user.first_name, user.last_name].filter(Boolean).join(" ") || roll.trim();
      setStudentSession({
        name,
        roll: user.student_profile?.roll_number || roll.trim().toUpperCase(),
      });
      localStorage.setItem("gbt-access-token", data.access);
      router.push("/student-erp");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("Failed to fetch") || msg.includes("NetworkError")) {
        const { apiConnectionError } = await import("@/lib/api");
        setError(apiConnectionError());
      } else {
        setError(msg || "Invalid roll number or password.");
      }
    }
  };

  return (
    <>
      <PageHero
        title="Student Login"
        subtitle="Access your dashboard, classes, assignments, and results"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Student Login" }]}
      />
      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-md px-4">
          <MotionDiv shadow className="card-surface p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-orange/10">
                <PortalIcon id="student" className="h-8 w-8" />
              </div>
              <h2 className="mt-4 font-serif text-xl font-bold text-brand-maroon">Student ERP Login</h2>
              <p className="mt-1 text-sm text-slate-500">Sign in to open your student dashboard</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
              )}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Enrollment / Roll Number</label>
                <input
                  type="text"
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                  placeholder="e.g. GBT2024001"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" /> Remember me
                </label>
                <Link href="/contact" className="font-medium text-brand-orange hover:text-brand-orange-light">
                  Forgot password?
                </Link>
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                Login
              </button>
            </form>
            <p className="mt-6 text-center text-xs text-slate-400">
              Demo: <span className="font-mono">GBT2024001</span> / <span className="font-mono">student123</span>
            </p>
            <p className="mt-6 text-center text-sm text-slate-500">
              New student?{" "}
              <Link href="/admissions" className="font-bold text-brand-orange">
                Apply for Admission
              </Link>
            </p>
          </MotionDiv>
        </div>
      </MotionSection>
    </>
  );
}
