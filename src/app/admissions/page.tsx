import PageHero from "@/components/PageHero";
import AdmissionsContent from "@/components/admissions/AdmissionsContent";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Admissions" };

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        title="Admissions"
        subtitle={`Applications open for Academic Session ${siteConfig.admissionBatch}`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Admissions" }]}
      />
      <AdmissionsContent />
    </>
  );
}
