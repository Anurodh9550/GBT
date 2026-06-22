import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { MotionSection, MotionStagger, MotionCard, MotionItem } from "@/components/motion";

export const metadata = { title: "Assignments" };

const assignments = [
  { title: "Assignment 3 – Binary Trees", subject: "Data Structures", due: "20 Jun 2026", status: "Pending" },
  { title: "Case Study – Market Analysis", subject: "Business Economics", due: "18 Jun 2026", status: "Submitted" },
  { title: "Essay – Shakespeare's Sonnets", subject: "English Literature", due: "22 Jun 2026", status: "Pending" },
  { title: "Problem Set – Integration", subject: "Mathematics II", due: "15 Jun 2026", status: "Overdue" },
  { title: "Project – E-Commerce Website", subject: "Web Development", due: "30 Jun 2026", status: "In Progress" },
];

const statusColors: Record<string, string> = {
  Pending: "bg-brand-orange/15 text-brand-orange-dark",
  Submitted: "bg-brand-green/15 text-brand-green",
  Overdue: "bg-red-100 text-red-700",
  "In Progress": "bg-blue-100 text-blue-700",
};

export default function AssignmentsPage() {
  return (
    <>
      <PageHero
        title="Assignments"
        subtitle="View, submit, and track your academic assignments"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Assignments" }]}
      />
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <MotionStagger className="mb-10 grid gap-4 sm:grid-cols-4">
            {[
              { label: "Total", value: "12", color: "text-brand-maroon" },
              { label: "Pending", value: "4", color: "text-brand-orange" },
              { label: "Submitted", value: "6", color: "text-brand-green" },
              { label: "Overdue", value: "2", color: "text-red-600" },
            ].map((stat) => (
              <MotionCard key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </MotionCard>
            ))}
          </MotionStagger>
          <SectionHeading eyebrow="Your Tasks" title="Active Assignments" />
          <MotionStagger className="mt-8 space-y-4">
            {assignments.map((a) => (
              <MotionItem key={a.title} className="card-hover flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                  <h3 className="font-bold text-brand-maroon">{a.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{a.subject} · Due: {a.due}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-4 py-1 text-xs font-bold ${statusColors[a.status]}`}>{a.status}</span>
                  {a.status !== "Submitted" && (
                    <button className="rounded-full bg-brand-orange px-5 py-2 text-sm font-bold text-white hover:bg-brand-orange-light">Submit</button>
                  )}
                </div>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>
    </>
  );
}
