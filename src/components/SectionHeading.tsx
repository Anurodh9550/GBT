"use client";

import { MotionDiv } from "@/components/motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <MotionDiv variant="fadeUp" className={`max-w-3xl ${alignClass}`}>
      <p className="text-eyebrow text-brand-orange">{eyebrow}</p>
      <h2
        className={`mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] ${
          light ? "text-white" : "text-brand-maroon"
        }`}
      >
        {title}
      </h2>
      <div
        className={`section-title-rule ${align === "center" ? "section-title-rule-center" : ""}`}
        aria-hidden
      />
      {subtitle && (
        <p
          className={`text-body-lg mt-5 ${
            light ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </MotionDiv>
  );
}
