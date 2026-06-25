"use client";

import { useState } from "react";
import Link from "next/link";
import {
  admissionCourseTabs,
  admissionProcessSteps,
  admissionDocuments,
} from "@/lib/site-data";
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
  const wrap = "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10";
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
  return <span className={wrap}>{icons[type]}</span>;
}

export default function AdmissionsContent() {
  const [activeTab, setActiveTab] = useState(admissionCourseTabs[0].id);
  const activeCourse = admissionCourseTabs.find((t) => t.id === activeTab) ?? admissionCourseTabs[0];

  return (
    <>
      {/* Eligibility */}
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-eyebrow text-brand-orange">Eligibility Criteria</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-brand-black sm:text-4xl">
                Who Should <span className="text-brand-orange">Apply?</span>
              </h2>

              <div className="mt-8 flex flex-wrap gap-2">
                {admissionCourseTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                      activeTab === tab.id
                        ? "bg-brand-orange text-white shadow-md"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-brand-orange hover:text-brand-orange"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
                <ul className="space-y-5">
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

      {/* Application Process */}
      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-eyebrow text-brand-orange">How to Apply</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-brand-black sm:text-4xl">
                Application Process
              </h2>

              <div className="mt-10 space-y-6">
                {admissionProcessSteps.map((step) => (
                  <MotionDiv
                    key={step.step}
                    hover
                    shadow
                    className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
                  >
                    <StepIcon type={step.icon} />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                        {step.step}
                      </p>
                      <h3 className="mt-1 font-serif text-lg font-bold text-brand-black">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
                    </div>
                  </MotionDiv>
                ))}
              </div>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-brand-orange px-6 py-3 text-sm font-bold text-brand-orange transition hover:bg-brand-orange hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Brochure
              </Link>
            </div>
            <div className="hidden lg:block">
              <AdmissionPortalCard />
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Apply Form + Documents */}
      <MotionSection id="apply-form" className="section-padding scroll-mt-28 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-6 text-center sm:p-8">
            <p className="text-lg font-bold text-brand-maroon sm:text-xl">
              Last Date to Apply: <span className="text-brand-orange">31 July 2026</span>
            </p>
            <p className="mt-2 text-sm text-slate-600">Limited seats — apply early to secure your place</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <p className="text-eyebrow text-brand-orange">Documents</p>
              <h3 className="mt-2 font-serif text-2xl font-bold text-brand-maroon">Required Documents</h3>
              <ul className="mt-6 space-y-3">
                {admissionDocuments.map((doc) => (
                  <li key={doc} className="flex items-center gap-3 text-sm text-slate-700">
                    <span className="text-brand-green">✓</span> {doc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
              <p className="text-eyebrow text-brand-orange">Apply Online</p>
              <h3 className="mt-2 font-serif text-2xl font-bold text-brand-maroon">Start Your Application</h3>
              <form className="mt-6 space-y-4">
                {["Full Name", "Email Address", "Mobile Number"].map((ph, i) => (
                  <input
                    key={ph}
                    type={i === 1 ? "email" : i === 2 ? "tel" : "text"}
                    placeholder={ph}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
                  />
                ))}
                <select className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none">
                  <option>Select Course</option>
                  {admissionCourseTabs.map((tab) => (
                    <option key={tab.id}>{tab.label}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="w-full rounded-full bg-brand-orange py-3.5 font-bold text-white transition hover:bg-brand-orange-light"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </MotionSection>
    </>
  );
}
