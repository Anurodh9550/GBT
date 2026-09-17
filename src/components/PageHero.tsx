"use client";

import Link from "next/link";
import Image from "next/image";
import { MotionDiv, MotionStagger } from "@/components/motion";
import { defaultTransition } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";
import RegisterButton from "@/components/RegisterButton";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
  image?: string;
  imageAlt?: string;
};

export default function PageHero({
  title,
  subtitle,
  breadcrumb,
  image = "/gallery/campus-building.png",
  imageAlt = `${siteConfig.name} campus`,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#f6f1ea]">
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 bg-[radial-gradient(ellipse_at_top_left,rgba(232,117,26,0.08),transparent_55%)] lg:block" />

      <div className="relative mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <MotionStagger animateOnMount className="flex flex-col justify-center px-4 py-12 sm:py-16 lg:py-20 lg:pr-12">
          {breadcrumb && breadcrumb.length > 0 && (
            <MotionDiv variant="fadeDown" transition={defaultTransition}>
              <nav className="mb-5 flex flex-wrap items-center gap-2 font-sans text-[13px] text-slate-500">
                {breadcrumb.map((item, i) => (
                  <span key={item.label} className="flex items-center gap-2">
                    {i > 0 && <span className="text-slate-300">/</span>}
                    {item.href ? (
                      <Link href={item.href} className="hover:text-brand-orange">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="font-medium text-brand-maroon">{item.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            </MotionDiv>
          )}

          <MotionDiv variant="fadeUp" transition={defaultTransition}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/25 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-orange">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
              Counseling started · {siteConfig.admissionBatch}
            </span>
          </MotionDiv>

          <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.06 }}>
            <p className="text-eyebrow mt-5 text-brand-orange">{eyebrow(title)}</p>
          </MotionDiv>

          <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.1 }}>
            <h1 className="text-hero mt-3 max-w-xl text-4xl text-brand-maroon sm:text-5xl lg:text-[3.35rem]">
              {title}
            </h1>
            <div className="section-title-rule" aria-hidden />
          </MotionDiv>

          {subtitle && (
            <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.16 }}>
              <p className="text-body-lg mt-5 max-w-xl text-slate-600">{subtitle}</p>
            </MotionDiv>
          )}

          <MotionDiv
            variant="fadeUp"
            transition={{ ...defaultTransition, delay: 0.22 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <RegisterButton />
            <Link
              href={siteConfig.enquiryFormUrl}
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-maroon px-5 py-2.5 text-sm font-bold text-brand-maroon transition hover:bg-brand-maroon hover:text-white"
            >
              {siteConfig.enquiryCtaLabel} →
            </Link>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="text-sm font-semibold text-slate-600 hover:text-brand-orange"
            >
              {siteConfig.phone}
            </a>
          </MotionDiv>
        </MotionStagger>

        <MotionDiv
          variant="slideLeft"
          animateOnMount
          className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-full"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-[center_28%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-dark/70 via-brand-maroon/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">
              {siteConfig.shortName}
            </p>
            <p className="mt-1 font-serif text-lg font-bold text-white">Visit campus for counseling</p>
            <p className="mt-1 text-sm text-white/80">Village Nagara, Jalaun, Uttar Pradesh</p>
          </div>
        </MotionDiv>
      </div>

      <div className="header-accent-line" />
    </section>
  );
}

function eyebrow(title: string) {
  const map: Record<string, string> = {
    "About Trust": "About Us",
    Admissions: "Admissions",
    Courses: "Academics",
    Contact: "Get in Touch",
    "Campus Life": "Student Experience",
    "Placements & Careers": "Healthcare Careers",
  };
  return map[title] ?? title;
}
