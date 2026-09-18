"use client";

import Link from "next/link";
import { MotionDiv } from "@/components/motion";
import { siteConfig } from "@/lib/site-config";

export default function AdmissionPortalCard() {
  return (
    <MotionDiv
      hover
      shadow
      id="official-portal"
      className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-28"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">
        Session {siteConfig.admissionBatch}
      </p>
      <h3 className="mt-2 font-serif text-xl font-bold text-brand-maroon">Official Admission Portal</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Complete registration online, then visit campus for counseling and document verification.
      </p>

      <Link
        href={siteConfig.admissionRegisterUrl}
        className="mt-6 block rounded-xl bg-brand-maroon p-5 text-white transition hover:bg-brand-maroon-dark"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
          Application Form
        </span>
        <span className="mt-1 flex items-center justify-between gap-2 font-serif text-lg font-bold">
          Register Now
          <span aria-hidden="true">→</span>
        </span>
      </Link>

      <Link
        href={siteConfig.enquiryFormUrl}
        className="mt-3 flex w-full items-center justify-center rounded-xl border-2 border-brand-maroon px-4 py-3 text-sm font-bold text-brand-maroon transition hover:bg-brand-maroon hover:text-white"
      >
        {siteConfig.enquiryCtaLabel}
      </Link>

      <a
        href={siteConfig.admissionFormPdf}
        download="GBCE-Admission-Form.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-orange hover:text-brand-orange"
      >
        Download Form (PDF)
      </a>

      <a
        href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
        className="mt-4 block rounded-lg bg-slate-50 px-3 py-2.5 text-xs leading-relaxed text-slate-500"
      >
        Help desk: <span className="font-semibold text-brand-maroon">{siteConfig.phone}</span>
      </a>
    </MotionDiv>
  );
}
