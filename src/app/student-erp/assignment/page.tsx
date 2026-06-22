import ErpContentPage from "@/components/student-erp/ErpContentPage";

const assignments = [
  { title: "Assignment 3 – Binary Trees", subject: "Data Structures", due: "20 Jun 2026", status: "Pending" },
  { title: "Case Study – Market Analysis", subject: "Business Economics", due: "18 Jun 2026", status: "Submitted" },
  { title: "Essay – Shakespeare's Sonnets", subject: "English Literature", due: "22 Jun 2026", status: "Pending" },
];

export default function Page() {
  return (
    <ErpContentPage title="Assignment" description="Track and submit your course assignments.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="pb-3 pr-4 font-semibold">Assignment</th>
              <th className="pb-3 pr-4 font-semibold">Subject</th>
              <th className="pb-3 pr-4 font-semibold">Due Date</th>
              <th className="pb-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.title} className="border-b border-slate-100">
                <td className="py-3 pr-4 font-medium text-slate-800">{a.title}</td>
                <td className="py-3 pr-4 text-slate-600">{a.subject}</td>
                <td className="py-3 pr-4 text-slate-600">{a.due}</td>
                <td className="py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      a.status === "Submitted" ? "bg-brand-green/15 text-brand-green" : "bg-brand-orange/15 text-brand-orange"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ErpContentPage>
  );
}
