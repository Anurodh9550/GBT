import PageHero from "@/components/PageHero";
import AdmissionsContent from "@/components/admissions/AdmissionsContent";
import CTABanner from "@/components/CTABanner";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Admissions" };

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        variant="admission"
        title="Admissions 2026–27"
        subtitle={`Counseling has started for Academic Session ${siteConfig.admissionBatch}. Register online, enquire, or visit campus to complete admission.`}
        image="/courses/bds.jpg"
        imageAlt="BDS dental simulation lab at Gautam Buddha College of Education"
        images={["/courses/bds.jpg", "/courses/d-pharma.jpg", "/courses/bba.jpg"]}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Admissions" }]}
      />
      <AdmissionsContent />
      <CTABanner
        title="Secure your seat this session"
        subtitle={`Counseling is open for ${siteConfig.admissionBatch}. Register now or talk to the admissions desk.`}
        primaryLabel="Register Now for Admission →"
        primaryHref={siteConfig.admissionRegisterUrl}
        secondaryLabel="Enquire Now"
        secondaryHref={siteConfig.enquiryFormUrl}
      />
    </>
  );
}
