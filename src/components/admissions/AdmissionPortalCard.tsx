"use client";

import Link from "next/link";
import { MotionDiv } from "@/components/motion";
import { siteConfig } from "@/lib/site-config";

export default function AdmissionPortalCard() {
  return (
    <MotionDiv hover shadow className="rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-28">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10 text-2xl">
          🚀
        </span>
        <div>
          <h3 className="font-serif text-lg font-bold text-brand-black">Official Admission Portal</h3>
          <p className="mt-1 text-sm text-slate-500">Academic Session {siteConfig.admissionBatch}</p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-slate-600">
        For a streamlined admission experience, please complete your registration through our
        official portal. Our admissions team will review your application and contact you for
        the next steps.
      </p>
      <Link
        href="#apply-form"
        className="mt-6 block rounded-xl bg-brand-black p-5 text-white transition hover:bg-brand-maroon-dark"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
          Application Form
        </span>
        <span className="mt-1 flex items-center justify-between gap-2 font-serif text-xl font-bold">
          Proceed to Register
          <span aria-hidden="true">→</span>
        </span>
      </Link>
      <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2.5 text-xs leading-relaxed text-slate-500">
        <span className="font-semibold text-slate-600">Note:</span> Complete the form below or
        contact admissions at {siteConfig.email} for assistance.
      </p>
    </MotionDiv>
  );
}
