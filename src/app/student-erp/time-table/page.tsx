import ErpContentPage from "@/components/student-erp/ErpContentPage";

const schedule = [
  { day: "Monday", periods: ["Principles of Management", "Financial Accounting", "English", "Seminar"] },
  { day: "Tuesday", periods: ["Financial Accounting", "Elective", "Business Communication", "Sports"] },
  { day: "Wednesday", periods: ["Principles of Management", "English", "Financial Accounting", "Library"] },
  { day: "Thursday", periods: ["Business Communication", "Financial Accounting", "English", "Tutorial"] },
  { day: "Friday", periods: ["Principles of Management", "Business Communication", "Guest Lecture", "—"] },
];

export default function Page() {
  return (
    <ErpContentPage title="Time Table" section="EXTRA FEATURES" description="Weekly class time table for the current semester.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-500">
              <th className="p-3 font-semibold">Day</th>
              <th className="p-3 font-semibold">Period 1</th>
              <th className="p-3 font-semibold">Period 2</th>
              <th className="p-3 font-semibold">Period 3</th>
              <th className="p-3 font-semibold">Period 4</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.day} className="border-b border-slate-100">
                <td className="p-3 font-semibold text-slate-800">{row.day}</td>
                {row.periods.map((p, i) => (
                  <td key={i} className="p-3 text-slate-600">{p}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ErpContentPage>
  );
}
