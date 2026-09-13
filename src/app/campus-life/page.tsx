import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";
import { MotionSection, MotionStagger, MotionCard, MotionDiv } from "@/components/motion";
import { campusHighlights } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Campus Life" };

const campusPhotos = [
  {
    src: "/gallery/campus-building.png",
    alt: "Main academic block and lawn at Gautam Buddha College of Education",
    title: "Main Academic Block",
    caption: "Palm-lined lawns and teaching blocks",
  },
  {
    src: "/gallery/campus-entrance.png",
    alt: "Campus entrance gate of Gautam Buddha College of Education",
    title: "Campus Entrance",
    caption: "Welcome to the college grounds",
  },
] as const;

const facilities = [
  {
    title: "Green Open Campus",
    desc: "Wide lawns, palm trees, and paved walkways make everyday college life calm, clean, and open.",
    icon: "campus" as const,
  },
  {
    title: "Academic Blocks",
    desc: "Bright classrooms and lecture spaces for dental, pharmacy, commerce, and management programmes.",
    icon: "class" as const,
  },
  {
    title: "Library & Study",
    desc: "Quiet reading rooms and learning resources that support coursework, clinics, and exam preparation.",
    icon: "book" as const,
  },
  {
    title: "Sports & Recreation",
    desc: "Outdoor grounds and student sports for cricket, football, and inter-college meets through the year.",
    icon: "sport" as const,
  },
  {
    title: "Labs & Clinics",
    desc: "Hands-on labs and clinical spaces for BDS, D-Pharma, paramedical, and veterinary training.",
    icon: "lab" as const,
  },
  {
    title: "Events & Culture",
    desc: "Annual day, convocation, workshops, and student festivals that keep the campus lively beyond class.",
    icon: "event" as const,
  },
];

const studentLife = [
  { title: "Sports Club", desc: "Cricket, football, and fitness for every batch." },
  { title: "Cultural Society", desc: "Music, dance, and annual-day performances." },
  { title: "Academic Forums", desc: "Seminars, exhibitions, and skill workshops." },
  { title: "Student Council", desc: "Leadership, mentoring, and campus activities." },
];

function LifeIcon({
  name,
  className,
}: {
  name: (typeof facilities)[number]["icon"];
  className?: string;
}) {
  const cn = className ?? "h-6 w-6";
  const icons: Record<(typeof facilities)[number]["icon"], ReactNode> = {
    campus: (
      <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"
        />
      </svg>
    ),
    class: (
      <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 19h16M6 19V7h12v12M9 11h6M9 14h4"
        />
      </svg>
    ),
    book: (
      <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 5.5A2.5 2.5 0 016.5 3H20v16H6.5A2.5 2.5 0 004 16.5v-11zM8 7h8M8 11h6"
        />
      </svg>
    ),
    sport: (
      <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 0c2.5 2.4 4 5.6 4 9s-1.5 6.6-4 9m0-18c-2.5 2.4-4 5.6-4 9s1.5 6.6 4 9M3.5 9h17M3.5 15h17"
        />
      </svg>
    ),
    lab: (
      <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 3v7.2L4.8 18a2.4 2.4 0 002.1 3.6h10.2a2.4 2.4 0 002.1-3.6L15 10.2V3M8 3h8"
        />
      </svg>
    ),
    event: (
      <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3M4 11h16M6 5h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z"
        />
      </svg>
    ),
  };

  return icons[name];
}

function CampusPhoto({
  src,
  alt,
  title,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  title: string;
  caption?: string;
  className?: string;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-slate-200 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover object-[center_28%] transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="font-serif text-lg font-bold text-white sm:text-xl">{title}</p>
        {caption ? <p className="mt-1 text-sm text-white/80">{caption}</p> : null}
      </div>
    </div>
  );
}

export default function CampusLifePage() {
  const featured = campusPhotos[0];
  const gatePhoto = campusPhotos[1];

  return (
    <>
      <PageHero
        title="Campus Life"
        subtitle="Green lawns, a close-knit student community, and a campus built for learning — this is everyday life at Gautam Buddha College of Education."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Campus Life" }]}
      />

      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-eyebrow text-brand-orange">Life On Campus</p>
              <h2 className="mt-4 font-serif text-3xl font-bold text-brand-maroon sm:text-4xl">
                A calm, green place to learn and grow
              </h2>
              <div className="section-title-rule" aria-hidden />
              <p className="text-body-lg mt-5 text-slate-600">
                {siteConfig.name} sits on open grounds with landscaped lawns, tree cover, and
                simple, well-kept academic blocks. Students spend the day between classes, clinics,
                and campus events — not in a crowded city block, but in a campus that feels like a
                college should.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                From the main gate to the academic lawn, the campus is designed for study,
                friendship, and the extra-curricular life that shapes every batch.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/gallery" className="btn-maroon">
                  View Photo Gallery →
                </Link>
                <Link href="/contact" className="btn-outline-maroon">
                  Visit Campus
                </Link>
              </div>
            </div>
            <MotionDiv hover shadow className="overflow-hidden rounded-2xl">
              <CampusPhoto
                src={featured.src}
                alt={featured.alt}
                title={featured.title}
                caption={featured.caption}
                className="aspect-[4/3] min-h-[280px]"
              />
            </MotionDiv>
          </div>
        </div>
      </MotionSection>

      <section className="bg-brand-maroon-dark py-12 text-white lg:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <MotionStagger className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {campusHighlights.map((item) => (
              <MotionCard key={item.label} className="text-center" hover={false} shadow={false}>
                <p className="font-serif text-3xl font-bold text-brand-orange sm:text-4xl">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-white/80">{item.label}</p>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </section>

      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Facilities"
            title="Everything you need on campus"
            subtitle="Spaces for class, clinics, sport, and student life — built around a green, walkable campus."
            align="center"
          />
          <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((item) => (
              <MotionCard key={item.title}>
                <div className="card-surface h-full p-7">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                    <LifeIcon name={item.icon} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-maroon">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="relative overflow-hidden">
        <div className="relative min-h-[420px] lg:min-h-[520px]">
          <Image
            src={gatePhoto.src}
            alt={gatePhoto.alt}
            fill
            sizes="100vw"
            className="object-cover object-[center_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-brand-black/55 to-brand-black/25" />
          <div className="relative mx-auto flex min-h-[420px] max-w-7xl flex-col justify-end px-4 py-16 lg:min-h-[520px] lg:py-20">
            <p className="text-eyebrow text-brand-orange">Campus Views</p>
            <h2 className="mt-4 max-w-xl font-serif text-3xl font-bold text-white sm:text-4xl">
              Walk in through the main gate
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/80">
              Trees, lawns, and the academic block sit just beyond the college entrance — a quiet
              campus built for study and student life.
            </p>
            <div className="mt-8">
              <Link href="/gallery" className="btn-outline-white">
                Open Photo Gallery →
              </Link>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Student Life"
            title="Clubs, sport, and campus culture"
            subtitle="Learning at GBCE is more than lectures — students lead clubs, play sport, and run the events that define each year."
            align="center"
          />
          <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {studentLife.map((item, index) => (
              <MotionCard key={item.title}>
                <div className="card-surface h-full p-6">
                  <p className="text-eyebrow text-brand-orange">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-serif text-lg font-bold text-brand-maroon">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              </MotionCard>
            ))}
          </MotionStagger>
          <div className="mt-12 text-center">
            <Link href="/news-events" className="btn-outline-maroon">
              See News & Events →
            </Link>
          </div>
        </div>
      </MotionSection>

      <CTABanner
        title="Come see the campus for yourself"
        subtitle="Walk the lawns, meet the faculty, and find the programme that fits you. Admissions are open for the new session."
        secondaryLabel="Contact Office"
        secondaryHref="/contact"
      />
    </>
  );
}
