"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useUi } from "@/components/ui/UiProvider";
import { MotionCard, MotionStagger } from "@/components/motion";
import { careerOpenings, generalApplicationId, type CareerCategory } from "@/lib/careers";
import { siteConfig } from "@/lib/site-config";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange disabled:opacity-60";

const filters = ["All", "Teaching", "Non-teaching"] as const;

const experienceOptions = [
  "Fresher",
  "1–2 years",
  "3–5 years",
  "6–10 years",
  "More than 10 years",
];

export default function CareerWorkspace() {
  const { toast, withProgress } = useUi();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [roleId, setRoleId] = useState(generalApplicationId);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    experience: experienceOptions[1],
    resumeUrl: "",
    message: "",
  });

  const visible = useMemo(
    () => (filter === "All" ? careerOpenings : careerOpenings.filter((job) => job.category === filter)),
    [filter]
  );

  const selected = careerOpenings.find((job) => job.id === roleId);

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((current) => ({ ...current, [key]: e.target.value }));

  const chooseRole = (id: string) => {
    setRoleId(id);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast("Please enter your full name.", "error");
      return;
    }
    if (!form.email.trim()) {
      toast("Please enter your email.", "error");
      return;
    }
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) {
      toast("Please enter a valid 10-digit mobile number.", "error");
      return;
    }
    if (!form.qualification.trim()) {
      toast("Please enter your highest qualification.", "error");
      return;
    }

    const position = selected?.title ?? "General application";
    const lines = [
      `Career application — ${position}`,
      selected ? `Department: ${selected.department}` : "Department: Open / not listed",
      `Qualification: ${form.qualification.trim()}`,
      `Experience: ${form.experience}`,
      form.resumeUrl.trim() ? `CV link: ${form.resumeUrl.trim()}` : "CV link: not provided",
      "",
      form.message.trim() || "No additional note.",
    ];

    setLoading(true);
    try {
      await withProgress(async () => {
        const { api } = await import("@/lib/api");
        await api.submitContact({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: `+91${form.phone.replace(/\D/g, "").slice(-10)}`,
          department: "Careers",
          message: lines.join("\n"),
        });
      });
      setDone(true);
      toast("Application received. The office will review it.", "success");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Could not submit the application.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-eyebrow text-brand-orange">Openings</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-maroon sm:text-4xl">
              Current vacancies
            </h2>
            <div className="section-title-rule" aria-hidden />
            <p className="mt-4 max-w-2xl text-slate-600">
              Teaching and non-teaching posts for session {siteConfig.admissionBatch}. Selection is by
              the college committee. Posts stay open until filled.
            </p>
          </div>
          <p className="text-sm font-semibold text-brand-maroon">
            {visible.length} {visible.length === 1 ? "post" : "posts"}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter openings">
          {filters.map((item) => {
            const active = filter === item;
            const count =
              item === "All"
                ? careerOpenings.length
                : careerOpenings.filter((job) => job.category === (item as CareerCategory)).length;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-brand-maroon text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-brand-orange/40 hover:text-brand-maroon"
                }`}
              >
                {item}
                <span className={`ml-2 text-xs ${active ? "text-white/70" : "text-slate-400"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <MotionStagger className="mt-8 grid gap-5 lg:grid-cols-2">
          {visible.map((job) => {
            const active = roleId === job.id;
            return (
              <MotionCard key={job.id}>
                <article
                  className={`card-surface flex h-full flex-col p-6 sm:p-7 ${
                    active ? "ring-2 ring-brand-orange" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-brand-maroon/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-maroon">
                      {job.category}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-bold text-brand-maroon">{job.title}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-orange">{job.department}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{job.summary}</p>
                  <dl className="mt-5 space-y-3 text-sm">
                    <div>
                      <dt className="font-semibold text-slate-800">Qualification</dt>
                      <dd className="mt-0.5 leading-relaxed text-slate-600">{job.qualification}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-800">Experience</dt>
                      <dd className="mt-0.5 leading-relaxed text-slate-600">{job.experience}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-800">Location</dt>
                      <dd className="mt-0.5 text-slate-600">Campus, Jalaun, Uttar Pradesh</dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={() => chooseRole(job.id)}
                    className="btn-primary mt-6 w-fit"
                  >
                    {active ? "Selected — complete the form" : "Apply for this post"}
                  </button>
                </article>
              </MotionCard>
            );
          })}
        </MotionStagger>
      </div>

      <div id="apply" className="mt-16 scroll-mt-28 lg:mt-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-eyebrow text-brand-orange">Application</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-maroon sm:text-4xl">
              Apply to {siteConfig.shortName}
            </h2>
            <div className="section-title-rule" aria-hidden />
            <p className="mt-4 text-slate-600">
              Send your details to the college office. Shortlisted candidates are called for an
              interview or a demonstration class.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                <span className="font-semibold text-slate-800">Email a CV as well. </span>
                Write to{" "}
                <a href={`mailto:${siteConfig.email}`} className="font-semibold text-brand-orange hover:underline">
                  {siteConfig.email}
                </a>{" "}
                with the post name in the subject.
              </li>
              <li className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                <span className="font-semibold text-slate-800">Students looking for jobs after study </span>
                should use the{" "}
                <Link href="/placements" className="font-semibold text-brand-orange hover:underline">
                  placements page
                </Link>
                . This form is for people who want to work at the college.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {done ? (
              <div className="rounded-2xl border border-brand-green/20 bg-brand-green/5 p-8 text-center">
                <p className="font-serif text-2xl font-bold text-brand-maroon">Application received</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Thank you, {form.name.split(" ")[0]}. The {siteConfig.shortName} office will review
                  your application for {selected?.title ?? "a general post"} and contact you at {form.email}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setDone(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      qualification: "",
                      experience: experienceOptions[1],
                      resumeUrl: "",
                      message: "",
                    });
                    setRoleId(generalApplicationId);
                  }}
                  className="btn-outline-maroon mt-6"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="career-role" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Position
                  </label>
                  <select
                    id="career-role"
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                    disabled={loading}
                  >
                    <option value={generalApplicationId}>General application — post not listed</option>
                    {careerOpenings.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="career-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Full name
                    </label>
                    <input
                      id="career-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={set("name")}
                      className={inputClass}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="career-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Email
                    </label>
                    <input
                      id="career-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={set("email")}
                      className={inputClass}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="career-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Mobile
                    </label>
                    <input
                      id="career-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      inputMode="numeric"
                      placeholder="10-digit mobile"
                      value={form.phone}
                      onChange={set("phone")}
                      className={inputClass}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="career-experience" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Experience
                    </label>
                    <select
                      id="career-experience"
                      value={form.experience}
                      onChange={set("experience")}
                      className={`${inputClass} cursor-pointer`}
                      disabled={loading}
                    >
                      {experienceOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="career-qualification" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Highest qualification
                  </label>
                  <input
                    id="career-qualification"
                    type="text"
                    value={form.qualification}
                    onChange={set("qualification")}
                    placeholder="Example: MDS (Orthodontics), 2019"
                    className={inputClass}
                    disabled={loading}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="career-resume" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    CV link <span className="font-normal normal-case tracking-normal text-slate-400">(optional)</span>
                  </label>
                  <input
                    id="career-resume"
                    type="url"
                    value={form.resumeUrl}
                    onChange={set("resumeUrl")}
                    placeholder="https://"
                    className={inputClass}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="career-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Note to the selection committee
                  </label>
                  <textarea
                    id="career-message"
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Subject specialisation, notice period, or anything the office should know."
                    className={inputClass}
                    disabled={loading}
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center" disabled={loading}>
                  {loading ? "Submitting…" : "Submit application"}
                </button>
                <p className="text-center text-xs leading-relaxed text-slate-500">
                  By submitting, you agree that {siteConfig.shortName} may contact you about this vacancy.
                  The office can also be reached at {siteConfig.phone}.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
