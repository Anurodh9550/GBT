"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MotionDiv, MotionStagger } from "@/components/motion";
import { defaultTransition } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";

const campusSlides = [
  {
    src: "/hero/campus-block.png",
    alt: "Main academic block at Gautam Buddha College of Education",
    label: "Academic Block",
  },
  {
    src: "/hero/campus-lawn.png",
    alt: "Campus lawn and walkway at GBCE",
    label: "Campus Lawn",
  },
  {
    src: "/hero/campus-gate.png",
    alt: "Campus entrance gate at Village Nagara, Jalaun",
    label: "Campus Gate",
  },
  {
    src: "/hero/classroom.png",
    alt: "Students in a classroom discussion",
    label: "Classroom",
  },
];

const sideShots = [
  {
    src: "/hero/dental-clinic.png",
    alt: "Dental clinic training at the college",
    label: "Dental Clinic",
  },
  {
    src: "/hero/pharmacy-lab.png",
    alt: "Pharmacy practical laboratory",
    label: "Pharmacy Lab",
  },
];

const facts = [
  { value: siteConfig.established, label: "Established" },
  { value: "25+", label: "Years" },
  { value: "8+", label: "Programmes" },
];

export default function HomeHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = campusSlides.length;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, index, total]);

  const goTo = (next: number) => setIndex((next + total) % total);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-14 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-14">
          <MotionStagger animateOnMount>
            <MotionDiv variant="fadeUp">
              <p className="text-eyebrow text-brand-orange">
                Counseling started · {siteConfig.admissionBatch}
              </p>
            </MotionDiv>

            <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.08 }}>
              <h1 className="text-hero mt-4 text-4xl text-brand-maroon sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
                Admissions Open
                <span className="mt-1 block text-brand-orange">{siteConfig.admissionBatch}</span>
              </h1>
              <p className="mt-4 text-base text-slate-500">{siteConfig.name}</p>
              <p className="mt-1 text-sm text-slate-400">Village Nagara, Jalaun</p>
            </MotionDiv>

            <MotionDiv
              variant="fadeUp"
              transition={{ ...defaultTransition, delay: 0.16 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link href={siteConfig.enquiryFormUrl} className="btn-primary">
                {siteConfig.enquiryCtaLabel} →
              </Link>
              <Link href={siteConfig.admissionRegisterUrl} className="btn-outline-maroon">
                Register →
              </Link>
            </MotionDiv>

            <MotionDiv
              variant="fadeUp"
              transition={{ ...defaultTransition, delay: 0.22 }}
              className="mt-10 flex gap-10"
            >
              {facts.map((fact) => (
                <div key={fact.label}>
                  <p className="font-serif text-2xl font-bold text-brand-maroon sm:text-3xl">{fact.value}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {fact.label}
                  </p>
                </div>
              ))}
            </MotionDiv>
          </MotionStagger>

          <MotionDiv variant="slideRight" animateOnMount>
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-stretch">
              <div
                className="relative"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-slate-100 shadow-[0_28px_60px_-32px_rgba(15,23,42,0.42)]">
                  {campusSlides.map((item, i) => (
                    <div
                      key={item.src}
                      className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                        i === index ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden={i !== index}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        priority={i === 0}
                        sizes="(max-width: 1024px) 100vw, 46vw"
                        className="object-cover object-center"
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={() => goTo(index - 1)}
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-brand-maroon shadow-md hover:bg-white"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={() => goTo(index + 1)}
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-brand-maroon shadow-md hover:bg-white"
                  >
                    ›
                  </button>

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 py-3">
                    <p className="text-sm font-medium text-white drop-shadow">{campusSlides[index].label}</p>
                    <div className="flex items-center gap-1.5">
                      {campusSlides.map((item, i) => (
                        <button
                          key={item.src}
                          type="button"
                          aria-label={`Show ${item.label}`}
                          aria-current={i === index}
                          onClick={() => goTo(i)}
                          className={`h-1.5 rounded-full transition-all ${
                            i === index ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:grid-rows-2">
                {sideShots.map((shot) => (
                  <div
                    key={shot.src}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 shadow-[0_16px_36px_-24px_rgba(15,23,42,0.4)] lg:aspect-auto lg:h-full lg:min-h-0"
                  >
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 12rem"
                      className="object-cover object-center"
                    />
                    <span className="absolute bottom-2 left-2 text-[11px] font-medium text-white drop-shadow">
                      {shot.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
      <div className="header-accent-line" />
    </section>
  );
}
