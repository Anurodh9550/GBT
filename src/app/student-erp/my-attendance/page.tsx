import ErpContentPage from "@/components/student-erp/ErpContentPage";

const attendance = [
  { subject: "Data Structures", held: 42, attended: 38, percent: "90.5%" },
  { subject: "Mathematics II", held: 40, attended: 36, percent: "90.0%" },
  { subject: "English Literature", held: 38, attended: 35, percent: "92.1%" },
];

export default function Page() {
  return (
    <ErpContentPage title="My Attendance" section="EXTRA FEATURES" description="Subject-wise attendance for the current semester.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="pb-3 pr-4 font-semibold">Subject</th>
              <th className="pb-3 pr-4 font-semibold">Classes Held</th>
              <th className="pb-3 pr-4 font-semibold">Attended</th>
              <th className="pb-3 font-semibold">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((a) => (
              <tr key={a.subject} className="border-b border-slate-100">
                <td className="py-3 pr-4 font-medium">{a.subject}</td>
                <td className="py-3 pr-4">{a.held}</td>
                <td className="py-3 pr-4">{a.attended}</td>
                <td className="py-3 font-semibold text-brand-green">{a.percent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ErpContentPage>
  );
}
