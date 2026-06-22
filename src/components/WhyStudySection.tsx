import { MotionSection, MotionStagger, MotionCard } from "@/components/motion";
import { whyStudyHere } from "@/lib/site-data";

function StudyIcon({ type, className }: { type: "lightbulb" | "handshake" | "chat"; className: string }) {
  if (type === "handshake") {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 100 3m0-3h.01M17 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 100 3m0-3h.01M12 11V8.5a1.5 1.5 0 013 0V11m-3 0h3m-3 0v2.5a1.5 1.5 0 003 0V11" />
      </svg>
    );
  }
  if (type === "chat") {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

export default function WhyStudySection() {
  return (
    <MotionSection className="section-padding bg-slate-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange/10 px-4 py-1.5 text-eyebrow text-brand-orange">
            • Discover Our Edge
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
            Why Study <span className="text-brand-orange">Here?</span>
          </h2>
        </div>

        <MotionStagger className="mt-14 grid gap-6 lg:grid-cols-3">
          {whyStudyHere.map((item) => (
            <MotionCard
              key={item.title}
              className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm"
            >
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg}`}
              >
                <StudyIcon type={item.icon} className={`h-7 w-7 ${item.iconColor}`} />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-black">{item.title}</h3>
              <p className={`mt-2 text-sm font-semibold ${item.subtitleColor}`}>{item.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.desc}</p>
            </MotionCard>
          ))}
        </MotionStagger>
      </div>
    </MotionSection>
  );
}
