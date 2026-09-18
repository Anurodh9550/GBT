import Link from "next/link";
import Image from "next/image";
import { MotionSection, MotionDiv } from "@/components/motion";
import { siteConfig } from "@/lib/site-config";
import { aboutContent } from "@/lib/site-data";

export default function HomeAbout() {
  return (
    <MotionSection className="section-padding bg-[#f7f2ea]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-14">
        <MotionDiv variant="slideLeft" className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-md">
          <Image
            src="/gallery/campus-gate-wide.png"
            alt={`${siteConfig.name} campus gate`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-maroon">
            Est. {siteConfig.established}
          </div>
        </MotionDiv>
        <MotionDiv variant="fadeUp">
          <p className="text-eyebrow text-brand-orange">About Our College</p>
          <h2 className="text-hero mt-3 text-3xl text-brand-maroon sm:text-4xl">{siteConfig.name}</h2>
          <div className="section-title-rule" aria-hidden />
          <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
            {aboutContent.intro.paragraphs[0]}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/about-trust" className="btn-maroon">
              About the College →
            </Link>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="text-sm font-semibold text-brand-maroon hover:text-brand-orange"
            >
              {siteConfig.phone}
            </a>
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
