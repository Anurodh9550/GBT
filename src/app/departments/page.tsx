import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { MotionSection, MotionStagger, MotionCard } from "@/components/motion";
import DepartmentIcon from "@/components/DepartmentIcon";
import { departments } from "@/lib/site-data";

export const metadata = { title: "Departments" };

export default function DepartmentsPage() {
  return (
    <>
      <PageHero
        title="Our Departments"
        subtitle="Discover our wide range of academic departments designed for the modern world."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          { label: "Departments" },
        ]}
      />
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Academic Programs" title="Our Departments" />
            <Link href="/admissions" className="btn-outline-maroon">
              Apply Now →
            </Link>
          </div>
          <MotionStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => (
              <MotionCard key={dept.slug}>
                <Link href={`/departments/${dept.slug}`} className="card-surface-interactive block p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10">
                    <DepartmentIcon id={dept.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-brand-maroon">{dept.name}</h3>
                  <p className="mt-1 text-xs font-semibold text-brand-orange">{dept.duration}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{dept.desc}</p>
                </Link>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>
    </>
  );
}
