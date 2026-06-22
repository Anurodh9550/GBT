import ErpContentPage from "@/components/student-erp/ErpContentPage";

const forms = [
  { title: "Leave Application", status: "Approved", date: "10 Jun 2026" },
  { title: "Character Certificate Request", status: "Pending", date: "18 Jun 2026" },
];

export default function Page() {
  return (
    <ErpContentPage title="Form Forward" section="EXTRA FEATURES" description="Track forms submitted and forwarded to departments.">
      <ul className="space-y-3">
        {forms.map((f) => (
          <li key={f.title} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-4">
            <div>
              <p className="font-semibold text-slate-800">{f.title}</p>
              <p className="mt-1 text-xs text-slate-500">Submitted: {f.date}</p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                f.status === "Approved" ? "bg-brand-green/15 text-brand-green" : "bg-brand-orange/15 text-brand-orange"
              }`}
            >
              {f.status}
            </span>
          </li>
        ))}
      </ul>
    </ErpContentPage>
  );
}
