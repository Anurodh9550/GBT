import { MotionSection, MotionStagger, MotionCard } from "@/components/motion";
import CourseCard from "@/components/CourseCard";
import SectionHeading from "@/components/SectionHeading";
import { featuredCourses } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";

export default function OurCoursesSection() {
  return (
    <MotionSection className="section-padding bg-slate-50">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Academic Programs"
          title="Our Courses"
          subtitle={`At ${siteConfig.trust}, we offer a diverse range of courses designed to cater to the academic and professional aspirations of our students.`}
          align="center"
        />

        <MotionStagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <MotionCard key={course.code}>
              <CourseCard course={course} />
            </MotionCard>
          ))}
        </MotionStagger>
      </div>
    </MotionSection>
  );
}
