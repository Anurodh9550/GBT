import type { ReactNode } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";
import { MotionSection, MotionStagger, MotionCard } from "@/components/motion";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Placements" };

const placementStats = [
  { value: "90%+", label: "Clinical Placement Rate" },
  { value: "50+", label: "Hospitals & Healthcare Partners" },
  { value: "200+", label: "Internship & Housemanship Seats" },
  { value: "4", label: "Healthcare Career Streams" },
];

const courseCareers = [
  {
    code: "BDS",
    href: "/courses#bds",
    title: "Bachelor of Dental Surgery",
    roles: "Dental surgeon, hospital dental department, private clinic, MDS pathway",
    employers: "Apollo Dental, Clove Dental, multi-speciality hospitals",
    icon: "dental" as const,
  },
  {
    code: "D-Pharma",
    href: "/courses#d-pharma",
    title: "Diploma in Pharmacy",
    roles: "Hospital pharmacist, retail pharmacy, pharma QA, medical representative",
    employers: "Apollo Pharmacy, MedPlus, Cipla, Sun Pharma, Alkem",
    icon: "pharma" as const,
  },
  {
    code: "Paramedical",
    href: "/courses#paramedical",
    title: "Paramedical Diplomas",
    roles: "Radiology, DMLT, OT, ECG, and dialysis technician roles",
    employers: "Fortis, Max, Dr. Lal PathLabs, SRL, Metropolis",
    icon: "para" as const,
  },
  {
    code: "Veterinary",
    href: "/courses#veterinary",
    title: "Veterinary Programmes",
    roles: "Veterinary assistant, livestock care, dairy & poultry healthcare",
    employers: "Veterinary hospitals, animal husbandry departments, dairy clinics",
    icon: "vet" as const,
  },
];

const recruiterGroups = [
  {
    title: "Hospitals",
    partners: ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Medanta", "Narayana Health", "Manipal Hospitals"],
  },
  {
    title: "Pharma Companies",
    partners: ["Cipla", "Sun Pharma", "Dr. Reddy's", "Alkem", "Abbott", "Himalaya Wellness"],
  },
  {
    title: "Diagnostics",
    partners: ["Dr. Lal PathLabs", "SRL Diagnostics", "Metropolis", "Thyrocare"],
  },
  {
    title: "Dental & Pharmacy Retail",
    partners: ["Clove Dental", "Apollo Dental", "Apollo Pharmacy", "MedPlus"],
  },
];

const placementSteps = [
  {
    step: "01",
    title: "Clinical Training",
    desc: "Hands-on labs, dental clinics, and hospital postings while you study.",
  },
  {
    step: "02",
    title: "Internship",
    desc: "Housemanship and hospital internships arranged through the placement cell.",
  },
  {
    step: "03",
    title: "Campus Drives",
    desc: "Hospitals, diagnostic labs, and pharma partners visit for recruitment.",
  },
  {
    step: "04",
    title: "Career Support",
    desc: "Interview prep, clinic setup guidance, and counselling for every stream.",
  },
];

function CourseIcon({
  name,
  className = "h-6 w-6",
}: {
  name: (typeof courseCareers)[number]["icon"];
  className?: string;
}) {
  const icons: Record<(typeof courseCareers)[number]["icon"], ReactNode> = {
    dental: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3c3.5 0 6 2.2 6 5.5 0 4.2-2.4 7.8-4.2 10.2-.8 1-2.8 1-3.6 0C8.4 16.3 6 12.7 6 8.5 6 5.2 8.5 3 12 3z"
        />
      </svg>
    ),
    pharma: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 3h6v2H9V3zm1 2v3.2L4.8 18.2A2.4 2.4 0 006.9 21.6h10.2a2.4 2.4 0 002.1-3.4L14 8.2V5H10z"
        />
      </svg>
    ),
    para: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4v16M8 8h8M6 12h12M8 16h8M4.5 8.5a2 2 0 010-3M19.5 8.5a2 2 0 000-3"
        />
      </svg>
    ),
    vet: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 8a2.5 2.5 0 11-2-4 2.5 2.5 0 012 4zm10 0a2.5 2.5 0 10-2-4 2.5 2.5 0 002 4zM7 13c0-2.2 2.2-4 5-4s5 1.8 5 4v5H7v-5z"
        />
      </svg>
    ),
  };

  return icons[name];
}

export default function PlacementsPage() {
  return (
    <>
      <PageHero
        variant="career"
        title="Placements & Careers"
        subtitle="Hospital internships, dental clinics, pharmacies, diagnostic labs, and pharma partners — healthcare careers after GBCE."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Placements" }]}
      />

      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Healthcare Careers"
            title="From classroom and clinic to hospital floors"
            subtitle={`${siteConfig.name} prepares BDS, pharmacy, paramedical, and veterinary students for hospitals, clinics, pharmacies, and diagnostic labs.`}
            align="center"
          />
          <MotionStagger className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {placementStats.map((item) => (
              <MotionCard key={item.label}>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6 text-center">
                  <p className="font-serif text-3xl font-bold text-brand-orange sm:text-4xl">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{item.label}</p>
                </div>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="By Programme"
            title="Where our medical courses lead"
            subtitle="Each healthcare stream has a clear path — hospitals, clinics, pharmacies, labs, and veterinary practice."
            align="center"
          />
          <MotionStagger className="mt-12 grid gap-6 md:grid-cols-2">
            {courseCareers.map((course) => (
              <MotionCard key={course.code}>
                <Link href={course.href} className="card-surface-interactive block h-full p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                      <CourseIcon name={course.icon} />
                    </div>
                    <span className="rounded-full bg-brand-maroon/10 px-3 py-1 text-xs font-bold text-brand-maroon">
                      {course.code}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-bold text-brand-maroon">{course.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    <span className="font-semibold text-slate-800">Roles: </span>
                    {course.roles}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    <span className="font-semibold text-slate-800">Partners: </span>
                    {course.employers}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-orange">
                    View course →
                  </p>
                </Link>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Recruiters"
            title="Hospitals, pharma & diagnostic partners"
            subtitle="Our placement cell works with healthcare employers — hospitals, pharmacy chains, labs, and dental networks."
            align="center"
          />
          <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recruiterGroups.map((group) => (
              <MotionCard key={group.title}>
                <div className="card-surface h-full p-6">
                  <h3 className="font-serif text-lg font-bold text-brand-maroon">{group.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {group.partners.map((partner) => (
                      <li
                        key={partner}
                        className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
                      >
                        {partner}
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Placement Cell"
            title="How we place healthcare students"
            subtitle="Training, internships, and hospital recruitment — mapped to dental, pharmacy, paramedical, and veterinary programmes."
            align="center"
          />
          <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {placementSteps.map((item) => (
              <MotionCard key={item.step}>
                <div className="card-surface h-full p-6">
                  <p className="text-eyebrow text-brand-orange">{item.step}</p>
                  <h3 className="mt-3 font-serif text-lg font-bold text-brand-maroon">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <CTABanner
        title="Start your healthcare career at GBCE"
        subtitle="Apply for BDS, D-Pharma, paramedical, or veterinary programmes and train for hospitals, clinics, and pharmacies."
        secondaryLabel="View Courses"
        secondaryHref="/courses"
      />
    </>
  );
}
