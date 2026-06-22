import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import DepartmentIcon from "@/components/DepartmentIcon";
import CTABanner from "@/components/CTABanner";
import { MotionSection, MotionStagger, MotionItem } from "@/components/motion";
import { departments, getDepartment } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dept = getDepartment(slug);
  return { title: dept?.name ?? "Department" };
}

export default async function DepartmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const dept = getDepartment(slug);
  if (!dept) notFound();

  return (
    <>
      <PageHero
        title={dept.name}
        subtitle={dept.desc}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Departments", href: "/departments" },
          { label: dept.name },
        ]}
      />
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-3xl px-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-orange/10">
              <DepartmentIcon id={dept.icon} className="h-8 w-8" />
            </div>
            <div>
              <p className="text-eyebrow text-brand-orange">Department</p>
              <h2 className="font-serif text-2xl font-bold text-brand-maroon">{dept.name}</h2>
              <p className="mt-1 text-sm font-medium text-neutral-500">{dept.duration}</p>
            </div>
          </div>
          <p className="text-body-lg mt-8 text-neutral-600">{dept.desc}</p>
          <MotionStagger className="mt-8 space-y-3">
            {[
              "Industry-aligned curriculum",
              "Experienced faculty & mentors",
              "Modern labs and practical training",
              "Placement and internship support",
            ].map((point) => (
              <MotionItem key={point} className="flex items-center gap-3 text-neutral-700">
                <span className="text-brand-green">✓</span> {point}
              </MotionItem>
            ))}
          </MotionStagger>
          <Link
            href="/admissions"
            className="text-btn mt-10 inline-flex rounded-full bg-brand-orange px-8 py-3.5 text-white hover:bg-brand-orange-light"
          >
            Apply for {dept.name.split(" ")[0]} Program →
          </Link>
        </div>
      </MotionSection>
      <CTABanner
        title="Ready to Join This Department?"
        subtitle={`Admissions open for ${dept.duration}. Secure your seat today.`}
      />
    </>
  );
}
