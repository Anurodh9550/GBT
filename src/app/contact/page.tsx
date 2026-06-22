import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { MotionSection, MotionDiv } from "@/components/motion";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Contact" };

const officeHours = [
  { day: "Monday – Friday", time: "9:00 AM – 5:00 PM" },
  { day: "Saturday", time: "9:00 AM – 1:00 PM" },
  { day: "Sunday & Holidays", time: "Closed" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with our office for admissions, queries, and support"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="card-surface bg-slate-50 p-8">
                <SectionHeading eyebrow="Reach Us" title="Office Address" />
                <div className="mt-6 space-y-4 text-slate-600">
                  <p>{siteConfig.address}</p>
                  <p><a href={`tel:${siteConfig.phone}`} className="font-medium hover:text-brand-orange">{siteConfig.phone}</a></p>
                  <p><a href={`mailto:${siteConfig.email}`} className="font-medium hover:text-brand-orange">{siteConfig.email}</a></p>
                </div>
              </div>
              <div className="card-surface p-8">
                <h3 className="font-bold text-brand-maroon">Office Hours</h3>
                <ul className="mt-4 space-y-3">
                  {officeHours.map((h) => (
                    <li key={h.day} className="flex justify-between text-sm">
                      <span className="text-slate-600">{h.day}</span>
                      <span className="font-semibold text-brand-maroon">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-brand-black p-6 text-white">
                <h3 className="font-bold text-brand-orange">Departments</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li>Admissions: admissions@gbtedtrust.edu.in</li>
                  <li>Examination: exam@gbtedtrust.edu.in</li>
                  <li>Accounts: accounts@gbtedtrust.edu.in</li>
                  <li>IT Support: it@gbtedtrust.edu.in</li>
                </ul>
              </div>
            </div>
            <div className="card-surface p-8">
              <SectionHeading eyebrow="Message" title="Send a Message" subtitle="Our office team will respond within 24 hours." />
              <form className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input type="text" placeholder="Your Name" className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange" />
                  <input type="email" placeholder="Email Address" className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange" />
                </div>
                <input type="tel" placeholder="Phone Number" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange" />
                <select className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none">
                  <option>Select Department</option>
                  <option>Admissions</option>
                  <option>Examination</option>
                  <option>Accounts & Fees</option>
                  <option>General Inquiry</option>
                </select>
                <textarea rows={5} placeholder="Your Message" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange" />
                <button type="submit" className="btn-primary w-full justify-center">Send Message</button>
              </form>
            </div>
          </div>
          <MotionDiv shadow className="card-surface mt-12 flex aspect-[21/9] items-center justify-center bg-slate-100">
            <p className="text-sm text-slate-500">Campus map — Google Maps embed</p>
          </MotionDiv>
        </div>
      </MotionSection>
    </>
  );
}
