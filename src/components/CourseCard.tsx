import Link from "next/link";
import Image from "next/image";
import type { FeaturedCourse } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";

type CourseCardProps = {
  course: FeaturedCourse;
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article
      id={course.slug}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:border-slate-300 scroll-mt-28"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
        <Image
          src={course.posterImage}
          alt={course.title}
          fill
          className="object-cover object-center transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />

        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-2 bg-white/90 px-3 py-2 backdrop-blur-sm">
          <div className="flex min-w-0 items-center gap-2">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={32}
              height={32}
              className="shrink-0 rounded-full object-cover"
            />
            <span className="truncate text-[10px] font-semibold uppercase leading-tight text-slate-700 sm:text-[11px]">
              {siteConfig.name}
            </span>
          </div>
          <span className="shrink-0 rounded-full bg-brand-orange px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            {course.code}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="font-serif text-lg font-bold leading-snug text-white sm:text-xl">
            {course.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-slate-600 line-clamp-3">{course.desc}</p>

        <Link
          href={course.href ?? "/admissions"}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-green transition group-hover:text-brand-green-light"
        >
          View Program
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
