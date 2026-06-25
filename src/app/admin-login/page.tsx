"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { adminApi } from "@/lib/admin-api";
import { setAdminSession, type AdminUser } from "@/lib/admin-auth";
import { siteConfig } from "@/lib/site-config";
import PasswordInput from "@/components/ui/PasswordInput";
import { useUi } from "@/components/ui/UiProvider";

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast, withProgress } = useUi();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      toast("Please enter username and password.", "error");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await withProgress(async () => {
        const data = await adminApi.login(username.trim(), password.trim());
        setAdminSession(data.access, data.user as AdminUser);
        toast("Welcome to Admin Console", "success");
        router.push("/admin-panel");
      });
    } catch {
      setError("Invalid admin credentials.");
      toast("Invalid admin credentials.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-black via-brand-maroon-dark to-brand-maroon p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">
        <div className="text-center">
          <Image src={siteConfig.logo} alt={siteConfig.name} width={64} height={64} className="mx-auto rounded-full" />
          <h1 className="mt-4 font-serif text-2xl font-bold text-brand-maroon">ERP Admin Console</h1>
          <p className="mt-1 text-sm text-slate-500">Manage students, faculty, academics & website</p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange disabled:opacity-60"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-slate-400">
          <Link href="/" className="hover:text-brand-orange">← Back to Website</Link>
        </p>
      </div>
    </div>
  );
}
