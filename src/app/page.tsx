import Link from "next/link";
import AboutSections from "@/components/AboutSections";
import HomeHero from "@/components/HomeHero";
import AdmissionsPoster from "@/components/AdmissionsPoster";
import OurCoursesSection from "@/components/OurCoursesSection";
import SectionHeading from "@/components/SectionHeading";
import GalleryImageCard from "@/components/GalleryImageCard";
import DepartmentIcon from "@/components/DepartmentIcon";
import FeatureIcon from "@/components/FeatureIcon";
import PortalIcon, { portalIconIdFromLabel } from "@/components/PortalIcon";
import CTABanner from "@/components/CTABanner";
import { MotionSection, MotionStagger, MotionItem, MotionCard } from "@/components/motion";
import { siteConfig } from "@/lib/site-config";
import {
  stats,
  whyChoose,
  departments,
  campusHighlights,
  testimonials,
  newsItems,
  galleryPreview,
} from "@/lib/site-data";

export default function Home() {
  return (
    <>
      <HomeHero stats={stats} />

      {/* ── ADMISSIONS HIGHLIGHT ── */}
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Admissions 2026"
              title="Your Future Starts Here"
              subtitle="Join a community of innovators, leaders, and problem solvers. Our industry-aligned curriculum ensures you are ready for the workforce from day one."
            />
            <AdmissionsPoster />
          </div>
        </div>
      </MotionSection>

      {/* ── ABOUT ── */}
      <AboutSections variant="official" />

      {/* ── OUR COURSES ── */}
      <OurCoursesSection />

      {/* ── DEPARTMENTS ── */}
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Academic Excellence"
              title="Our Departments"
              subtitle="Explore our engineering and management departments with industry-aligned programs."
            />
            <Link href="/departments" className="btn-outline-maroon">
              All Departments →
            </Link>
          </div>
          <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {departments.slice(0, 6).map((dept) => (
              <MotionCard key={dept.slug}>
              <Link
                href={`/departments/${dept.slug}`}
                className="card-surface-interactive group block p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10">
                  <DepartmentIcon id={dept.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-maroon group-hover:text-brand-orange">
                  {dept.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">{dept.desc}</p>
              </Link>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      {/* ── WHY CHOOSE US ── */}
      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Why Choose GBT"
            title="Built for the Future of Education"
            subtitle="We combine rigorous academics with real-world exposure, giving students the competitive edge they need to excel."
            align="center"
          />
          <MotionStagger className="mt-14 grid gap-6 md:grid-cols-3">
            {whyChoose.map((item) => (
              <MotionCard key={item.title}>
              <div className="card-surface p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10">
                  <FeatureIcon id={item.icon} />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-maroon">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      {/* ── CAMPUS HIGHLIGHTS ── */}
      <MotionSection className="bg-brand-black py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            {siteConfig.name} — Campus Highlights
          </p>
          <MotionStagger className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {campusHighlights.map((h) => (
              <MotionItem key={h.label} className="text-center">
                <p className="font-sans text-4xl font-bold text-brand-orange">{h.value}</p>
                <p className="mt-2 font-sans text-sm font-normal text-neutral-400">{h.label}</p>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      {/* ── CAMPUS LIFE / GALLERY ── */}
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Campus Life"
            title="Our Beautiful Campus"
            subtitle="Sprawling green lawns, modern architecture, and a vibrant community — experience GBT College like never before."
            align="center"
          />
          <MotionStagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPreview.map((item) => (
              <MotionCard key={item.title}>
                <GalleryImageCard item={item} />
              </MotionCard>
            ))}
          </MotionStagger>
          <div className="mt-10 text-center">
            <Link href="/gallery" className="btn-maroon">
              View Full Gallery →
            </Link>
          </div>
        </div>
      </MotionSection>

      {/* ── NEWS & EVENTS ── */}
      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Latest Updates" title="News & Events" />
            <Link href="/news-events" className="text-sm font-bold text-brand-orange hover:text-brand-orange-light">
              View All →
            </Link>
          </div>
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-3">
            {newsItems.map((item) => (
              <MotionCard key={item.title}>
              <Link href={item.href} className="card-surface-interactive block p-6">
                <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold text-brand-orange">
                  {item.tag}
                </span>
                <p className="mt-3 text-xs text-slate-400">{item.date}</p>
                <h3 className="mt-2 font-serif font-bold text-brand-maroon">{item.title}</h3>
              </Link>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      {/* ── TESTIMONIALS ── */}
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Student Voices"
            title="What Our Alumni Say"
            subtitle="Real stories from our graduates — discovering how the GBT experience shaped their careers."
            align="center"
          />
          <MotionStagger className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <MotionCard key={t.name}>
              <div className="card-surface bg-slate-50 p-8">
                <p className="text-4xl leading-none text-brand-orange/30">&ldquo;</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 italic">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-maroon text-sm font-bold text-white">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-serif text-sm font-bold text-brand-maroon">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      {/* ── STUDENT PORTAL QUICK ACCESS ── */}
      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Student Portal"
            title="Everything You Need, One Click Away"
            align="center"
          />
          <MotionStagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Online Classes", href: "/online-classes" },
              { label: "Study Materials", href: "/study-materials" },
              { label: "Assignments", href: "/assignments" },
              { label: "Results", href: "/results" },
              { label: "Online Exams", href: "/online-exams" },
              { label: "Student Login", href: "/student-login" },
              { label: "Faculty Login", href: "/faculty-login" },
              { label: "Contact Office", href: "/contact" },
            ].map((item) => (
              <MotionCard key={item.href}>
              <Link
                href={item.href}
                className="card-surface-interactive flex items-center gap-4 p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10">
                  <PortalIcon id={portalIconIdFromLabel(item.label)} />
                </span>
                <span className="text-sm font-semibold text-brand-maroon">{item.label}</span>
              </Link>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      {/* ── FINAL CTA ── */}
      <CTABanner
        title={`Begin Your Journey at ${siteConfig.name}`}
        subtitle={`Join thousands of alumni shaping the world. Admissions open for Batch ${siteConfig.admissionBatch}. Apply now and secure your future.`}
      />
    </>
  );
}
