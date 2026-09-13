"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { MotionSection, MotionDiv } from "@/components/motion";
import { useUi } from "@/components/ui/UiProvider";
import { siteConfig } from "@/lib/site-config";
import { admissionCourseTabs } from "@/lib/site-data";
import RegisterButton from "@/components/RegisterButton";

const STREAMS = ["PCM", "Commerce", "Other"] as const;
const GENDERS = ["Male", "Female"] as const;

/** Branches shown after a course is selected */
const BRANCHES_BY_COURSE: Record<string, string[]> = {
  bds: ["General Dentistry", "Oral Surgery", "Orthodontics", "Other"],
  "d-pharma": ["Pharmacy (General)", "Other"],
  bcom: ["General", "Honours", "Other"],
  bba: ["General Management", "Marketing", "Finance", "Other"],
  bsc: ["PCM", "PCB", "Other"],
  mba: ["Finance", "Marketing", "HR", "Operations", "Other"],
  ma: ["English", "History", "Political Science", "Other"],
  paramedical: [
    "X-Ray / Radiology Technician",
    "DMLT (Lab Technician)",
    "OT Technician",
    "ECG Technician",
    "Dialysis Technician",
    "Other",
  ],
  veterinary: [
    "Veterinary Assistant",
    "Animal Husbandry",
    "Livestock Care",
    "Poultry Management",
    "Other",
  ],
};

const DEFAULT_BRANCHES = ["General", "Other"];

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange disabled:opacity-60";

const selectClass = `${inputClass} cursor-pointer`;

export default function EnquiryFormPage() {
  const { toast, withProgress } = useUi();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "" as "" | (typeof GENDERS)[number],
    phone: "",
    email: "",
    stream: "" as "" | (typeof STREAMS)[number],
    percentage12: "",
    courseId: "",
    branch: "",
  });

  const branches = useMemo(
    () => (form.courseId ? BRANCHES_BY_COURSE[form.courseId] ?? DEFAULT_BRANCHES : []),
    [form.courseId]
  );

  const selectedCourseLabel =
    admissionCourseTabs.find((c) => c.id === form.courseId)?.label ?? "";

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((f) => ({ ...f, courseId: e.target.value, branch: "" }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) {
      toast("Please enter first and last name.", "error");
      return;
    }
    if (!form.gender) {
      toast("Please select gender.", "error");
      return;
    }
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) {
      toast("Please enter a valid phone number.", "error");
      return;
    }
    if (!form.email.trim()) {
      toast("Please enter email address.", "error");
      return;
    }
    if (!form.percentage12.trim()) {
      toast("Please enter 12th percentage.", "error");
      return;
    }
    const pct = Number(form.percentage12);
    if (Number.isNaN(pct) || pct < 0 || pct > 100) {
      toast("12th percentage must be between 0 and 100.", "error");
      return;
    }
    if (!form.courseId) {
      toast("Please select a course.", "error");
      return;
    }
    if (!form.branch) {
      toast("Please select a branch.", "error");
      return;
    }

    setLoading(true);
    try {
      await withProgress(async () => {
        const { api } = await import("@/lib/api");
        const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`;
        await api.submitContact({
          name: fullName,
          email: form.email.trim(),
          phone: `+91${form.phone.replace(/\D/g, "").slice(-10)}`,
          department: selectedCourseLabel || "College Enquiry",
          message: [
            "College Enquiry Form",
            `Name: ${fullName}`,
            `Gender: ${form.gender}`,
            form.stream ? `Stream: ${form.stream}` : null,
            `12th Percentage: ${form.percentage12}%`,
            `Course: ${selectedCourseLabel}`,
            `Branch: ${form.branch}`,
          ]
            .filter(Boolean)
            .join("\n"),
        });
      });
      setDone(true);
      toast("Enquiry submitted successfully!", "success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not submit enquiry.";
      toast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDone(false);
    setForm({
      firstName: "",
      lastName: "",
      gender: "",
      phone: "",
      email: "",
      stream: "",
      percentage12: "",
      courseId: "",
      branch: "",
    });
  };

  return (
    <>
      <PageHero
        title="College Enquiry Form"
        subtitle="Fill this form and our admissions team will contact you"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Enquiry Form" },
        ]}
      />
      <MotionSection className="section-padding bg-slate-50">
        <div className="mx-auto max-w-xl px-4">
          <div className="mb-6 flex flex-col items-center justify-center gap-3 rounded-2xl border border-brand-orange/25 bg-brand-orange/5 p-4 text-center sm:flex-row sm:p-5">
            <p className="text-sm text-slate-600">
              Ready to apply? Complete your admission registration.
            </p>
            <RegisterButton variant="outline" className="shrink-0" />
          </div>
          <MotionDiv shadow className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-100 bg-gradient-to-r from-brand-maroon to-brand-orange px-6 py-5 text-white sm:px-8">
              <h2 className="font-serif text-xl font-bold sm:text-2xl">College Enquiry Form</h2>
              <p className="mt-1 text-sm text-white/80">
                Session {siteConfig.admissionBatch} · Required fields marked *
              </p>
            </div>

            {done ? (
              <div className="space-y-4 p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
                  ✓
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-maroon">Thank you!</h3>
                <p className="text-sm text-slate-600">
                  Your enquiry has been received. Our team will contact you soon.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-orange hover:text-brand-orange"
                  >
                    Submit another
                  </button>
                  <Link href="/admissions" className="btn-primary">
                    View Admissions
                  </Link>
                </div>
              </div>
            ) : (
              <form className="space-y-5 p-6 sm:p-8" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Name of the Applicant <span className="text-red-500">*</span>
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      required
                      type="text"
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={set("firstName")}
                      disabled={loading}
                      className={inputClass}
                    />
                    <input
                      required
                      type="text"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={set("lastName")}
                      disabled={loading}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {GENDERS.map((g) => (
                      <label
                        key={g}
                        className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                          form.gender === g
                            ? "border-brand-orange bg-brand-orange/10 text-brand-maroon"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={form.gender === g}
                          onChange={set("gender")}
                          disabled={loading}
                          className="accent-brand-orange"
                          required
                        />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex overflow-hidden rounded-xl border border-slate-300 focus-within:border-brand-orange focus-within:ring-1 focus-within:ring-brand-orange">
                    <span className="flex shrink-0 items-center gap-1.5 border-r border-slate-200 bg-slate-50 px-3 text-sm text-slate-600">
                      <span aria-hidden="true">🇮🇳</span> +91
                    </span>
                    <input
                      required
                      type="tel"
                      inputMode="numeric"
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                        }))
                      }
                      disabled={loading}
                      className="w-full border-0 bg-white px-4 py-3 text-sm outline-none disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={set("email")}
                    disabled={loading}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Stream</label>
                  <div className="flex flex-wrap gap-3">
                    {STREAMS.map((s) => (
                      <label
                        key={s}
                        className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                          form.stream === s
                            ? "border-brand-orange bg-brand-orange/10 text-brand-maroon"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="stream"
                          value={s}
                          checked={form.stream === s}
                          onChange={set("stream")}
                          disabled={loading}
                          className="accent-brand-orange"
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    12th Percentage <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    min={0}
                    max={100}
                    step={0.01}
                    placeholder="e.g. 78.5"
                    value={form.percentage12}
                    onChange={set("percentage12")}
                    disabled={loading}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Courses <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={form.courseId}
                    onChange={handleCourseChange}
                    disabled={loading}
                    className={selectClass}
                  >
                    <option value="">-Select-</option>
                    {admissionCourseTabs.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Branch <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={form.branch}
                    onChange={set("branch")}
                    disabled={loading || !form.courseId}
                    className={selectClass}
                  >
                    <option value="">-Select-</option>
                    {branches.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  {!form.courseId && (
                    <p className="mt-1.5 text-xs text-slate-400">Select a course first to choose branch</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center disabled:opacity-60"
                >
                  {loading ? "Submitting…" : "Submit"}
                </button>

                <p className="text-center text-xs text-slate-400">
                  Or{" "}
                  <a
                    href={siteConfig.admissionFormPdf}
                    download="GBCE-Admission-Form.pdf"
                    className="font-medium text-brand-orange hover:underline"
                  >
                    download admission form (PDF)
                  </a>
                </p>
              </form>
            )}
          </MotionDiv>
        </div>
      </MotionSection>
    </>
  );
}
