"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { MotionDiv } from "@/components/motion";
import { useUi } from "@/components/ui/UiProvider";
import { siteConfig } from "@/lib/site-config";
import { admissionCourseTabs } from "@/lib/site-data";
import {
  ADMISSION_BRANCHES,
  ADMISSION_CATEGORIES,
  ADMISSION_DOCUMENTS_CHECKLIST,
  ADMISSION_GENDERS,
  ADMISSION_STREAMS,
} from "@/lib/admission-form-data";

const STEPS = [
  "Course & Personal",
  "Contact & Address",
  "Academic Details",
  "Review & Submit",
] as const;

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange disabled:opacity-60";

const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const initialForm = {
  courseId: "",
  branch: "",
  firstName: "",
  middleName: "",
  lastName: "",
  fatherName: "",
  motherName: "",
  dob: "",
  gender: "",
  category: "",
  aadhaar: "",
  nationality: "Indian",
  phone: "",
  altPhone: "",
  email: "",
  permAddress: "",
  permCity: "",
  permState: "",
  permPin: "",
  sameAddress: true,
  corrAddress: "",
  corrCity: "",
  corrState: "",
  corrPin: "",
  tenthBoard: "",
  tenthYear: "",
  tenthRoll: "",
  tenthPercent: "",
  twelfthBoard: "",
  twelfthYear: "",
  twelfthRoll: "",
  twelfthPercent: "",
  twelfthStream: "",
  declaration: false,
};

export default function AdmissionRegisterForm() {
  const { toast, withProgress } = useUi();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState(initialForm);

  const branches = useMemo(
    () => (form.courseId ? ADMISSION_BRANCHES[form.courseId] ?? ["General", "Other"] : []),
    [form.courseId]
  );

  const courseLabel =
    admissionCourseTabs.find((c) => c.id === form.courseId)?.label ?? "";

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const val =
        e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
      setForm((f) => ({ ...f, [key]: val }));
    };

  const fullName = [form.firstName, form.middleName, form.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  const validateStep = (s: number): boolean => {
    if (s === 0) {
      if (!form.courseId || !form.branch) {
        toast("Select course and branch.", "error");
        return false;
      }
      if (!form.firstName.trim() || !form.lastName.trim()) {
        toast("Enter applicant name.", "error");
        return false;
      }
      if (!form.fatherName.trim() || !form.motherName.trim()) {
        toast("Enter father and mother name.", "error");
        return false;
      }
      if (!form.dob || !form.gender || !form.category) {
        toast("Complete personal details.", "error");
        return false;
      }
      return true;
    }
    if (s === 1) {
      if (form.phone.replace(/\D/g, "").length < 10 || !form.email.trim()) {
        toast("Enter valid phone and email.", "error");
        return false;
      }
      if (!form.permAddress.trim() || !form.permCity.trim() || !form.permPin.trim()) {
        toast("Complete permanent address.", "error");
        return false;
      }
      return true;
    }
    if (s === 2) {
      if (!form.tenthBoard || !form.tenthPercent || !form.twelfthBoard || !form.twelfthPercent) {
        toast("Enter 10th and 12th academic details.", "error");
        return false;
      }
      return true;
    }
    if (!form.declaration) {
      toast("Please accept the declaration.", "error");
      return false;
    }
    return true;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setLoading(true);
    try {
      await withProgress(async () => {
        const { api } = await import("@/lib/api");
        const message = [
          "=== GBCE Admission Registration ===",
          `Session: ${siteConfig.admissionBatch}`,
          `Course: ${courseLabel}`,
          `Branch: ${form.branch}`,
          "",
          "--- Personal ---",
          `Full Name: ${fullName}`,
          `Father: ${form.fatherName}`,
          `Mother: ${form.motherName}`,
          `DOB: ${form.dob}`,
          `Gender: ${form.gender}`,
          `Category: ${form.category}`,
          `Nationality: ${form.nationality}`,
          form.aadhaar ? `Aadhaar: ${form.aadhaar}` : null,
          "",
          "--- Address ---",
          `Permanent: ${form.permAddress}, ${form.permCity}, ${form.permState} - ${form.permPin}`,
          form.sameAddress
            ? "Correspondence: Same as permanent"
            : `Correspondence: ${form.corrAddress}, ${form.corrCity}, ${form.corrState} - ${form.corrPin}`,
          "",
          "--- Academic ---",
          `10th: ${form.tenthBoard}, ${form.tenthYear}, Roll ${form.tenthRoll}, ${form.tenthPercent}%`,
          `12th: ${form.twelfthBoard}, ${form.twelfthYear}, Roll ${form.twelfthRoll}, ${form.twelfthPercent}%, Stream ${form.twelfthStream || "—"}`,
          "",
          "Documents will be submitted physically at admission office.",
        ]
          .filter(Boolean)
          .join("\n");

        await api.submitAdmission({
          full_name: fullName,
          email: form.email.trim(),
          phone: `+91${form.phone.replace(/\D/g, "").slice(-10)}`,
          course: null,
          course_name: courseLabel,
          branch: form.branch,
          message,
          details: {
            session: siteConfig.admissionBatch,
            personal: {
              firstName: form.firstName.trim(),
              middleName: form.middleName.trim(),
              lastName: form.lastName.trim(),
              fatherName: form.fatherName.trim(),
              motherName: form.motherName.trim(),
              dob: form.dob,
              gender: form.gender,
              category: form.category,
              nationality: form.nationality,
              aadhaar: form.aadhaar.trim() || null,
            },
            contact: {
              phone: form.phone.replace(/\D/g, "").slice(-10),
              altPhone: form.altPhone.replace(/\D/g, "").slice(-10) || null,
              email: form.email.trim(),
            },
            address: {
              permanent: {
                address: form.permAddress.trim(),
                city: form.permCity.trim(),
                state: form.permState.trim(),
                pin: form.permPin.trim(),
              },
              correspondence: form.sameAddress
                ? { sameAsPermanent: true }
                : {
                    sameAsPermanent: false,
                    address: form.corrAddress.trim(),
                    city: form.corrCity.trim(),
                    state: form.corrState.trim(),
                    pin: form.corrPin.trim(),
                  },
            },
            academic: {
              tenth: {
                board: form.tenthBoard.trim(),
                year: form.tenthYear.trim(),
                roll: form.tenthRoll.trim(),
                percent: form.tenthPercent.trim(),
              },
              twelfth: {
                board: form.twelfthBoard.trim(),
                year: form.twelfthYear.trim(),
                roll: form.twelfthRoll.trim(),
                percent: form.twelfthPercent.trim(),
                stream: form.twelfthStream.trim() || null,
              },
            },
            courseId: form.courseId,
          },
        });
      });
      setDone(true);
      toast("Registration submitted successfully!", "success");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Submission failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <MotionDiv shadow className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
          ✓
        </div>
        <h2 className="mt-4 font-serif text-2xl font-bold text-brand-maroon">Registration Submitted</h2>
        <p className="mt-2 text-sm text-slate-600">
          Application ID received. Our admissions office will contact you at{" "}
          <strong>{form.email}</strong> for document verification and fee payment.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/admissions" className="btn-primary">
            Back to Admissions
          </Link>
          <a
            href={siteConfig.admissionFormPdf}
            download="GBCE-Admission-Form.pdf"
            className="rounded-full border-2 border-brand-orange px-5 py-2.5 text-sm font-bold text-brand-orange hover:bg-brand-orange hover:text-white"
          >
            Download PDF Copy
          </a>
        </div>
      </MotionDiv>
    );
  }

  return (
    <MotionDiv shadow className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-gradient-to-r from-brand-black via-brand-maroon-dark to-brand-maroon px-6 py-6 text-white sm:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
          {siteConfig.name}
        </p>
        <h2 className="mt-1 font-serif text-2xl font-bold">Admission Registration Portal</h2>
        <p className="mt-1 text-sm text-white/75">
          Affiliated to Bundelkhand University, Jhansi · Session {siteConfig.admissionBatch}
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3 sm:px-6">
        {STEPS.map((title, i) => (
          <span
            key={title}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              i === step
                ? "bg-brand-orange text-white"
                : i < step
                  ? "bg-brand-green/15 text-brand-green"
                  : "bg-white text-slate-400 ring-1 ring-slate-200"
            }`}
          >
            {i + 1}. {title}
          </span>
        ))}
      </div>

      <form className="space-y-6 p-6 sm:p-8" onSubmit={handleSubmit}>
        {step === 0 && (
          <>
            <p className="text-sm font-semibold text-brand-maroon">Section A — Course Applied For</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Course" required>
                <select
                  required
                  value={form.courseId}
                  onChange={(e) => setForm((f) => ({ ...f, courseId: e.target.value, branch: "" }))}
                  className={inputClass}
                >
                  <option value="">-Select Course-</option>
                  {admissionCourseTabs.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Branch / Specialization" required>
                <select
                  required
                  value={form.branch}
                  onChange={set("branch")}
                  disabled={!form.courseId}
                  className={inputClass}
                >
                  <option value="">-Select Branch-</option>
                  {branches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <p className="text-sm font-semibold text-brand-maroon">Section B — Personal Details</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="First Name" required>
                <input required value={form.firstName} onChange={set("firstName")} className={inputClass} />
              </Field>
              <Field label="Middle Name">
                <input value={form.middleName} onChange={set("middleName")} className={inputClass} />
              </Field>
              <Field label="Last Name" required>
                <input required value={form.lastName} onChange={set("lastName")} className={inputClass} />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Father's Name" required>
                <input required value={form.fatherName} onChange={set("fatherName")} className={inputClass} />
              </Field>
              <Field label="Mother's Name" required>
                <input required value={form.motherName} onChange={set("motherName")} className={inputClass} />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Date of Birth" required>
                <input required type="date" value={form.dob} onChange={set("dob")} className={inputClass} />
              </Field>
              <Field label="Gender" required>
                <select required value={form.gender} onChange={set("gender")} className={inputClass}>
                  <option value="">Select</option>
                  {ADMISSION_GENDERS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Category" required>
                <select required value={form.category} onChange={set("category")} className={inputClass}>
                  <option value="">Select</option>
                  {ADMISSION_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Nationality">
                <input value={form.nationality} onChange={set("nationality")} className={inputClass} />
              </Field>
            </div>
            <Field label="Aadhaar Number">
              <input
                value={form.aadhaar}
                onChange={(e) =>
                  setForm((f) => ({ ...f, aadhaar: e.target.value.replace(/\D/g, "").slice(0, 12) }))
                }
                placeholder="12-digit Aadhaar"
                className={inputClass}
              />
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <p className="text-sm font-semibold text-brand-maroon">Section C — Contact Details</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Mobile Number" required>
                <div className="flex overflow-hidden rounded-xl border border-slate-300 focus-within:border-brand-orange focus-within:ring-1 focus-within:ring-brand-orange">
                  <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-sm">+91</span>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))
                    }
                    className="w-full border-0 px-4 py-3 text-sm outline-none"
                  />
                </div>
              </Field>
              <Field label="Alternate Mobile">
                <input
                  type="tel"
                  value={form.altPhone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, altPhone: e.target.value.replace(/\D/g, "").slice(0, 10) }))
                  }
                  className={inputClass}
                />
              </Field>
            </div>
            <Field label="Email Address" required>
              <input required type="email" value={form.email} onChange={set("email")} className={inputClass} />
            </Field>

            <p className="text-sm font-semibold text-brand-maroon">Section D — Address</p>
            <Field label="Permanent Address" required>
              <textarea
                required
                rows={2}
                value={form.permAddress}
                onChange={set("permAddress")}
                className={inputClass}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="City" required>
                <input required value={form.permCity} onChange={set("permCity")} className={inputClass} />
              </Field>
              <Field label="State">
                <input value={form.permState} onChange={set("permState")} className={inputClass} />
              </Field>
              <Field label="PIN Code" required>
                <input
                  required
                  value={form.permPin}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, permPin: e.target.value.replace(/\D/g, "").slice(0, 6) }))
                  }
                  className={inputClass}
                />
              </Field>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.sameAddress}
                onChange={set("sameAddress")}
                className="rounded accent-brand-orange"
              />
              Correspondence address same as permanent
            </label>
            {!form.sameAddress && (
              <>
                <Field label="Correspondence Address">
                  <textarea rows={2} value={form.corrAddress} onChange={set("corrAddress")} className={inputClass} />
                </Field>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="City">
                    <input value={form.corrCity} onChange={set("corrCity")} className={inputClass} />
                  </Field>
                  <Field label="State">
                    <input value={form.corrState} onChange={set("corrState")} className={inputClass} />
                  </Field>
                  <Field label="PIN">
                    <input value={form.corrPin} onChange={set("corrPin")} className={inputClass} />
                  </Field>
                </div>
              </>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm font-semibold text-brand-maroon">Section E — Academic Qualifications</p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-orange">10th Standard</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Board / University" required>
                  <input required value={form.tenthBoard} onChange={set("tenthBoard")} className={inputClass} />
                </Field>
                <Field label="Year of Passing">
                  <input value={form.tenthYear} onChange={set("tenthYear")} className={inputClass} />
                </Field>
                <Field label="Roll Number">
                  <input value={form.tenthRoll} onChange={set("tenthRoll")} className={inputClass} />
                </Field>
                <Field label="Percentage / CGPA" required>
                  <input required value={form.tenthPercent} onChange={set("tenthPercent")} className={inputClass} />
                </Field>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-orange">12th Standard</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Board / University" required>
                  <input required value={form.twelfthBoard} onChange={set("twelfthBoard")} className={inputClass} />
                </Field>
                <Field label="Year of Passing">
                  <input value={form.twelfthYear} onChange={set("twelfthYear")} className={inputClass} />
                </Field>
                <Field label="Roll Number">
                  <input value={form.twelfthRoll} onChange={set("twelfthRoll")} className={inputClass} />
                </Field>
                <Field label="Percentage / CGPA" required>
                  <input required value={form.twelfthPercent} onChange={set("twelfthPercent")} className={inputClass} />
                </Field>
                <Field label="Stream">
                  <select value={form.twelfthStream} onChange={set("twelfthStream")} className={inputClass}>
                    <option value="">Select</option>
                    {ADMISSION_STREAMS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-800">Documents to bring</p>
              <ul className="mt-2 space-y-1 text-xs text-amber-900">
                {ADMISSION_DOCUMENTS_CHECKLIST.map((d) => (
                  <li key={d}>• {d}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-sm font-semibold text-brand-maroon">Review your application</p>
            <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p>
                <strong>Course:</strong> {courseLabel} — {form.branch}
              </p>
              <p>
                <strong>Name:</strong> {fullName}
              </p>
              <p>
                <strong>Parents:</strong> {form.fatherName} / {form.motherName}
              </p>
              <p>
                <strong>DOB:</strong> {form.dob} · <strong>Gender:</strong> {form.gender} ·{" "}
                <strong>Category:</strong> {form.category}
              </p>
              <p>
                <strong>Contact:</strong> +91{form.phone} · {form.email}
              </p>
              <p>
                <strong>Address:</strong> {form.permAddress}, {form.permCity} - {form.permPin}
              </p>
              <p>
                <strong>10th:</strong> {form.tenthBoard} ({form.tenthPercent}%) · <strong>12th:</strong>{" "}
                {form.twelfthBoard} ({form.twelfthPercent}%)
              </p>
            </div>
            <label className="flex gap-3 rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.declaration}
                onChange={set("declaration")}
                className="mt-1 accent-brand-orange"
                required
              />
              <span>
                I declare that the information provided is true and correct. I understand that admission is
                subject to verification of documents and eligibility as per Bundelkhand University norms.
              </span>
            </label>
          </>
        )}

        <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-6">
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              disabled={loading}
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-600 hover:border-brand-orange hover:text-brand-orange"
            >
              ← Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button type="button" onClick={next} className="btn-primary flex-1 justify-center sm:flex-none">
              Continue →
            </button>
          ) : (
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center sm:flex-none disabled:opacity-60">
              {loading ? "Submitting…" : "Submit Registration"}
            </button>
          )}
        </div>
      </form>
    </MotionDiv>
  );
}
