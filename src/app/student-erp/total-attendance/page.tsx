import ErpContentPage from "@/components/student-erp/ErpContentPage";

export default function Page() {
  return (
    <ErpContentPage title="My Total Attendance" section="EXTRA FEATURES" description="Overall attendance summary across all subjects.">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-center">
          <p className="text-3xl font-bold text-brand-orange">91%</p>
          <p className="mt-1 text-sm text-slate-600">Overall Attendance</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-center">
          <p className="text-3xl font-bold text-brand-maroon">120</p>
          <p className="mt-1 text-sm text-slate-600">Total Classes Held</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-center">
          <p className="text-3xl font-bold text-brand-green">109</p>
          <p className="mt-1 text-sm text-slate-600">Total Attended</p>
        </div>
      </div>
      <p className="mt-6 text-sm text-slate-600">
        Minimum required attendance: <strong>75%</strong>. You are currently above the required threshold.
      </p>
    </ErpContentPage>
  );
}
