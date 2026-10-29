import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import CareerWorkspace from "@/components/careers/CareerWorkspace";
import { MotionSection, MotionStagger, MotionCard, MotionDiv } from "@/components/motion";
import { careerOpenings } from "@/lib/careers";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Careers",
  description: `Faculty and staff vacancies at ${siteConfig.name}. Apply for teaching and non-teaching posts on the Jalaun campus.`,
};

const reasons = [
  {
    title: "Teach the programmes you trained for",
    desc: "Dental, pharmacy, paramedical, veterinary, commerce, and management classes run on one campus.",
  },
  {
    title: "Clinics and classrooms together",
    desc: "Healthcare faculty work with students in labs and clinical postings, not only in lectures.",
  },
  {
    title: "A settled campus routine",
    desc: "The college has taught in Jalaun since 1998, with a library, labs, and a full academic calendar.",
  },
  {
    title: "Room to shape a department",
    desc: "Smaller departments mean your classes, practicals, and student mentoring are visible work.",
  },
];

const steps = [
  {
    step: "01",
    title: "Apply online",
    desc: "Choose a post and send your qualification, experience, and a short note. Email your CV as well.",
  },
  {
    step: "02",
    title: "Department screening",
    desc: "The concerned department checks qualifications against the post and council or university norms.",
  },
  {
    step: "03",
    title: "Interview",
    desc: "Shortlisted candidates are invited to campus for an interview. Teaching posts may include a demo class.",
  },
  {
    step: "04",
    title: "Offer and joining",
    desc: "Selected candidates receive an offer from the college office with the joining date and documents required.",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="relative border-b border-slate-200 bg-[#f7f4ef]">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_right,rgba(232,117,26,0.12),transparent_62%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24 lg:pt-20">
          <MotionDiv variant="fadeUp" animateOnMount>
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-[13px] text-slate-500">
              <Link href="/" className="hover:text-brand-orange">
                Home
              </Link>
              <span className="text-slate-300">/</span>
              <span className="font-medium text-brand-maroon">Careers</span>
            </nav>
            <p className="text-eyebrow text-brand-orange">Work at {siteConfig.shortName}</p>
            <h1 className="text-hero mt-4 max-w-xl text-4xl text-brand-maroon sm:text-5xl">
              Careers
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
              {siteConfig.name} is hiring faculty and staff for the campus at Village Nagara, Jalaun.
              Teaching posts cover healthcare and degree programmes. Office and laboratory posts support
              daily college work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#openings" className="btn-primary">
                View openings
              </a>
              <a href="#apply" className="btn-outline-maroon">
                Apply now
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-200 pt-6">
              {[
                { value: siteConfig.established, label: "Established" },
                { value: String(careerOpenings.length), label: "Open posts" },
                { value: "Jalaun", label: "Campus" },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="font-serif text-2xl font-bold text-brand-maroon">{item.value}</dt>
                  <dd className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">{item.label}</dd>
                </div>
              ))}
            </dl>
          </MotionDiv>
          <MotionDiv variant="fadeUp" animateOnMount className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/gallery/academic-block.png"
                alt={`Academic block at ${siteConfig.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[center_30%]"
              />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-md backdrop-blur sm:left-auto sm:right-6 sm:w-64">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">College office</p>
              <p className="mt-2 text-sm font-semibold text-brand-maroon">{siteConfig.phone}</p>
              <p className="mt-1 text-sm text-slate-600">{siteConfig.email}</p>
            </div>
          </MotionDiv>
        </div>
      </section>

      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Why join"
            title="A campus that still knows its teachers"
            subtitle={`${siteConfig.shortName} is a trust-run college. Faculty teach small programmes in healthcare, commerce, and management, and they stay close to students from the first semester.`}
          />
          <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2">
            {reasons.map((item, index) => (
              <MotionCard key={item.title}>
                <div className="card-surface h-full p-6 sm:p-7">
                  <p className="text-eyebrow text-brand-orange">0{index + 1}</p>
                  <h3 className="mt-3 font-serif text-xl font-bold text-brand-maroon">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection id="openings" className="section-padding scroll-mt-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <CareerWorkspace />
        </div>
      </MotionSection>

      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Selection"
            title="How hiring works"
            subtitle="Every application is read by the college office and the department concerned. There is no walk-in appointment unless the office asks you to visit."
            align="center"
          />
          <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => (
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

      <MotionSection className="bg-brand-maroon-dark py-16 text-white lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-eyebrow text-brand-orange">Students</p>
            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
              Looking for a job after your course?
            </h2>
            <p className="mt-4 text-white/75">
              Hospital internships, pharmacies, and campus drives are handled by the placement cell.
              This careers page is only for people who want to join the college as faculty or staff.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/placements" className="btn-primary">
              Student placements
            </Link>
            <Link href="/contact" className="btn-outline-white">
              Contact office
            </Link>
          </div>
        </div>
      </MotionSection>
    </>
  );
}
