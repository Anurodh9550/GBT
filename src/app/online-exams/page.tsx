import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { MotionSection, MotionStagger, MotionCard } from "@/components/motion";

export const metadata = { title: "Online Exams" };

const exams = [
  { name: "Mid-Term – Data Structures", date: "25 Jun 2026", time: "10:00 AM - 12:00 PM", duration: "2 Hours", type: "MCQ + Coding" },
  { name: "Unit Test – Economics", date: "28 Jun 2026", time: "11:00 AM - 12:00 PM", duration: "1 Hour", type: "MCQ" },
  { name: "End Semester – Mathematics", date: "05 Jul 2026", time: "9:00 AM - 12:00 PM", duration: "3 Hours", type: "Descriptive" },
  { name: "Practical – Web Development", date: "10 Jul 2026", time: "2:00 PM - 4:00 PM", duration: "2 Hours", type: "Project Based" },
];

export default function OnlineExamsPage() {
  return (
    <>
      <PageHero
        title="Online Exams"
        subtitle="Scheduled examinations and online assessment portal"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Online Exams" }]}
      />
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-6">
            <h3 className="font-bold text-brand-maroon">Exam Instructions</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Login 15 minutes before exam start time</li>
              <li>• Stable internet connection required (minimum 2 Mbps)</li>
              <li>• Webcam must remain ON throughout the exam</li>
              <li>• No tab switching allowed — violations may lead to disqualification</li>
            </ul>
          </div>
          <SectionHeading eyebrow="Upcoming" title="Scheduled Exams" />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2">
            {exams.map((exam) => (
              <MotionCard key={exam.name} className="card-hover rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-brand-maroon">{exam.name}</h3>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p>📅 {exam.date}</p>
                  <p>🕐 {exam.time}</p>
                  <p>⏱ Duration: {exam.duration}</p>
                  <p>📝 Type: {exam.type}</p>
                </div>
                <button className="mt-5 w-full rounded-full bg-brand-black py-3 text-sm font-bold text-white hover:bg-brand-maroon-dark">
                  Start Exam (Login Required)
                </button>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>
    </>
  );
}
