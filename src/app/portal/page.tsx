import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import PortalIcon, { portalIconIdFromLabel } from "@/components/PortalIcon";
import CTABanner from "@/components/CTABanner";
import { MotionSection, MotionStagger, MotionCard } from "@/components/motion";
import { portalNav, siteConfig } from "@/lib/site-config";

export const metadata = { title: "Portal" };

const services = portalNav.filter(
  (item) => item.href !== "/student-login" && item.href !== "/faculty-login"
);

export default function PortalPage() {
  return (
    <>
      <PageHero
        variant="portal"
        title="College Portal"
        subtitle="Login to Student ERP or Faculty ERP, then open classes, study materials, assignments, exams and results."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Portal" }]}
      />

      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Quick Access"
            title="Academic Services"
            subtitle="These tools open after you sign in. Choose a service to continue."
          />
          <MotionStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => (
              <MotionCard key={item.href}>
                <Link href={item.href} className="card-surface-interactive flex items-center gap-4 p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10">
                    <PortalIcon id={portalIconIdFromLabel(item.label)} className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-serif text-base font-bold text-brand-maroon">{item.label}</span>
                    <span className="mt-0.5 block text-sm text-slate-500">Open {item.label.toLowerCase()}</span>
                  </span>
                </Link>
              </MotionCard>
            ))}
            <MotionCard>
              <Link href="/contact" className="card-surface-interactive flex items-center gap-4 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10">
                  <PortalIcon id="contact" className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-serif text-base font-bold text-brand-maroon">Need help?</span>
                  <span className="mt-0.5 block text-sm text-slate-500">Contact the college office</span>
                </span>
              </Link>
            </MotionCard>
          </MotionStagger>
        </div>
      </MotionSection>

      <CTABanner
        title="New student? Register first"
        subtitle={`Admissions for session ${siteConfig.admissionBatch} are open. Enquiry or register, then use the portal after enrolment.`}
        primaryLabel="Register Now for Admission →"
        primaryHref={siteConfig.admissionRegisterUrl}
        secondaryLabel={siteConfig.enquiryCtaLabel}
        secondaryHref={siteConfig.enquiryFormUrl}
      />
    </>
  );
}
