import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";
import { MotionSection, MotionStagger, MotionCard } from "@/components/motion";

export const metadata = { title: "Placements" };

const recruiters = ["TCS", "Infosys", "Wipro", "HCL", "Capgemini", "Cognizant", "Deloitte", "Amazon"];

const placementStats = [
  { value: "95%", label: "Placement Rate" },
  { value: "100+", label: "Recruiting Partners" },
  { value: "₹6 LPA", label: "Average Package" },
  { value: "₹12 LPA", label: "Highest Package" },
];

export default function PlacementsPage() {
  return (
    <>
      <PageHero
        title="Placements & Careers"
        subtitle="Strong industry partnerships with leading companies, driving excellent placement outcomes."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Placements" }]}
      />
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Career Outcomes"
            title="Exceptional Placement Record"
            subtitle="Our dedicated placement cell connects students with top recruiters through campus drives, internships, and career guidance."
            align="center"
          />
          <MotionStagger className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {placementStats.map((s) => (
              <MotionCard key={s.label} className="rounded-2xl border border-neutral-200 bg-slate-50 p-6 text-center">
                <p className="font-sans text-3xl font-bold text-brand-orange">{s.value}</p>
                <p className="mt-2 text-sm text-neutral-600">{s.label}</p>
              </MotionCard>
            ))}
          </MotionStagger>
          <div className="mt-16">
            <h3 className="text-center font-serif text-2xl font-bold text-brand-maroon">Our Recruiters</h3>
            <MotionStagger className="mt-8 flex flex-wrap justify-center gap-3">
              {recruiters.map((r) => (
                <MotionCard key={r}>
                  <span className="inline-block rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold text-neutral-700 shadow-sm">
                    {r}
                  </span>
                </MotionCard>
              ))}
            </MotionStagger>
          </div>
        </div>
      </MotionSection>
      <CTABanner
        title="Start Your Career Journey"
        subtitle="Join GBT College and get access to placement training, mock interviews, and campus recruitment drives."
        secondaryLabel="View Departments"
        secondaryHref="/departments"
      />
    </>
  );
}
