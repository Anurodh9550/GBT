import Link from "next/link";
import ErpPageHeader from "@/components/student-erp/ErpPageHeader";
import { studentErpSampleEvents, studentErpSampleNotices } from "@/lib/student-erp-nav";

export default function StudentErpDashboardPage() {
  return (
    <>
      <ErpPageHeader title="Dashboard" section="ACADEMIA" />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded bg-white shadow-sm">
          <div className="bg-brand-orange px-4 py-3 text-sm font-bold uppercase tracking-wide text-white">
            Events
          </div>
          <ul className="divide-y divide-slate-100 p-4">
            {studentErpSampleEvents.map((event) => (
              <li key={event} className="py-3 text-sm font-medium text-slate-700">
                {event}
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded bg-white shadow-sm">
          <div className="bg-brand-green px-4 py-3 text-sm font-bold uppercase tracking-wide text-white">
            General Notices
          </div>
          <ul className="divide-y divide-slate-100 p-4">
            {studentErpSampleNotices.length > 0 ? (
              studentErpSampleNotices.map((notice) => (
                <li key={notice} className="py-3 text-sm text-slate-700">
                  {notice}
                </li>
              ))
            ) : (
              <li className="py-6 text-center text-sm text-slate-400">No notices available.</li>
            )}
          </ul>
        </div>
      </div>
      <Link
        href="/student-erp/exam-result"
        className="mt-4 block rounded bg-white py-4 text-center text-sm font-bold uppercase tracking-wide text-[#367fa9] shadow-sm transition hover:bg-slate-50"
      >
        Detailed Exam Result
      </Link>
    </>
  );
}
