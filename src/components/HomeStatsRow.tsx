import { MotionItem, MotionStagger } from "@/components/motion";
import { stats } from "@/lib/site-data";

export default function HomeStatsRow() {
  return (
    <section className="relative z-10 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <MotionStagger className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((s) => (
            <MotionItem key={s.label} className="text-center">
              <p className="font-serif text-3xl font-bold text-brand-maroon sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-xs font-medium leading-snug text-slate-600 sm:text-sm">{s.label}</p>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
