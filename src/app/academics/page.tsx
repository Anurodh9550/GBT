import Link from "next/link";
import PageHero from "@/components/PageHero";
import WhyStudySection from "@/components/WhyStudySection";
import DepartmentIcon from "@/components/DepartmentIcon";
import { MotionSection, MotionStagger, MotionCard } from "@/components/motion";
import { departments } from "@/lib/site-data";

export const metadata = { title: "Academics" };

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        title="Academic Excellence"
        subtitle="Explore our diverse range of undergraduate and postgraduate programs designed to equip you with future-ready skills."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Academics" }]}
      />
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange/10 px-4 py-1.5 text-eyebrow text-brand-orange">
                • Academic Programs
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">
                Our <span className="text-brand-orange">Departments</span>
              </h2>
            </div>
            <Link href="/departments" className="text-btn text-brand-orange hover:text-brand-orange-light">
              All Departments →
            </Link>
          </div>
          <MotionStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.slice(0, 6).map((dept) => (
              <MotionCard key={dept.slug}>
              <Link
                href={`/departments/${dept.slug}`}
                className="card-hover block rounded-2xl border border-neutral-200 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10">
                  <DepartmentIcon id={dept.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-sans text-lg font-bold text-neutral-900">{dept.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{dept.desc}</p>
              </Link>
              </MotionCard>
            ))}
          </MotionStagger>
          <div className="mt-12 text-center">
            <Link
              href="/departments"
              className="text-btn inline-flex rounded-full border border-brand-maroon px-8 py-3 text-brand-maroon hover:bg-brand-maroon hover:text-white"
            >
              View All Departments →
            </Link>
          </div>
        </div>
      </MotionSection>
      <WhyStudySection />
    </>
  );
}
