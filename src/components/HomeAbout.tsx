import Link from "next/link";
import Image from "next/image";
import { MotionSection, MotionDiv } from "@/components/motion";
import { siteConfig } from "@/lib/site-config";
import { aboutContent } from "@/lib/site-data";

const aboutShots = [
  {
    src: "/courses/bba.jpg",
    alt: "Admission counseling and student discussion at the college",
    label: "Admission Counseling",
  },
  {
    src: "/courses/mba.jpg",
    alt: "Management classroom at the college",
    label: "Management Studies",
  },
  {
    src: "/courses/d-pharma.jpg",
    alt: "D-Pharma students in a college laboratory",
    label: "D-Pharma",
  },
];

const streams = ["BDS", "D-Pharma", "Paramedical", "Veterinary", "B.Com", "BBA / MBA"];

export default function HomeAbout() {
  return (
    <MotionSection className="relative overflow-hidden bg-[#f7f2ea]">
      <div className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-brand-maroon/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-brand-orange/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <MotionDiv variant="slideLeft" className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl bg-slate-200 shadow-md">
              <Image
                src={aboutShots[0].src}
                alt={aboutShots[0].alt}
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-maroon">
                {aboutShots[0].label}
              </span>
            </div>
            {aboutShots.slice(1).map((shot) => (
              <div key={shot.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 shadow-sm">
                <Image src={shot.src} alt={shot.alt} fill sizes="50vw" className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-2 left-2 text-[11px] font-medium text-white">{shot.label}</span>
              </div>
            ))}
          </div>

          <div className="relative hidden min-h-[400px] sm:block lg:min-h-[440px]">
            <div className="absolute -right-1 -top-1 hidden h-[86%] w-[78%] rounded-[1.75rem] border-2 border-brand-orange/30 lg:block" aria-hidden />
            <div className="absolute inset-y-0 right-0 w-[78%] overflow-hidden rounded-[1.75rem] bg-slate-200 shadow-[0_24px_50px_-24px_rgba(92,46,46,0.4)]">
              <Image
                src={aboutShots[0].src}
                alt={aboutShots[0].alt}
                fill
                sizes="(max-width: 1024px) 70vw, 42vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/45 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-maroon">
                {aboutShots[0].label}
              </span>
            </div>
            <div className="absolute bottom-3 left-0 z-10 w-[44%] overflow-hidden rounded-2xl border-[6px] border-[#f7f2ea] bg-slate-200 shadow-xl">
              <div className="relative aspect-[5/4]">
                <Image
                  src={aboutShots[1].src}
                  alt={aboutShots[1].alt}
                  fill
                  sizes="28vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="absolute right-5 top-5 z-10 w-[30%] overflow-hidden rounded-2xl border-[5px] border-white bg-slate-200 shadow-lg">
              <div className="relative aspect-square">
                <Image
                  src={aboutShots[2].src}
                  alt={aboutShots[2].alt}
                  fill
                  sizes="22vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </MotionDiv>

        <MotionDiv variant="fadeUp">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/25 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
            Counseling started · {siteConfig.admissionBatch}
          </span>
          <p className="text-eyebrow mt-5 text-brand-orange">About Our College</p>
          <h2 className="text-hero mt-3 max-w-xl text-3xl text-brand-maroon sm:text-4xl">
            Healthcare and professional education in Jalaun
          </h2>
          <div className="section-title-rule" aria-hidden />
          <p className="mt-3 text-sm font-medium text-slate-500">{siteConfig.name}</p>
          <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
            {aboutContent.intro.paragraphs[0]}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Admissions are open for Session {siteConfig.admissionBatch}. Join counseling for BDS, D-Pharma,
            paramedical, veterinary, commerce and management programmes.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {streams.map((stream) => (
              <span
                key={stream}
                className="rounded-full border border-brand-maroon/10 bg-white px-3 py-1 text-[11px] font-semibold text-brand-maroon"
              >
                {stream}
              </span>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-brand-maroon/10 bg-white p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">
              Session {siteConfig.admissionBatch}
            </p>
            <p className="mt-2 font-serif text-xl font-bold text-brand-maroon">Register for admission</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={siteConfig.admissionRegisterUrl} className="btn-primary">
                Register →
              </Link>
              <Link href="/about-trust" className="btn-outline-maroon">
                About the College →
              </Link>
            </div>
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
