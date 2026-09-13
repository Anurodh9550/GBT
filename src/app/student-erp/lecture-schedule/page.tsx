import ErpContentPage from "@/components/student-erp/ErpContentPage";

const lectures = [
  { subject: "Principles of Management", faculty: "Dr. Priya Singh", day: "Mon, Wed, Fri", time: "10:00 AM – 11:00 AM", room: "Room 201" },
  { subject: "Financial Accounting", faculty: "Prof. Anil Kumar", day: "Tue, Thu", time: "11:00 AM – 12:00 PM", room: "Room 105" },
  { subject: "Business Communication", faculty: "Ms. Neha Verma", day: "Wed", time: "2:00 PM – 3:00 PM", room: "Room 302" },
];

export default function Page() {
  return (
    <ErpContentPage title="My Lecture Schedule" section="EXTRA FEATURES" description="Your personal lecture schedule for this session.">
      <ul className="space-y-3">
        {lectures.map((l) => (
          <li key={l.subject} className="rounded-lg border border-slate-200 p-4">
            <p className="font-semibold text-slate-800">{l.subject}</p>
            <p className="mt-1 text-sm text-slate-600">{l.faculty}</p>
            <p className="mt-2 text-xs text-slate-500">{l.day} · {l.time} · {l.room}</p>
          </li>
        ))}
      </ul>
    </ErpContentPage>
  );
}
