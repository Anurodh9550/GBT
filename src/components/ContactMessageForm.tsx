"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useUi } from "@/components/ui/UiProvider";
import { siteConfig } from "@/lib/site-config";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange disabled:opacity-60";

export default function ContactMessageForm() {
  const { toast, withProgress } = useUi();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "General Inquiry",
    message: "",
  });

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast("Please enter your name.", "error");
      return;
    }
    if (!form.email.trim()) {
      toast("Please enter your email.", "error");
      return;
    }
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) {
      toast("Please enter a valid phone number.", "error");
      return;
    }
    if (!form.message.trim()) {
      toast("Please write a message.", "error");
      return;
    }

    setLoading(true);
    try {
      await withProgress(async () => {
        const { api } = await import("@/lib/api");
        await api.submitContact({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: `+91${form.phone.replace(/\D/g, "").slice(-10)}`,
          department: form.department,
          message: form.message.trim(),
        });
      });
      setDone(true);
      toast("Message sent. Our office will reply soon.", "success");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Could not send message.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-brand-green/20 bg-brand-green/5 p-8 text-center">
        <p className="font-serif text-2xl font-bold text-brand-maroon">Message received</p>
        <p className="mt-3 text-sm text-slate-600">
          Thank you. The {siteConfig.shortName} office will contact you at {form.email}.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setForm({ name: "", email: "", phone: "", department: "General Inquiry", message: "" });
          }}
          className="btn-outline-maroon mt-6"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Your Name"
          value={form.name}
          onChange={set("name")}
          className={inputClass}
          disabled={loading}
          required
        />
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email Address"
          value={form.email}
          onChange={set("email")}
          className={inputClass}
          disabled={loading}
          required
        />
      </div>
      <input
        type="tel"
        name="phone"
        autoComplete="tel"
        placeholder="Phone Number"
        value={form.phone}
        onChange={set("phone")}
        className={inputClass}
        disabled={loading}
        required
      />
      <select
        name="department"
        value={form.department}
        onChange={set("department")}
        className={`${inputClass} cursor-pointer`}
        disabled={loading}
      >
        <option>General Inquiry</option>
        <option>Admissions</option>
        <option>Examination</option>
        <option>Accounts & Fees</option>
      </select>
      <textarea
        name="message"
        rows={5}
        placeholder="Your Message"
        value={form.message}
        onChange={set("message")}
        className={inputClass}
        disabled={loading}
        required
      />
      <button type="submit" className="btn-primary w-full justify-center" disabled={loading}>
        {loading ? "Sending…" : "Send Message"}
      </button>
      <p className="text-center text-xs text-slate-500">
        For course counselling use the{" "}
        <Link href={siteConfig.enquiryFormUrl} className="font-semibold text-brand-orange hover:underline">
          enquiry form
        </Link>
        .
      </p>
    </form>
  );
}
