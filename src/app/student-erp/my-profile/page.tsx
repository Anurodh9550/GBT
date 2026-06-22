"use client";

import { useEffect, useState } from "react";
import ErpPageHeader from "@/components/student-erp/ErpPageHeader";
import { getStudentSession, type StudentSession } from "@/components/student-erp/StudentErpShell";

export default function Page() {
  const [session, setSession] = useState<StudentSession | null>(null);

  useEffect(() => {
    setSession(getStudentSession());
  }, []);

  return (
    <>
      <ErpPageHeader title="My Profile" section="EXTRA FEATURES" />
      <div className="rounded bg-white p-6 shadow-sm">
        {session ? (
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-400">Full Name</dt>
              <dd className="mt-1 font-medium text-slate-800">{session.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-400">Roll Number</dt>
              <dd className="mt-1 font-medium text-slate-800">{session.roll}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-400">Program</dt>
              <dd className="mt-1 font-medium text-slate-800">B.Tech — Computer Science</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-400">Session</dt>
              <dd className="mt-1 font-medium text-slate-800">2026–27</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-slate-500">Loading profile...</p>
        )}
      </div>
    </>
  );
}
