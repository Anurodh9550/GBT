"use client";

import { useEffect, useState } from "react";
import FacultyErpPageHeader from "@/components/faculty-erp/FacultyErpPageHeader";
import { getFacultySession, type FacultySession } from "@/components/faculty-erp/FacultyErpShell";

export default function Page() {
  const [session, setSession] = useState<FacultySession | null>(null);

  useEffect(() => {
    setSession(getFacultySession());
  }, []);

  return (
    <>
      <FacultyErpPageHeader title="My Profile" section="EXTRA FEATURES" />
      <div className="rounded bg-white p-6 shadow-sm">
        {session ? (
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-400">Full Name</dt>
              <dd className="mt-1 font-medium text-slate-800">{session.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-400">Employee ID</dt>
              <dd className="mt-1 font-medium text-slate-800">{session.employeeId}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-400">Department</dt>
              <dd className="mt-1 font-medium text-slate-800">{session.department ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-400">Designation</dt>
              <dd className="mt-1 font-medium text-slate-800">Assistant Professor</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-slate-500">Loading profile...</p>
        )}
      </div>
    </>
  );
}
