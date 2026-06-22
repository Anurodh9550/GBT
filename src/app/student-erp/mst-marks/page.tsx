import ErpContentPage from "@/components/student-erp/ErpContentPage";

const marks = [
  { subject: "Data Structures", mst1: 18, mst2: 16, max: 20 },
  { subject: "Mathematics II", mst1: 15, mst2: 17, max: 20 },
  { subject: "English Literature", mst1: 19, mst2: 18, max: 20 },
];

export default function Page() {
  return (
    <ErpContentPage title="MST Marks" description="Mid-Semester Test marks for the current session.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="pb-3 pr-4 font-semibold">Subject</th>
              <th className="pb-3 pr-4 font-semibold">MST 1</th>
              <th className="pb-3 pr-4 font-semibold">MST 2</th>
              <th className="pb-3 font-semibold">Max</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m) => (
              <tr key={m.subject} className="border-b border-slate-100">
                <td className="py-3 pr-4 font-medium">{m.subject}</td>
                <td className="py-3 pr-4">{m.mst1}</td>
                <td className="py-3 pr-4">{m.mst2}</td>
                <td className="py-3">{m.max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ErpContentPage>
  );
}
