import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import GalleryGrid from "@/components/GalleryGrid";
import { MotionSection, MotionStagger, MotionCard } from "@/components/motion";
import { newsItems } from "@/lib/site-data";

export const metadata = { title: "Campus Life" };

export default function CampusLifePage() {
  return (
    <>
      <PageHero
        title="Campus Life"
        subtitle="Sprawling green lawns, modern architecture, and a vibrant community — experience GBT College like never before."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Campus Life" }]}
      />
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Gallery"
            title="Our Beautiful Campus"
            align="center"
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
            <Image
              src="/gallery/campus-collage.png"
              alt="GBT College campus collage"
              width={1280}
              height={720}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
          <div className="mt-10">
            <GalleryGrid />
          </div>
        </div>
      </MotionSection>
      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Events" title="News & Events" />
            <Link href="/news-events" className="text-btn text-brand-orange hover:text-brand-orange-light">
              View All →
            </Link>
          </div>
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-3">
            {newsItems.map((item) => (
              <MotionCard key={item.title}>
              <Link
                href={item.href}
                className="card-hover block rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold text-brand-orange">
                  {item.tag}
                </span>
                <p className="mt-3 text-xs text-neutral-400">{item.date}</p>
                <h3 className="mt-2 font-serif font-bold text-brand-maroon">{item.title}</h3>
              </Link>
              </MotionCard>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>
    </>
  );
}
