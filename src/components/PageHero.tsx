"use client";

import Link from "next/link";
import Image from "next/image";
import { MotionDiv, MotionStagger } from "@/components/motion";
import { defaultTransition } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";
import RegisterButton from "@/components/RegisterButton";

export type HeroVariant =
  | "editorial"
  | "photo"
  | "mosaic"
  | "maroon"
  | "stripe"
  | "centered"
  | "academic"
  | "split"
  | "career"
  | "journal"
  | "contact"
  | "portal"
  | "login"
  | "resource";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  title: string;
  subtitle?: string;
  breadcrumb?: Crumb[];
  variant?: HeroVariant;
  image?: string;
  imageAlt?: string;
  tone?: "orange" | "maroon" | "green" | "navy";
};

const TONE = {
  orange: "bg-brand-orange",
  maroon: "bg-brand-maroon",
  green: "bg-brand-green",
  navy: "bg-slate-800",
};

export default function PageHero(props: PageHeroProps) {
  const variant = props.variant ?? "editorial";
  if (variant === "photo") return <PhotoHero {...props} />;
  if (variant === "mosaic") return <MosaicHero {...props} />;
  if (variant === "maroon") return <MaroonHero {...props} />;
  if (variant === "stripe") return <StripeHero {...props} />;
  if (variant === "centered") return <CenteredHero {...props} />;
  if (variant === "academic") return <AcademicHero {...props} />;
  if (variant === "split") return <SplitHero {...props} />;
  if (variant === "career") return <CareerHero {...props} />;
  if (variant === "journal") return <JournalHero {...props} />;
  if (variant === "contact") return <ContactHero {...props} />;
  if (variant === "portal") return <PortalHero {...props} />;
  if (variant === "login") return <LoginHero {...props} />;
  if (variant === "resource") return <ResourceHero {...props} />;
  return <EditorialHero {...props} />;
}

function Breadcrumbs({
  items,
  light = false,
  center = false,
}: {
  items?: Crumb[];
  light?: boolean;
  center?: boolean;
}) {
  if (!items?.length) return null;
  return (
    <nav
      className={`mb-5 flex flex-wrap items-center gap-2 font-sans text-[13px] ${
        light ? "text-white/60" : "text-slate-500"
      } ${center ? "justify-center" : ""}`}
    >
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-2">
          {i > 0 && <span className={light ? "text-white/30" : "text-slate-300"}>/</span>}
          {item.href ? (
            <Link href={item.href} className={light ? "hover:text-brand-orange" : "hover:text-brand-orange"}>
              {item.label}
            </Link>
          ) : (
            <span className={light ? "font-medium text-brand-orange" : "font-medium text-brand-maroon"}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

function CounselingChip({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${
        light
          ? "border border-white/20 bg-white/10 text-brand-orange"
          : "border border-brand-orange/25 bg-white text-brand-orange"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
      Counseling started · {siteConfig.admissionBatch}
    </span>
  );
}

function HeroCtas({ light = false }: { light?: boolean }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <RegisterButton variant={light ? "outline-white" : "primary"} />
      <Link
        href={siteConfig.enquiryFormUrl}
        className={
          light
            ? "inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/20"
            : "inline-flex items-center gap-2 rounded-full border-2 border-brand-maroon px-5 py-2.5 text-sm font-bold text-brand-maroon transition hover:bg-brand-maroon hover:text-white"
        }
      >
        {siteConfig.enquiryCtaLabel} →
      </Link>
    </div>
  );
}

function EditorialHero({ title, subtitle, breadcrumb, image, imageAlt }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#f6f1ea]">
      <div className="relative mx-auto grid max-w-7xl lg:grid-cols-2">
        <MotionStagger animateOnMount className="order-2 flex flex-col justify-center px-4 py-12 sm:py-16 lg:order-1 lg:py-20 lg:pr-16">
          <Breadcrumbs items={breadcrumb} />
          <MotionDiv variant="fadeUp">
            <p className="text-eyebrow text-brand-green">Our Legacy</p>
          </MotionDiv>
          <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.08 }}>
            <h1 className="text-hero mt-3 max-w-xl text-4xl text-brand-maroon sm:text-5xl">{title}</h1>
            <div className="section-title-rule" aria-hidden />
          </MotionDiv>
          {subtitle && (
            <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.14 }}>
              <p className="text-body-lg mt-5 max-w-lg text-slate-600">{subtitle}</p>
            </MotionDiv>
          )}
        </MotionStagger>
        <MotionDiv variant="slideRight" animateOnMount className="relative order-1 min-h-[240px] lg:order-2 lg:min-h-[420px]">
          <Image
            src={image ?? "/gallery/campus-building.png"}
            alt={imageAlt ?? title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[center_28%]"
          />
        </MotionDiv>
      </div>
      <div className="header-accent-line" />
    </section>
  );
}

function PhotoHero({ title, subtitle, breadcrumb, image, imageAlt }: PageHeroProps) {
  return (
    <section className="relative min-h-[380px] overflow-hidden lg:min-h-[460px]">
      <Image
        src={image ?? "/gallery/campus-building.png"}
        alt={imageAlt ?? title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/85 via-brand-maroon-dark/55 to-transparent" />
      <MotionStagger animateOnMount className="relative mx-auto flex min-h-[380px] max-w-7xl flex-col justify-end px-4 py-12 lg:min-h-[460px] lg:py-16">
        <Breadcrumbs items={breadcrumb} light />
        <MotionDiv variant="fadeUp">
          <p className="text-eyebrow text-brand-orange">Student Life</p>
        </MotionDiv>
        <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.08 }}>
          <h1 className="text-hero mt-3 max-w-2xl text-4xl text-white sm:text-5xl lg:text-6xl">{title}</h1>
        </MotionDiv>
        {subtitle && (
          <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.14 }}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">{subtitle}</p>
          </MotionDiv>
        )}
      </MotionStagger>
    </section>
  );
}

function MosaicHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  const shots = [
    "/gallery/campus-building.png",
    "/gallery/campus-entrance.png",
    "/gallery/campus-gate.png",
  ];
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
        <MotionStagger animateOnMount>
          <Breadcrumbs items={breadcrumb} />
          <MotionDiv variant="fadeUp">
            <p className="text-eyebrow text-brand-orange">Photo Gallery</p>
          </MotionDiv>
          <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.08 }}>
            <h1 className="text-hero mt-3 text-4xl text-brand-maroon sm:text-5xl">{title}</h1>
            <div className="section-title-rule" aria-hidden />
          </MotionDiv>
          {subtitle && <p className="mt-5 max-w-md text-slate-600">{subtitle}</p>}
        </MotionStagger>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {shots.map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 aspect-[4/3]" : "aspect-square"}`}
            >
              <Image src={src} alt="" fill sizes="30vw" className="object-cover object-[center_28%]" priority={i === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MaroonHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-maroon-dark text-white">
      <div className="absolute -right-16 top-0 h-72 w-72 rounded-full bg-brand-orange/15 blur-3xl" />
      <MotionStagger animateOnMount className="relative mx-auto max-w-7xl px-4 py-14 lg:py-20">
        <Breadcrumbs items={breadcrumb} light />
        <MotionDiv variant="fadeUp">
          <CounselingChip light />
        </MotionDiv>
        <MotionDiv variant="fadeUp" transition={{ ...defaultTransition, delay: 0.08 }}>
          <h1 className="text-hero mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
        </MotionDiv>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75">{subtitle}</p>
        )}
        <HeroCtas light />
      </MotionStagger>
      <div className="header-accent-line" />
    </section>
  );
}

function StripeHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl">
        <div className="hidden w-2 bg-gradient-to-b from-brand-orange via-brand-maroon to-brand-green sm:block" />
        <MotionStagger animateOnMount className="flex-1 px-4 py-12 sm:px-8 lg:py-16">
          <Breadcrumbs items={breadcrumb} />
          <CounselingChip />
          <h1 className="text-hero mt-5 text-4xl text-slate-900 sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl text-slate-600">{subtitle}</p>}
          <HeroCtas />
        </MotionStagger>
      </div>
    </section>
  );
}

function CenteredHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="border-b border-orange-100 bg-gradient-to-b from-orange-50/80 to-white">
      <MotionStagger animateOnMount className="mx-auto max-w-3xl px-4 py-14 text-center lg:py-20">
        <Breadcrumbs items={breadcrumb} center />
        <div className="flex justify-center">
          <CounselingChip />
        </div>
        <h1 className="text-hero mt-6 text-4xl text-brand-maroon sm:text-5xl">{title}</h1>
        <div className="section-title-rule-center section-title-rule mx-auto" aria-hidden />
        {subtitle && <p className="mx-auto mt-5 max-w-xl text-slate-600">{subtitle}</p>}
        <div className="flex justify-center">
          <HeroCtas />
        </div>
      </MotionStagger>
    </section>
  );
}

function AcademicHero({ title, subtitle, breadcrumb, image, imageAlt }: PageHeroProps) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl">
        <div className="w-1.5 bg-brand-green sm:w-2" />
        <div className="grid flex-1 items-center gap-8 px-4 py-12 sm:px-8 lg:grid-cols-[1fr_280px] lg:py-16">
          <MotionStagger animateOnMount>
            <Breadcrumbs items={breadcrumb} />
            <p className="text-eyebrow text-brand-green">Academics</p>
            <h1 className="text-hero mt-3 text-4xl text-brand-maroon sm:text-5xl">{title}</h1>
            {subtitle && <p className="mt-4 max-w-xl text-slate-600">{subtitle}</p>}
          </MotionStagger>
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl shadow-md lg:block">
            <Image
              src={image ?? "/gallery/campus-building.png"}
              alt={imageAlt ?? title}
              fill
              sizes="280px"
              className="object-cover object-[center_28%]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SplitHero({ title, subtitle, breadcrumb, image, imageAlt }: PageHeroProps) {
  return (
    <section className="overflow-hidden border-b border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <MotionDiv variant="slideRight" animateOnMount className="relative min-h-[220px] lg:min-h-[380px]">
          <Image
            src={image ?? "/gallery/campus-entrance.png"}
            alt={imageAlt ?? title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[center_30%]"
          />
        </MotionDiv>
        <MotionStagger animateOnMount className="flex flex-col justify-center px-4 py-12 sm:px-10 lg:py-16">
          <Breadcrumbs items={breadcrumb} />
          <p className="text-eyebrow text-brand-orange">Departments</p>
          <h1 className="text-hero mt-3 text-4xl text-brand-maroon sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 max-w-md text-slate-600">{subtitle}</p>}
        </MotionStagger>
      </div>
    </section>
  );
}

function CareerHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#16351a] text-white">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_right,rgba(232,117,26,0.22),transparent_60%)]" />
      <MotionStagger animateOnMount className="relative mx-auto max-w-7xl px-4 py-14 lg:py-20">
        <Breadcrumbs items={breadcrumb} light />
        <p className="text-eyebrow text-brand-orange">Healthcare Careers</p>
        <h1 className="text-hero mt-4 max-w-3xl text-4xl sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-white/75">{subtitle}</p>}
        <Link href="/courses" className="btn-outline-white mt-8 inline-flex">
          View Courses →
        </Link>
      </MotionStagger>
    </section>
  );
}

function JournalHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
      <p className="pointer-events-none absolute -right-4 top-4 select-none font-serif text-[7rem] font-bold leading-none text-slate-200/80 sm:text-[10rem]">
        NEWS
      </p>
      <MotionStagger animateOnMount className="relative mx-auto max-w-7xl px-4 py-14 lg:py-20">
        <Breadcrumbs items={breadcrumb} />
        <p className="text-eyebrow text-brand-maroon">Campus Updates</p>
        <h1 className="text-hero mt-3 max-w-2xl text-4xl text-slate-900 sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-xl text-slate-600">{subtitle}</p>}
      </MotionStagger>
    </section>
  );
}

function ContactHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="border-b border-slate-200 bg-[#eef4ef]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-2 lg:items-center lg:py-16">
        <MotionStagger animateOnMount>
          <Breadcrumbs items={breadcrumb} />
          <p className="text-eyebrow text-brand-green">Get in Touch</p>
          <h1 className="text-hero mt-3 text-4xl text-brand-maroon sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 text-slate-600">{subtitle}</p>}
        </MotionStagger>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <p className="text-sm leading-relaxed text-slate-600">{siteConfig.address}</p>
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="mt-3 block font-semibold text-brand-maroon">
            {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="mt-1 block text-sm text-brand-orange">
            {siteConfig.email}
          </a>
        </div>
      </div>
    </section>
  );
}

function PortalHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="bg-slate-900 text-white">
      <MotionStagger animateOnMount className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <Breadcrumbs items={breadcrumb} light />
        <h1 className="text-hero mt-2 text-4xl sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-slate-300">{subtitle}</p>}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/student-login" className="btn-primary">
            Student Login →
          </Link>
          <Link href="/faculty-login" className="btn-outline-white">
            Faculty Login →
          </Link>
        </div>
      </MotionStagger>
    </section>
  );
}

function LoginHero({ title, subtitle, breadcrumb, tone = "orange" }: PageHeroProps) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className={`h-1 ${TONE[tone]}`} />
      <MotionStagger animateOnMount className="mx-auto max-w-7xl px-4 py-10 lg:py-12">
        <Breadcrumbs items={breadcrumb} />
        <h1 className="text-hero text-3xl text-slate-900 sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-xl text-sm text-slate-600 sm:text-base">{subtitle}</p>}
      </MotionStagger>
    </section>
  );
}

function ResourceHero({ title, subtitle, breadcrumb, tone = "navy" }: PageHeroProps) {
  return (
    <section className="bg-slate-900 text-white">
      <div className={`h-1 ${TONE[tone]}`} />
      <MotionStagger animateOnMount className="mx-auto max-w-7xl px-4 py-10 lg:py-12">
        <Breadcrumbs items={breadcrumb} light />
        <h1 className="text-hero text-3xl sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">{subtitle}</p>}
      </MotionStagger>
    </section>
  );
}
