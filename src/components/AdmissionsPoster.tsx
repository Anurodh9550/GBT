import Link from "next/link";
import Image from "next/image";
import { MotionDiv } from "@/components/motion";
import { siteConfig } from "@/lib/site-config";

export default function AdmissionsPoster() {
  return (
    <MotionDiv hover shadow className="w-full max-w-md lg:max-w-none lg:justify-self-end">
      <Link
        href="/admissions"
        className="group relative block overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5 transition hover:shadow-[0_24px_48px_-12px_rgba(92,46,46,0.35)]"
      >
        <div className="relative aspect-[16/11] sm:aspect-[16/10]">
          <Image
            src="/gallery/campus-building.png"
            alt={`${siteConfig.name} campus`}
            fill
            className="object-cover object-center transition duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-maroon/90 via-brand-maroon-dark/85 to-brand-black/80" />
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-orange/20 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-brand-green/15 blur-2xl" />

          <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.trust}
                width={44}
                height={44}
                className="rounded-full object-cover ring-2 ring-white/20"
              />
              <div>
                <p className="font-serif text-sm font-bold leading-tight text-white">{siteConfig.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/60">Est. {siteConfig.established}</p>
              </div>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
              <div className="space-y-2">
                <span className="inline-block rounded-full bg-brand-orange px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                  Admissions Open
                </span>
                <h3 className="font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">
                  Session <span className="text-brand-orange">{siteConfig.admissionBatch}</span>
                </h3>
                <ul className="space-y-0.5 text-[11px] text-white/80 sm:text-xs">
                  <li>• B.Tech · BCA · B.Com · MBA</li>
                  <li>• M.Tech · M.A · Diploma Programs</li>
                </ul>
              </div>
              <div className="space-y-2 sm:text-right">
                <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm sm:inline-block">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">Last Date</p>
                  <p className="font-serif text-lg font-bold text-white">31 July 2026</p>
                </div>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white transition group-hover:text-brand-orange sm:justify-end">
                  Apply Now →
                </span>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-brand-orange via-brand-orange-light to-brand-green" />
        </div>
      </Link>
    </MotionDiv>
  );
}
