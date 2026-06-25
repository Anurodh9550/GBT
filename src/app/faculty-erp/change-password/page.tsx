"use client";

import { FormEvent, useState } from "react";
import FacultyErpContentPage from "@/components/faculty-erp/FacultyErpContentPage";
import PasswordInput from "@/components/ui/PasswordInput";
import { useUi } from "@/components/ui/UiProvider";

export default function Page() {
  const { toast, withProgress } = useUi();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await withProgress(async () => {
      await new Promise((r) => setTimeout(r, 600));
      toast("Password updated successfully", "success");
    });
    setLoading(false);
  };

  return (
    <FacultyErpContentPage title="Change Password" section="EXTRA FEATURES">
      <form className="mx-auto max-w-md space-y-4" onSubmit={handleSubmit}>
        <PasswordInput
          required
          placeholder="Current Password"
          inputClassName="w-full rounded border border-slate-300 py-2.5 pl-4 pr-11 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
          disabled={loading}
        />
        <PasswordInput
          required
          placeholder="New Password"
          inputClassName="w-full rounded border border-slate-300 py-2.5 pl-4 pr-11 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
          disabled={loading}
        />
        <PasswordInput
          required
          placeholder="Confirm New Password"
          inputClassName="w-full rounded border border-slate-300 py-2.5 pl-4 pr-11 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-brand-green px-6 py-2.5 text-sm font-bold text-white disabled:opacity-60"
        >
          {loading ? "Updating…" : "Update Password"}
        </button>
      </form>
    </FacultyErpContentPage>
  );
}
