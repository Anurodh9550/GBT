import Link from "next/link";
import { MotionSection, MotionStagger, MotionCard } from "@/components/motion";
import CourseCard from "@/components/CourseCard";
import SectionHeading from "@/components/SectionHeading";
import { featuredCourses } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";

type OurCoursesSectionProps = {
  limit?: number;
};

export default function OurCoursesSection({ limit }: OurCoursesSectionProps) {
  const courses = limit ? featuredCourses.slice(0, limit) : featuredCourses;

  return (
    <MotionSection className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Academic Programs"
            title="Our Courses"
            subtitle={`Professional programmes at ${siteConfig.name} — healthcare, commerce and management.`}
          />
          <Link href="/courses" className="btn-outline-maroon">
            All Courses →
          </Link>
        </div>

        <MotionStagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <MotionCard key={course.code}>
              <CourseCard course={course} />
            </MotionCard>
          ))}
        </MotionStagger>
      </div>
    </MotionSection>
  );
}
