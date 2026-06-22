"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, MotionDiv, MotionStagger } from "@/components/motion";
import { defaultTransition, fadeUp, slideLeft, slideRight } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";

type Stat = { value: string; label: string };

export default function HomeHero({
  stats,
}: {
  stats: readonly Stat[];
}) {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-brand-black text-white">
      <Image
        src="/hero-campus.jpg"
        alt={`${siteConfig.name} campus`}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/55 to-brand-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-brand-black/30" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_80%_50%,#e8751a_0%,transparent_55%)]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-24 lg:grid-cols-2 lg:py-32">
        <MotionStagger animateOnMount>
          <MotionDiv
            variant="fadeUp"
            transition={defaultTransition}
            className="text-eyebrow inline-block rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5 text-brand-orange"
          >
            Admissions Open — Batch {siteConfig.admissionBatch}
          </MotionDiv>
          <MotionDiv
            variant="slideLeft"
            transition={{ ...defaultTransition, delay: 0.1 }}
            className="text-hero mt-8 text-5xl text-white sm:text-6xl lg:text-[4.25rem] lg:leading-[1.05]"
          >
            <h1>
              Empowering
              <br />
              <span className="text-brand-orange">Minds</span>
              <br />
              Shaping the
              <br />
              Future
            </h1>
          </MotionDiv>
          <MotionDiv
            variant="fadeUp"
            transition={{ ...defaultTransition, delay: 0.2 }}
            className="text-body-lg mt-8 max-w-lg text-neutral-300"
          >
            <p>
              {siteConfig.name} — where world-class academics meet real-world
              opportunities. Build your career with industry partners and a legacy
              of excellence under {siteConfig.trust}.
            </p>
          </MotionDiv>
          <MotionDiv
            variant="fadeUp"
            transition={{ ...defaultTransition, delay: 0.28 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MotionDiv hover className="rounded-full">
              <Link href="/admissions" className="btn-primary">
                Apply Now for Admission
                <span aria-hidden="true">→</span>
              </Link>
            </MotionDiv>
            <MotionDiv hover className="rounded-full">
              <Link href="/about-trust" className="btn-outline-white">
                Discover More
              </Link>
            </MotionDiv>
          </MotionDiv>
        </MotionStagger>

        <MotionStagger animateOnMount className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <MotionDiv
              key={s.label}
              variant="slideRight"
              hover
              shadow
              transition={{ ...defaultTransition, delay: 0.15 + i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <p className="font-sans text-3xl font-bold text-white lg:text-4xl">{s.value}</p>
              <p className="mt-2 font-sans text-sm font-normal leading-snug text-neutral-400">
                {s.label}
              </p>
            </MotionDiv>
          ))}
        </MotionStagger>
      </div>

      <MotionDiv
        animateOnMount
        variant="fadeUp"
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-neutral-500"
      >
        <span className="text-eyebrow text-neutral-500">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-8 w-5 rounded-full border border-white/20 p-1"
        >
          <div className="mx-auto h-2 w-1 rounded-full bg-brand-orange" />
        </motion.div>
      </MotionDiv>
    </section>
  );
}
