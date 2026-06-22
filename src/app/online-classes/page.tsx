import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { MotionSection, MotionStagger, MotionCard } from "@/components/motion";

export const metadata = { title: "Online Classes" };

const classes = [
  { subject: "Data Structures", faculty: "Dr. Priya Singh", time: "10:00 AM - 11:00 AM", day: "Mon, Wed, Fri", status: "Live" },
  { subject: "Business Economics", faculty: "Prof. Anil Mehta", time: "12:00 PM - 1:00 PM", day: "Tue, Thu", status: "Scheduled" },
  { subject: "English Literature", faculty: "Dr. Kavita Rao", time: "2:00 PM - 3:00 PM", day: "Mon, Wed", status: "Scheduled" },
  { subject: "Mathematics II", faculty: "Prof. Suresh Patel", time: "9:00 AM - 10:00 AM", day: "Daily", status: "Live" },
];

export default function OnlineClassesPage() {
  return (
    <>
      <PageHero
        title="Online Classes"
        subtitle="Join live virtual classrooms and access recorded sessions"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Online Classes" }]}
      />
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-slate-600">Login required to join classes.</p>
            <Link href="/student-login" className="rounded-full bg-brand-orange px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-orange-light">
              Student Login
            </Link>
          </div>
          <SectionHeading eyebrow="Schedule" title="Today's Classes" />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2">
            {classes.map((cls) => (
              <MotionCard key={cls.subject} className="card-hover rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-brand-maroon">{cls.subject}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${cls.status === "Live" ? "bg-brand-green/15 text-brand-green" : "bg-slate-100 text-slate-600"}`}>
                    {cls.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-500">{cls.faculty}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                  <span>🕐 {cls.time}</span>
                  <span>📅 {cls.day}</span>
                </div>
                <button className="mt-5 w-full rounded-full border-2 border-brand-maroon py-2.5 text-sm font-bold text-brand-maroon transition hover:bg-brand-maroon hover:text-white">
                  {cls.status === "Live" ? "Join Now" : "View Schedule"}
                </button>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>
    </>
  );
}
