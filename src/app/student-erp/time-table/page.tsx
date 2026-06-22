import ErpContentPage from "@/components/student-erp/ErpContentPage";

const schedule = [
  { day: "Monday", periods: ["Data Structures", "Mathematics II", "English", "Lab — DS"] },
  { day: "Tuesday", periods: ["Mathematics II", "Elective", "Data Structures", "Sports"] },
  { day: "Wednesday", periods: ["Data Structures", "English", "Mathematics II", "Seminar"] },
  { day: "Thursday", periods: ["Lab — DS", "Mathematics II", "English", "Library"] },
  { day: "Friday", periods: ["Data Structures", "Mathematics II", "Guest Lecture", "—"] },
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
