"use client";

import Link from "next/link";
import { MotionDiv, MotionSection, MotionStagger } from "@/components/motion";
import { defaultTransition } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";

type CTABannerProps = {
  title: string;
  subtitle: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CTABanner({
  title,
  subtitle,
  primaryLabel = "Register Now for Admission →",
  primaryHref = "/admissions",
  secondaryLabel = "View Programs",
  secondaryHref = "/courses",
}: CTABannerProps) {
  return (
    <MotionSection variant="fadeUp" className="bg-[#f6f1ea] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-brand-maroon/10 bg-white shadow-sm">
          <div
            className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-brand-orange via-brand-maroon to-brand-green"
            aria-hidden
          />
          <MotionStagger className="grid items-center gap-8 px-6 py-9 sm:px-10 lg:grid-cols-[1fr_auto] lg:gap-12 lg:px-12 lg:py-11">
            <div>
              <MotionDiv variant="fadeUp" transition={defaultTransition}>
                <p className="text-eyebrow text-brand-orange">Admissions Open</p>
              </MotionDiv>
              <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.08 }}>
                <h2 className="text-hero mt-3 max-w-3xl text-3xl text-brand-maroon sm:text-4xl">{title}</h2>
              </MotionDiv>
              <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.14 }}>
                <p className="text-body-lg mt-4 max-w-2xl text-slate-600">{subtitle}</p>
              </MotionDiv>
              <MotionDiv
                variant="fadeUp"
                transition={{ ...defaultTransition, delay: 0.2 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <MotionDiv hover className="rounded-full">
                  <Link href={primaryHref} className="btn-primary">
                    {primaryLabel}
                  </Link>
                </MotionDiv>
                <MotionDiv hover className="rounded-full">
                  <Link href={secondaryHref} className="btn-outline-maroon">
                    {secondaryLabel}
                  </Link>
                </MotionDiv>
              </MotionDiv>
            </div>

            <MotionDiv
              variant="fadeUp"
              transition={{ ...defaultTransition, delay: 0.16 }}
              className="rounded-2xl bg-brand-maroon px-6 py-6 text-white sm:min-w-[240px]"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">
                Session {siteConfig.admissionBatch}
              </p>
              <p className="mt-3 font-serif text-2xl font-bold leading-tight">Counseling started</p>
              <p className="mt-2 text-sm text-white/75">Last date to apply · 31 July 2026</p>
              <p className="mt-4 border-t border-white/15 pt-4 text-sm font-semibold">
                {siteConfig.phone}
              </p>
            </MotionDiv>
          </MotionStagger>
        </div>
      </div>
    </MotionSection>
  );
}
