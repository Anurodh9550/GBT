import PageHero from "@/components/PageHero";
import { MotionSection, MotionDiv } from "@/components/motion";

export const metadata = { title: "Study Materials" };

const materials = [
  { title: "Computer Science – Semester 4", type: "PDF Notes", subject: "Data Structures", size: "2.4 MB", date: "12 Jun 2026" },
  { title: "Commerce – Semester 2", type: "Video Lecture", subject: "Financial Accounting", size: "45 min", date: "10 Jun 2026" },
  { title: "English – Semester 1", type: "PDF Notes", subject: "Prose & Poetry", size: "1.8 MB", date: "08 Jun 2026" },
  { title: "Mathematics – Semester 3", type: "Practice Sheet", subject: "Calculus", size: "890 KB", date: "05 Jun 2026" },
  { title: "BCA – Semester 5", type: "Lab Manual", subject: "Web Development", size: "3.1 MB", date: "01 Jun 2026" },
  { title: "General – All Students", type: "Syllabus", subject: "Academic Calendar 2026-27", size: "520 KB", date: "28 May 2026" },
];

export default function StudyMaterialsPage() {
  return (
    <>
      <PageHero
        title="Study Materials"
        subtitle="Download notes, lectures, and academic resources"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Study Materials" }]}
      />
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex flex-wrap gap-2">
            {["All", "PDF Notes", "Video Lecture", "Lab Manual", "Syllabus"].map((filter, i) => (
              <button key={filter} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${i === 0 ? "bg-brand-black text-white" : "border border-slate-200 text-slate-600 hover:border-brand-orange hover:text-brand-orange"}`}>
                {filter}
              </button>
            ))}
          </div>
          <MotionDiv hover shadow className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {["Title", "Subject", "Type", "Size", "Date", "Action"].map((h) => (
                    <th key={h} className="px-6 py-4 font-bold text-brand-maroon">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {materials.map((item, i) => (
                  <tr key={item.title} className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                    <td className="px-6 py-4 font-medium">{item.title}</td>
                    <td className="px-6 py-4 text-slate-600">{item.subject}</td>
                    <td className="px-6 py-4"><span className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold text-brand-orange">{item.type}</span></td>
                    <td className="px-6 py-4 text-slate-600">{item.size}</td>
                    <td className="px-6 py-4 text-slate-600">{item.date}</td>
                    <td className="px-6 py-4"><button className="font-bold text-brand-orange hover:text-brand-orange-light">Download</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </MotionDiv>
        </div>
      </MotionSection>
    </>
  );
}
