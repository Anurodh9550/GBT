import PageHero from "@/components/PageHero";
import AdmissionsContent from "@/components/admissions/AdmissionsContent";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Admissions" };

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        title="Admissions"
        subtitle={`Counseling has started for Academic Session ${siteConfig.admissionBatch}. Visit campus or enquire online to complete admission.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Admissions" }]}
      />
      <AdmissionsContent />
    </>
  );
}
