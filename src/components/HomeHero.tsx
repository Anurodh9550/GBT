"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MotionDiv, MotionStagger } from "@/components/motion";
import { defaultTransition } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";

const medicalSlides = [
  {
    src: "/hero/dental-clinic.png",
    alt: "BDS students training in the dental simulation clinic",
    label: "BDS Dental Clinic",
  },
  {
    src: "/hero/pharmacy-lab.png",
    alt: "Pharmacy students in a practical laboratory",
    label: "Pharmacy Lab",
  },
  {
    src: "/hero/classroom.png",
    alt: "Students in a classroom discussion",
    label: "Classroom",
  },
  {
    src: "/courses/bds.jpg",
    alt: "Dental practical training on simulation units",
    label: "Dental Practical",
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
  const total = medicalSlides.length;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, total]);

  const goTo = (next: number) => setIndex((next + total) % total);

  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-gradient-to-r from-brand-maroon-dark to-brand-maroon px-4 py-14 text-white sm:px-10 lg:px-14 lg:py-16">
          <MotionStagger animateOnMount className="mx-auto w-full max-w-xl lg:mx-0">
            <MotionDiv variant="fadeUp">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                Counseling started · {siteConfig.admissionBatch}
              </p>
            </MotionDiv>

            <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.08 }}>
              <h1 className="text-hero mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
                Admissions Open
                <span className="mt-1 block text-brand-orange">{siteConfig.admissionBatch}</span>
              </h1>
              <p className="mt-4 text-base text-white/80">{siteConfig.name}</p>
              <p className="mt-1 text-sm text-white/55">
                BDS · D-Pharma · Paramedical · Veterinary · B.Com · BBA · MBA
              </p>
            </MotionDiv>

            <MotionDiv
              variant="fadeUp"
              transition={{ ...defaultTransition, delay: 0.16 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link href={siteConfig.enquiryFormUrl} className="btn-primary">
                {siteConfig.enquiryCtaLabel} →
              </Link>
              <Link href={siteConfig.admissionRegisterUrl} className="btn-outline-white">
                Register →
              </Link>
            </MotionDiv>

            <MotionDiv
              variant="fadeUp"
              transition={{ ...defaultTransition, delay: 0.22 }}
              className="mt-10 flex gap-8 sm:gap-12"
            >
              {facts.map((fact) => (
                <div key={fact.label}>
                  <p className="font-serif text-2xl font-bold sm:text-3xl">{fact.value}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    {fact.label}
                  </p>
                </div>
              ))}
            </MotionDiv>
          </MotionStagger>
        </div>

        <div
          className="relative min-h-[22rem] bg-slate-200 sm:min-h-[28rem] lg:min-h-[36rem]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {medicalSlides.map((item, i) => (
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
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => goTo(index - 1)}
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-brand-maroon shadow-md hover:bg-white"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => goTo(index + 1)}
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-brand-maroon shadow-md hover:bg-white"
          >
            ›
          </button>

          <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
            <div className="flex items-end justify-between gap-3">
              <p className="text-sm font-semibold text-white">{medicalSlides[index].label}</p>
              <div className="flex items-center gap-1.5">
                {medicalSlides.map((item, i) => (
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
            <div className="mt-3 hidden grid-cols-4 gap-2 sm:grid">
              {medicalSlides.map((shot, i) => (
                <button
                  key={shot.src}
                  type="button"
                  aria-label={`Show ${shot.label}`}
                  onClick={() => goTo(i)}
                  className={`relative aspect-[16/10] overflow-hidden rounded-lg ring-2 transition ${
                    i === index ? "ring-brand-orange" : "ring-white/30 hover:ring-white/70"
                  }`}
                >
                  <Image src={shot.src} alt="" fill sizes="120px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="header-accent-line" />
    </section>
  );
}
