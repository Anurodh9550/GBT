import Link from "next/link";
import FacultyErpPageHeader from "@/components/faculty-erp/FacultyErpPageHeader";
import { facultyErpSampleEvents, facultyErpSampleNotices } from "@/lib/faculty-erp-nav";

export default function FacultyErpDashboardPage() {
  return (
    <>
      <FacultyErpPageHeader title="Dashboard" section="FACULTY" />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded bg-white shadow-sm">
          <div className="bg-brand-orange px-4 py-3 text-sm font-bold uppercase tracking-wide text-white">
            Events
          </div>
          <ul className="divide-y divide-slate-100 p-4">
            {facultyErpSampleEvents.map((event) => (
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
            {facultyErpSampleNotices.map((notice) => (
              <li key={notice} className="py-3 text-sm text-slate-700">
                {notice}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Link
        href="/faculty-erp/mark-attendance"
        className="mt-4 block rounded bg-white py-4 text-center text-sm font-bold uppercase tracking-wide text-brand-green shadow-sm transition hover:bg-slate-50"
      >
        Mark Today&apos;s Attendance
      </Link>
    </>
  );
}
