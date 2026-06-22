import ErpContentPage from "@/components/student-erp/ErpContentPage";

const documents = [
  { name: "Admit Card — Semester 4", type: "PDF", date: "01 Jun 2026" },
  { name: "Fee Receipt — Session 2026-27", type: "PDF", date: "15 May 2026" },
  { name: "Character Certificate", type: "PDF", date: "20 Apr 2026" },
  { name: "Migration Certificate", type: "PDF", date: "—" },
];

export default function Page() {
  return (
    <ErpContentPage title="Documents" section="EXTRA FEATURES" description="Download official documents issued by the college.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="pb-3 pr-4 font-semibold">Document</th>
              <th className="pb-3 pr-4 font-semibold">Type</th>
              <th className="pb-3 pr-4 font-semibold">Date</th>
              <th className="pb-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.name} className="border-b border-slate-100">
                <td className="py-3 pr-4 font-medium text-slate-800">{doc.name}</td>
                <td className="py-3 pr-4">{doc.type}</td>
                <td className="py-3 pr-4">{doc.date}</td>
                <td className="py-3">
                  <button type="button" className="font-semibold text-[#367fa9] hover:underline">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ErpContentPage>
  );
}
