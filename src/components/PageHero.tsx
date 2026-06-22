"use client";

import Link from "next/link";
import { motion, MotionDiv, MotionStagger } from "@/components/motion";
import { defaultTransition, fadeDown, fadeUp } from "@/lib/motion";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
};

export default function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-black py-20 text-white lg:py-24">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-maroon-dark/80 to-brand-maroon/60"
      />
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 0.35, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-brand-orange/10 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 0.35, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute -bottom-20 left-0 h-60 w-60 rounded-full bg-brand-green/10 blur-3xl"
      />

      <MotionStagger animateOnMount className="relative mx-auto max-w-7xl px-4">
        {breadcrumb && breadcrumb.length > 0 && (
          <MotionDiv variant="fadeDown" transition={defaultTransition}>
            <nav className="mb-4 flex flex-wrap items-center gap-2 font-sans text-sm font-normal text-neutral-400">
              {breadcrumb.map((item, i) => (
                <span key={item.label} className="flex items-center gap-2">
                  {i > 0 && <span>/</span>}
                  {item.href ? (
                    <Link href={item.href} className="hover:text-brand-orange">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-brand-orange">{item.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </MotionDiv>
        )}
        <MotionDiv variant="fadeUp" transition={defaultTransition}>
          <p className="text-eyebrow text-brand-orange">{eyebrow(title)}</p>
        </MotionDiv>
        <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.08 }}>
          <h1 className="text-hero mt-4 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
        </MotionDiv>
        {subtitle && (
          <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.16 }}>
            <p className="text-body-lg mt-6 max-w-2xl text-neutral-300">{subtitle}</p>
          </MotionDiv>
        )}
      </MotionStagger>
    </section>
  );
}

function eyebrow(title: string) {
  const map: Record<string, string> = {
    "About Trust": "About Us",
    Admissions: "Admissions",
    Courses: "Academics",
    Contact: "Get in Touch",
  };
  return map[title] ?? title;
}
