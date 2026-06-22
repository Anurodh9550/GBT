import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { MotionSection, MotionDiv } from "@/components/motion";

export const metadata = { title: "Results" };

export default function ResultsPage() {
  return (
    <>
      <PageHero
        title="Results"
        subtitle="Check semester examination results and grade sheets"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Results" }]}
      />
      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-2xl px-4">
          <MotionDiv hover shadow className="rounded-2xl border border-slate-200 bg-white p-8">
            <SectionHeading eyebrow="Search" title="Result Search" subtitle="Enter your details below to view semester results." />
            <form className="mt-8 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Roll Number</label>
                <input type="text" placeholder="e.g. GBT2024001" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Select Semester</label>
                <select className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none">
                  {["Semester 1","Semester 2","Semester 3","Semester 4","Semester 5","Semester 6"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Date of Birth</label>
                <input type="date" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange" />
              </div>
              <button type="submit" className="w-full rounded-full bg-brand-orange py-3.5 font-bold text-white hover:bg-brand-orange-light">View Result</button>
            </form>
          </MotionDiv>
          <MotionDiv hover shadow className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="font-bold text-brand-maroon">Recently Declared Results</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {["B.Sc. CS – Semester 4 (May 2026)", "B.Com. – Semester 2 (May 2026)", "BCA – Semester 6 (April 2026)"].map((r) => (
                <li key={r} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0">
                  <span className="text-slate-600">{r}</span>
                  <span className="rounded-full bg-brand-green/15 px-3 py-1 text-xs font-bold text-brand-green">Declared</span>
                </li>
              ))}
            </ul>
          </MotionDiv>
        </div>
      </MotionSection>
    </>
  );
}
