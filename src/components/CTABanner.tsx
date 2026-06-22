"use client";

import Link from "next/link";
import { MotionDiv, MotionSection, MotionStagger } from "@/components/motion";
import { defaultTransition } from "@/lib/motion";

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
  primaryLabel = "Apply Now →",
  primaryHref = "/admissions",
  secondaryLabel = "View Programs",
  secondaryHref = "/courses",
}: CTABannerProps) {
  return (
    <MotionSection variant="fadeUp" className="relative overflow-hidden bg-brand-black py-20 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-maroon-dark to-brand-maroon opacity-90" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
      <MotionStagger className="relative mx-auto max-w-4xl px-4 text-center">
        <MotionDiv variant="fadeUp" transition={defaultTransition}>
          <p className="text-eyebrow text-brand-orange">Admissions Open</p>
        </MotionDiv>
        <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.08 }}>
          <h2 className="text-hero mt-4 text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
        </MotionDiv>
        <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.14 }}>
          <p className="text-body-lg mx-auto mt-5 max-w-2xl text-neutral-300">{subtitle}</p>
        </MotionDiv>
        <MotionDiv
          variant="fadeUp"
          transition={{ ...defaultTransition, delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <MotionDiv hover className="rounded-full">
            <Link href={primaryHref} className="btn-primary">
              {primaryLabel}
            </Link>
          </MotionDiv>
          <MotionDiv hover className="rounded-full">
            <Link href={secondaryHref} className="btn-outline-white">
              {secondaryLabel}
            </Link>
          </MotionDiv>
        </MotionDiv>
      </MotionStagger>
    </MotionSection>
  );
}
