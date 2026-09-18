import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ContactMessageForm from "@/components/ContactMessageForm";
import CTABanner from "@/components/CTABanner";
import { MotionSection, MotionDiv } from "@/components/motion";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Contact" };

const officeHours = [
  { day: "Monday – Friday", time: "9:00 AM – 5:00 PM" },
  { day: "Saturday", time: "9:00 AM – 1:00 PM" },
  { day: "Sunday & Holidays", time: "Closed" },
];

const contactCards = [
  {
    label: "Campus Address",
    value: siteConfig.address,
    href: "#campus-map",
    action: "View on map",
  },
  {
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    action: "Call office",
  },
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    action: "Send email",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        variant="contact"
        title="Contact Us"
        subtitle={`Visit ${siteConfig.name}, call the office, or send a message. Counseling is open for session ${siteConfig.admissionBatch}.`}
        image="/gallery/campus-entrance.png"
        imageAlt={`${siteConfig.name} campus entrance`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Reach Us"
            title="College Office"
            subtitle="The admissions desk and college office are on campus at Village Nagara, Jalaun."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {contactCards.map((card) => (
              <MotionDiv key={card.label} hover shadow className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">{card.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{card.value}</p>
                <a href={card.href} className="mt-4 inline-flex text-sm font-bold text-brand-maroon hover:text-brand-orange">
                  {card.action} →
                </a>
              </MotionDiv>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="campus-map" className="section-padding scroll-mt-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8">
              <p className="text-eyebrow text-brand-orange">Office Hours</p>
              <h2 className="mt-2 font-serif text-2xl font-bold text-brand-maroon">When to visit</h2>
              <ul className="mt-6 space-y-4">
                {officeHours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <span className="text-sm text-slate-600">{h.day}</span>
                    <span className="text-sm font-semibold text-brand-maroon">{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-slate-600">
                For admissions counseling, register online first or walk in during office hours with your documents.
              </p>
              <Link href={siteConfig.admissionRegisterUrl} className="btn-primary mt-6">
                {siteConfig.ctaRegisterLabel} →
              </Link>
            </div>
            <MotionDiv shadow className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <iframe
                title={`${siteConfig.name} campus location`}
                src={siteConfig.mapsEmbedUrl}
                className="h-full min-h-[320px] w-full border-0 lg:min-h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </MotionDiv>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <SectionHeading
              eyebrow="Message"
              title="Send a Message"
              subtitle="Write to the college office. For course counselling, use the enquiry form."
            />
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <ContactMessageForm />
            </div>
          </div>
        </div>
      </MotionSection>

      <CTABanner
        title="Prefer to enquire for admission?"
        subtitle="Fill the college enquiry form and the admissions team will call you back."
        primaryLabel={`${siteConfig.enquiryCtaLabel} →`}
        primaryHref={siteConfig.enquiryFormUrl}
        secondaryLabel="Register Now"
        secondaryHref={siteConfig.admissionRegisterUrl}
      />
    </>
  );
}
