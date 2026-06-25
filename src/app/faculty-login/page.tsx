"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import PageHero from "@/components/PageHero";
import { MotionSection, MotionDiv } from "@/components/motion";
import { setFacultySession } from "@/components/faculty-erp/FacultyErpShell";
import PortalIcon from "@/components/PortalIcon";
import PasswordInput from "@/components/ui/PasswordInput";
import { useUi } from "@/components/ui/UiProvider";

export default function FacultyLoginPage() {
  const router = useRouter();
  const { toast, withProgress } = useUi();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!employeeId.trim() || !password.trim()) {
      setError("Please enter employee ID and password.");
      toast("Please enter employee ID and password.", "error");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await withProgress(async () => {
        const { api } = await import("@/lib/api");
        const data = await api.facultyLogin(employeeId.trim(), password.trim());
        const user = data.user as { first_name?: string; last_name?: string; faculty_profile?: { employee_id: string; department_name?: string } };
        const name = [user.first_name, user.last_name].filter(Boolean).join(" ") || "Faculty Member";
        setFacultySession({
          name,
          employeeId: user.faculty_profile?.employee_id || employeeId.trim().toUpperCase(),
          department: user.faculty_profile?.department_name,
        });
        localStorage.setItem("gbt-access-token", data.access);
        toast("Login successful! Redirecting…", "success");
        router.push("/faculty-erp");
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("Failed to fetch") || msg.includes("NetworkError")) {
        const { apiConnectionError } = await import("@/lib/api");
        const connectionError = apiConnectionError();
        setError(connectionError);
        toast(connectionError, "error");
      } else {
        const loginError = msg || "Invalid employee ID or password.";
        setError(loginError);
        toast(loginError, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        title="Faculty Login"
        subtitle="Faculty & staff portal for classes, attendance, and administration"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Faculty Login" }]}
      />
      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-md px-4">
          <MotionDiv shadow className="card-surface p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green/10">
                <PortalIcon id="faculty" className="h-8 w-8 text-brand-green" />
              </div>
              <h2 className="mt-4 font-serif text-xl font-bold text-brand-maroon">Faculty ERP Login</h2>
              <p className="mt-1 text-sm text-slate-500">Sign in to open your faculty dashboard</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
              )}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Employee ID</label>
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="e.g. FAC2021001"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green disabled:opacity-60"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  disabled={loading}
                  inputClassName="w-full rounded-xl border border-slate-300 py-3 pl-4 pr-11 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green disabled:opacity-60"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" disabled={loading} /> Remember me
                </label>
                <Link href="/contact" className="font-medium text-brand-green hover:opacity-80">
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center !bg-brand-green !shadow-[0_2px_8px_rgba(45,106,46,0.35)] disabled:opacity-60"
              >
                {loading ? "Signing in…" : "Login"}
              </button>
            </form>
            <p className="mt-4 text-center text-xs text-slate-400">
              Demo: <span className="font-mono">FAC2021001</span> / <span className="font-mono">faculty123</span>
            </p>
            <p className="mt-6 text-center text-sm text-slate-500">
              Student?{" "}
              <Link href="/student-login" className="font-bold text-brand-orange">
                Student ERP Login
              </Link>
            </p>
          </MotionDiv>
        </div>
      </MotionSection>
    </>
  );
}
