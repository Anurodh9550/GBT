import ErpContentPage from "@/components/student-erp/ErpContentPage";

const lectures = [
  { subject: "Principles of Management", faculty: "Dr. Priya Singh", time: "Mon, Wed, Fri — 10:00 AM", mode: "Online" },
  { subject: "Financial Accounting", faculty: "Prof. Anil Kumar", time: "Tue, Thu — 11:00 AM", mode: "Classroom" },
  { subject: "Business Communication", faculty: "Ms. Neha Verma", time: "Wed — 2:00 PM", mode: "Hybrid" },
];

export default function Page() {
  return (
    <ErpContentPage title="Lectures" description="View your scheduled lectures and join links.">
      <ul className="space-y-3">
        {lectures.map((l) => (
          <li key={l.subject} className="rounded-lg border border-slate-200 p-4">
            <p className="font-semibold text-slate-800">{l.subject}</p>
            <p className="mt-1 text-sm text-slate-600">{l.faculty}</p>
            <p className="mt-1 text-xs text-slate-500">
              {l.time} · {l.mode}
            </p>
          </li>
        ))}
      </ul>
    </ErpContentPage>
  );
}
