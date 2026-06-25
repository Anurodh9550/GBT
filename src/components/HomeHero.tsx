"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { MotionDiv, MotionStagger } from "@/components/motion";
import { defaultTransition } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";

const heroSlides = [
  { src: "/hero-campus.png", alt: "GBT College main campus building" },
  { src: "/gallery/campus-entrance.png", alt: "GBT College campus entrance" },
  { src: "/gallery/campus-building.png", alt: "GBT College campus lawn and building" },
  { src: "/gallery/campus-view.png", alt: "GBT College campus grounds" },
];

const SLIDE_MS = 5500;

export default function HomeHero() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, SLIDE_MS);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-brand-black text-white">
      {/* Sliding background images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={heroSlides[active].src}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[active].src}
            alt={heroSlides[active].alt}
            fill
            priority={active === 0}
            className="object-cover object-center brightness-110"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/75 via-brand-black/45 to-brand-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-brand-black/20" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_80%_50%,#e8751a_0%,transparent_55%)]" />
      </div>

      {/* Slide controls */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 sm:left-6"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 sm:right-6"
      >
        ›
      </button>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 lg:py-32">
        <MotionStagger animateOnMount className="max-w-2xl">
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
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-8 bg-brand-orange" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
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
