import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { MotionSection, MotionStagger, MotionCard } from "@/components/motion";

export const metadata = { title: "News & Events" };

const events = [
  { date: "15 Jun 2026", title: "Annual Convocation 2026", desc: "Graduation ceremony for batch 2022-2025. Chief guest: Dr. Meera Joshi, Vice Chancellor.", tag: "Event" },
  { date: "10 Jun 2026", title: "Campus Placement Drive", desc: "15+ companies visiting campus including TCS, Infosys, and Wipro for final year students.", tag: "Placement" },
  { date: "05 Jun 2026", title: "Admission Open – Session 2026-27", desc: "Online applications now open for UG and PG programs. Last date: 31 July 2026.", tag: "Admission" },
  { date: "01 Jun 2026", title: "Inter-College Sports Meet", desc: "Annual sports championship hosted by our college. Registration open for all students.", tag: "Sports" },
  { date: "28 May 2026", title: "Workshop on AI & Machine Learning", desc: "Two-day hands-on workshop by industry experts for CS and BCA students.", tag: "Workshop" },
  { date: "20 May 2026", title: "NAAC Accreditation Renewed", desc: "Our college receives NAAC A grade accreditation for the next 5 years.", tag: "Achievement" },
];

const tagColors: Record<string, string> = {
  Event: "bg-purple-100 text-purple-700",
  Placement: "bg-brand-green/15 text-brand-green",
  Admission: "bg-brand-orange/15 text-brand-orange-dark",
  Sports: "bg-blue-100 text-blue-700",
  Workshop: "bg-indigo-100 text-indigo-700",
  Achievement: "bg-rose-100 text-rose-700",
};

export default function NewsEventsPage() {
  return (
    <>
      <PageHero
        title="News & Events"
        subtitle="Stay updated with the latest happenings on campus"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "News & Events" }]}
      />
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Campus Updates" title="Latest News & Events" align="center" />
          <MotionStagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <MotionCard key={event.title}>
              <article className="card-hover rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <time className="text-xs font-bold text-brand-orange">{event.date}</time>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${tagColors[event.tag]}`}>{event.tag}</span>
                </div>
                <h3 className="mt-4 font-bold text-brand-maroon">{event.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{event.desc}</p>
              </article>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>
    </>
  );
}
