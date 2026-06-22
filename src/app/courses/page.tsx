import Link from "next/link";
import PageHero from "@/components/PageHero";
import CourseCard from "@/components/CourseCard";
import { MotionSection, MotionStagger, MotionCard } from "@/components/motion";
import { featuredCourses } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Courses" };

export default function CoursesPage() {
  return (
    <>
      <PageHero
        title="Our Courses"
        subtitle="Explore our diverse academic programs designed for career success"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Courses" }]}
      />
      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              At {siteConfig.trust}, we offer a diverse range of courses designed to cater to
              the academic and professional aspirations of our students.
            </p>
          </div>
          <MotionStagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <MotionCard key={course.code}>
                <CourseCard course={course} />
              </MotionCard>
            ))}
          </MotionStagger>
          <div className="mt-12 text-center">
            <Link href="/admissions" className="btn-primary">
              Apply for Admission →
            </Link>
          </div>
        </div>
      </MotionSection>
    </>
  );
}
