import ErpContentPage from "@/components/student-erp/ErpContentPage";

const results = [
  { semester: "Semester 4", sgpa: "8.6", status: "Pass" },
  { semester: "Semester 3", sgpa: "8.2", status: "Pass" },
  { semester: "Semester 2", sgpa: "7.9", status: "Pass" },
];

export default function Page() {
  return (
    <ErpContentPage title="Detailed Exam Result" section="ACADEMIA">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px] text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="pb-3 pr-4 font-semibold">Semester</th>
              <th className="pb-3 pr-4 font-semibold">SGPA</th>
              <th className="pb-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.semester} className="border-b border-slate-100">
                <td className="py-3 pr-4 font-medium">{r.semester}</td>
                <td className="py-3 pr-4">{r.sgpa}</td>
                <td className="py-3">
                  <span className="rounded-full bg-brand-green/15 px-3 py-1 text-xs font-bold text-brand-green">
                    {r.status}
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
