import Link from "next/link";
import Image from "next/image";
import { MotionSection, MotionDiv } from "@/components/motion";
import { aboutContent } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";

type BlockProps = {
  index: number;
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  tagline?: string;
  image: string;
  badge: string;
  reverse?: boolean;
  readMoreHref?: string;
  showPhone?: boolean;
  variant?: "default" | "official";
};

function AboutBlock({
  index,
  eyebrow,
  title,
  paragraphs,
  tagline,
  image,
  badge,
  reverse = false,
  readMoreHref = "/about-trust",
  showPhone = true,
  variant = "default",
}: BlockProps) {
  const isOfficial = variant === "official";
  const sectionNo = String(index + 1).padStart(2, "0");

  if (!isOfficial) {
    return (
      <MotionDiv
        hover
        shadow
        variant={reverse ? "slideRight" : "slideLeft"}
        className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
      >
        <div className={`relative ${reverse ? "lg:order-2" : ""}`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 right-4 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-brand-maroon shadow-md">
              {badge}
            </div>
          </div>
        </div>

        <div className={reverse ? "lg:order-1" : ""}>
          {eyebrow && <p className="text-sm font-semibold text-brand-black">{eyebrow}</p>}
          <h3 className="mt-2 font-serif text-3xl font-bold leading-tight text-brand-maroon sm:text-4xl">
            {title}
          </h3>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            {paragraphs.map((text) => (
              <p key={text.slice(0, 40)}>{text}</p>
            ))}
          </div>
          {tagline && <p className="mt-5 text-sm font-bold text-brand-black">{tagline}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href={readMoreHref}
              className="inline-flex rounded-md bg-brand-green px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-green/90"
            >
              Read More
            </Link>
            {showPhone && (
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-black hover:text-brand-orange"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">📞</span>
                {siteConfig.phone}
              </a>
            )}
          </div>
        </div>
      </MotionDiv>
    );
  }

  return (
    <MotionDiv
      hover
      shadow
      delay={index * 0.08}
      variant={reverse ? "slideRight" : "slideLeft"}
      className="about-block-official rounded-2xl border border-slate-200/80 bg-white"
    >
      <div className="about-block-accent" aria-hidden />
      <div className="grid items-stretch lg:grid-cols-2">
        <div className={`relative min-h-[200px] lg:min-h-[300px] ${reverse ? "lg:order-2" : ""}`}>
          <div className="about-image-frame absolute inset-3 sm:inset-4 lg:inset-5">
            <div className="relative h-full overflow-hidden rounded-xl">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <span className="inline-flex rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-maroon shadow-sm">
                  {badge}
                </span>
                <p className="mt-2 font-serif text-lg font-bold text-white sm:text-xl">
                  Est. {siteConfig.established}
                </p>
              </div>
            </div>
          </div>
          <span
            className={`about-corner-mark ${reverse ? "about-corner-mark--right" : "about-corner-mark--left"}`}
            aria-hidden
          />
        </div>

        <div
          className={`flex flex-col justify-center px-5 py-7 sm:px-8 sm:py-9 lg:px-10 ${
            reverse ? "lg:order-1" : ""
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="about-section-number">{sectionNo}</span>
            <div className="about-title-rule flex-1" aria-hidden />
          </div>

          {eyebrow && <p className="mt-4 text-eyebrow text-brand-orange">{eyebrow}</p>}

          <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-brand-maroon sm:text-3xl">
            {title}
          </h3>

          <div className="about-title-underline" aria-hidden />

          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
            {paragraphs.map((text) => (
              <p key={text.slice(0, 40)}>{text}</p>
            ))}
          </div>

          {tagline && (
            <blockquote className="about-tagline mt-4 border-l-4 border-brand-green pl-4 font-serif text-sm italic text-brand-maroon/90">
              {tagline}
            </blockquote>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {["NAAC Accredited", "Industry Aligned", "Holistic Learning"].map((chip) => (
              <span key={chip} className="about-trust-chip">
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-5">
            <Link href={readMoreHref} className="about-btn-primary">
              Read More
              <span aria-hidden>→</span>
            </Link>
            {showPhone && (
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="about-btn-secondary"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-maroon/8 text-brand-maroon">
                  📞
                </span>
                {siteConfig.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}

type AboutSectionsProps = {
  showIntro?: boolean;
  showMission?: boolean;
  showVision?: boolean;
  className?: string;
  variant?: "default" | "official";
};

export default function AboutSections({
  showIntro = true,
  showMission = true,
  showVision = true,
  className,
  variant = "default",
}: AboutSectionsProps) {
  const isOfficial = variant === "official";

  const blocks = [
    showIntro && { ...aboutContent.intro, reverse: false },
    showMission && { ...aboutContent.mission, reverse: true },
    showVision && { ...aboutContent.vision, reverse: false },
  ].filter(Boolean) as (Omit<BlockProps, "index" | "variant"> & { reverse: boolean })[];

  const sectionClass = className ?? (isOfficial ? "about-section-official" : "bg-slate-50");

  return (
    <MotionSection className={`py-14 lg:py-16 ${sectionClass}`}>
      <div className="mx-auto max-w-7xl px-4">
        {isOfficial && (
          <MotionDiv shadow variant="fadeUp" className="mx-auto mb-8 max-w-3xl text-center lg:mb-10">
            <p className="text-eyebrow text-brand-orange">About Our Institution</p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-brand-maroon sm:text-4xl lg:text-[2.75rem]">
              Discover <span className="text-brand-green">Gautam Buddha College</span>
            </h2>
            <p className="text-body-lg mt-5 text-slate-600">
              A legacy of excellence under {siteConfig.trust} — shaping ethical leaders and
              skilled professionals since {siteConfig.established}.
            </p>
            <div className="about-header-ornament mx-auto mt-5" aria-hidden />
          </MotionDiv>
        )}

        <div className={`${isOfficial ? "space-y-6 lg:space-y-8" : "space-y-20 sm:space-y-24"}`}>
          {blocks.map((block, i) => (
            <AboutBlock
              key={block.title}
              {...block}
              index={i}
              showPhone={i === 0}
              variant={variant}
            />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
