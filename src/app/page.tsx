import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import HomeAbout from "@/components/HomeAbout";
import OurCoursesSection from "@/components/OurCoursesSection";
import SectionHeading from "@/components/SectionHeading";
import GalleryImageCard from "@/components/GalleryImageCard";
import FeatureIcon from "@/components/FeatureIcon";
import PortalIcon, { portalIconIdFromLabel } from "@/components/PortalIcon";
import CTABanner from "@/components/CTABanner";
import { MotionSection, MotionStagger, MotionCard } from "@/components/motion";
import { siteConfig } from "@/lib/site-config";
import { whyChoose, testimonials, newsItems, galleryPreview } from "@/lib/site-data";

const portalQuick = [
  { label: "Student Login", href: "/student-login" },
  { label: "Faculty Login", href: "/faculty-login" },
  { label: "Results", href: "/results" },
  { label: "Contact Office", href: "/contact" },
];

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <OurCoursesSection limit={6} />

      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow={`Why Choose ${siteConfig.shortName}`}
            title="A campus built for learning"
            subtitle="Clinical training, experienced faculty, and affordable programmes for students from Jalaun and nearby districts."
            align="center"
          />
          <MotionStagger className="mt-12 grid gap-6 md:grid-cols-3">
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

      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Campus"
            title="Life at GBCE"
            subtitle="The academic block, lawns and campus gate at Village Nagara, Jalaun."
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

      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionHeading eyebrow="Latest Updates" title="News & Events" />
                <Link href="/news-events" className="text-sm font-bold text-brand-orange hover:text-brand-orange-light">
                  View All →
                </Link>
              </div>
              <MotionStagger className="mt-8 space-y-4">
                {newsItems.map((item) => (
                  <MotionCard key={item.title}>
                    <Link href={item.href} className="card-surface-interactive flex gap-4 p-5">
                      <span className="mt-0.5 shrink-0 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold text-brand-orange">
                        {item.tag}
                      </span>
                      <span>
                        <span className="block text-xs text-slate-400">{item.date}</span>
                        <span className="mt-1 block font-serif font-bold text-brand-maroon">{item.title}</span>
                      </span>
                    </Link>
                  </MotionCard>
                ))}
              </MotionStagger>
            </div>

            <div>
              <SectionHeading eyebrow="Student Voices" title="Alumni" />
              <MotionStagger className="mt-8 space-y-4">
                {testimonials.map((t) => (
                  <MotionCard key={t.name}>
                    <div className="card-surface p-6">
                      <p className="text-sm leading-relaxed text-slate-600 italic">&ldquo;{t.quote}&rdquo;</p>
                      <p className="mt-4 text-sm font-bold text-brand-maroon">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </MotionCard>
                ))}
              </MotionStagger>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="College Portal"
            title="Student & Faculty Access"
            subtitle="Login to ERP, check results, or reach the office."
            align="center"
          />
          <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {portalQuick.map((item) => (
              <MotionCard key={item.href}>
                <Link href={item.href} className="card-surface-interactive flex items-center gap-4 p-5">
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

      <CTABanner
        title={`Begin your journey at ${siteConfig.shortName}`}
        subtitle={`Counseling is open for Batch ${siteConfig.admissionBatch}. Enquire online or register to secure your seat.`}
      />
    </>
  );
}
