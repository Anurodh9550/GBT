import PageHero from "@/components/PageHero";
import AboutSections from "@/components/AboutSections";
import CTABanner from "@/components/CTABanner";
import { MotionSection, MotionCard } from "@/components/motion";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "About Trust" };

export default function AboutTrustPage() {
  return (
    <>
      <PageHero
        title="About Trust"
        subtitle={`Learn about the vision, mission, and legacy of ${siteConfig.trust}`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About Trust" }]}
      />
      <AboutSections className="bg-white" />
      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            <MotionCard className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">
              <h3 className="font-serif text-2xl font-bold text-brand-maroon">Trust Leadership</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Guided by experienced educators and administrators dedicated to academic excellence
                and student welfare at {siteConfig.name}.
              </p>
              <ul className="mt-8 grid gap-5 sm:grid-cols-3">
                {[
                  { name: "Dr. Rajesh Kumar", role: "Chairman" },
                  { name: "Mrs. Sunita Sharma", role: "Secretary" },
                  { name: "Prof. Amit Verma", role: "Principal" },
                ].map((person) => (
                  <li key={person.name} className="rounded-xl border border-slate-100 bg-slate-50 p-5 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-maroon text-sm font-bold text-white">
                      {person.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <p className="mt-4 text-sm font-semibold">{person.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{person.role}</p>
                  </li>
                ))}
              </ul>
            </MotionCard>
            <MotionCard className="rounded-2xl bg-brand-black p-8 text-white">
              <h3 className="font-bold text-brand-orange">Trust Highlights</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                <li>• 25+ Years of Service</li>
                <li>• NAAC Accredited Institution</li>
                <li>• 50+ Community Programs</li>
                <li>• ISO Certified Management</li>
                <li>• Rural Education Outreach</li>
              </ul>
            </MotionCard>
          </div>
        </div>
      </MotionSection>
      <CTABanner
        title="Join Our Legacy of Excellence"
        subtitle="Apply for admissions and become part of the GBT family."
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
