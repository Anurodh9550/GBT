"use client";

import Link from "next/link";
import { MotionDiv } from "@/components/motion";
import { siteConfig } from "@/lib/site-config";

export default function AdmissionPortalCard() {
  return (
    <MotionDiv hover shadow id="official-portal" className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-28">
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
        official portal. Download the form to see what documents and details are required.
      </p>
      <Link
        href={siteConfig.admissionRegisterUrl}
        className="mt-6 block rounded-xl bg-brand-black p-5 text-white transition hover:bg-brand-maroon-dark"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
          Application Form
        </span>
        <span className="mt-1 flex items-center justify-between gap-2 font-serif text-xl font-bold">
          Register Now for Admission
          <span aria-hidden="true">→</span>
        </span>
      </Link>
      <a
        href={siteConfig.admissionFormPdf}
        download="GBCE-Admission-Form.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-orange bg-brand-orange/5 px-4 py-3.5 text-sm font-bold text-brand-orange transition hover:bg-brand-orange hover:text-white"
      >
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Form — What&apos;s Required (PDF)
      </a>
      <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2.5 text-xs leading-relaxed text-slate-500">
        <span className="font-semibold text-slate-600">Note:</span> Fill the PDF form or apply online
        below. Help: {siteConfig.email}
      </p>
    </MotionDiv>
  );
}
