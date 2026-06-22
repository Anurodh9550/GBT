import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import PortalIcon, { portalIconIdFromLabel } from "@/components/PortalIcon";
import { MotionSection, MotionStagger, MotionCard } from "@/components/motion";
import { portalNav } from "@/lib/site-config";

export const metadata = { title: "Portal" };

export default function PortalPage() {
  return (
    <>
      <PageHero
        title="Student & Faculty Portal"
        subtitle="Access online classes, study materials, assignments, exams, and results."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Portal" }]}
      />
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-14 grid gap-6 sm:grid-cols-2">
            <MotionCard>
              <Link
                href="/student-login"
                className="card-surface-interactive flex items-center gap-5 border-brand-orange/20 bg-brand-orange/5 p-8"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-orange/15">
                  <PortalIcon id="student" className="h-8 w-8" />
                </span>
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-maroon">Student ERP</h3>
                  <p className="mt-1 text-sm text-slate-600">Login for classes, materials & results</p>
                </div>
              </Link>
            </MotionCard>
            <MotionCard>
              <Link
                href="/faculty-login"
                className="card-surface-interactive flex items-center gap-5 border-brand-green/20 bg-brand-green/5 p-8"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green/15">
                  <PortalIcon id="faculty" className="h-8 w-8 text-brand-green" />
                </span>
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-maroon">Faculty ERP</h3>
                  <p className="mt-1 text-sm text-slate-600">Login for faculty & staff portal</p>
                </div>
              </Link>
            </MotionCard>
          </div>
          <SectionHeading
            eyebrow="Quick Access"
            title="Portal Services"
            subtitle="Select a service below to login or access your academic resources."
            align="center"
          />
          <MotionStagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {portalNav.map((item) => (
              <MotionCard key={item.href}>
                <Link
                  href={item.href}
                  className="card-surface-interactive flex flex-col items-center p-8 text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10">
                    <PortalIcon id={portalIconIdFromLabel(item.label)} className="h-7 w-7" />
                  </span>
                  <span className="mt-4 font-sans text-sm font-bold text-brand-maroon">{item.label}</span>
                </Link>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>
    </>
  );
}
