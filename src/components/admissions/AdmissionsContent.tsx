"use client";

import { useState } from "react";
import Link from "next/link";
import {
  admissionCourseTabs,
  admissionProcessSteps,
  admissionDocuments,
} from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";
import AdmissionPortalCard from "@/components/admissions/AdmissionPortalCard";
import { MotionSection, MotionDiv } from "@/components/motion";

function CriterionIcon({ type }: { type: "document" | "medal" | "check" }) {
  const cn = "h-5 w-5 text-brand-orange";
  if (type === "medal") {
    return (
      <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    );
  }
  if (type === "check") {
    return (
      <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  return (
    <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function StepIcon({ type }: { type: "form" | "counsel" | "docs" | "payment" }) {
  const cn = "h-5 w-5 text-brand-orange";
  const icons = {
    form: (
      <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    counsel: (
      <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    docs: (
      <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    payment: (
      <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  };
  return icons[type];
}

export default function AdmissionsContent() {
  const [activeTab, setActiveTab] = useState(admissionCourseTabs[0].id);
  const activeCourse = admissionCourseTabs.find((t) => t.id === activeTab) ?? admissionCourseTabs[0];

  return (
    <>
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-eyebrow text-brand-orange">Eligibility Criteria</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-brand-maroon sm:text-4xl">
                Who Should Apply?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                Choose a programme to see the academic requirements for session {siteConfig.admissionBatch}.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {admissionCourseTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeTab === tab.id
                        ? "bg-brand-orange text-white shadow-md"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-brand-orange hover:text-brand-orange"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
                <p className="text-sm font-bold text-brand-maroon">{activeCourse.label}</p>
                <ul className="mt-5 space-y-5">
                  {activeCourse.criteria.map((item) => (
                    <li key={item.text} className="flex gap-4">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                        <CriterionIcon type={item.icon} />
                      </span>
                      <p className="pt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                        {item.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <AdmissionPortalCard />
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-eyebrow text-brand-orange">How to Apply</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-brand-maroon sm:text-4xl">
            Application Process
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            Four steps from registration to seat confirmation — counseling is already open on campus.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {admissionProcessSteps.map((step) => (
              <MotionDiv
                key={step.step}
                hover
                shadow
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange/10">
                    <StepIcon type={step.icon} />
                  </span>
                  <span className="font-serif text-2xl font-bold text-brand-maroon/15">{step.step}</span>
                </div>
                <h3 className="mt-5 font-serif text-lg font-bold text-brand-maroon">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="apply-form" className="section-padding scroll-mt-28 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 sm:p-8">
              <p className="text-eyebrow text-brand-orange">Documents</p>
              <h3 className="mt-2 font-serif text-2xl font-bold text-brand-maroon">Required Documents</h3>
              <ul className="mt-6 space-y-3">
                {admissionDocuments.map((doc) => (
                  <li key={doc} className="flex items-center gap-3 text-sm text-slate-700">
                    <span className="text-brand-green">✓</span> {doc}
                  </li>
                ))}
              </ul>
              <a
                href={siteConfig.admissionFormPdf}
                download="GBCE-Admission-Form.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-maroon hover:text-brand-orange"
              >
                Download full form (PDF) →
              </a>
            </div>

            <div className="rounded-2xl bg-brand-maroon p-7 text-white sm:p-8">
              <p className="text-eyebrow text-brand-orange">Apply Now</p>
              <h3 className="mt-2 font-serif text-2xl font-bold">Last date: 31 July 2026</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Limited seats. Register online, then complete counseling and document verification at campus.
              </p>
              <Link href={siteConfig.admissionRegisterUrl} className="btn-primary mt-6">
                {siteConfig.ctaRegisterLabel} →
              </Link>
              <div className="mt-6 space-y-2 border-t border-white/15 pt-5 text-sm">
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="block font-semibold text-white hover:text-brand-orange">
                  {siteConfig.phone}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="block text-white/70 hover:text-white">
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>
    </>
  );
}
