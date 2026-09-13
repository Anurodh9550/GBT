import PageHero from "@/components/PageHero";
import AdmissionRegisterForm from "@/components/admissions/AdmissionRegisterForm";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Admission Registration" };

export default function AdmissionRegisterPage() {
  return (
    <>
      <PageHero
        title="Admission Registration"
        subtitle={`Online registration portal — Session ${siteConfig.admissionBatch}`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Admissions", href: "/admissions" },
          { label: "Register" },
        ]}
      />
      <section className="section-padding bg-slate-50">
        <div className="mx-auto max-w-3xl px-4">
          <AdmissionRegisterForm />
        </div>
      </section>
    </>
  );
}
