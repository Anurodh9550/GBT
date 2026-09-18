"use client";

import { siteConfig } from "@/lib/site-config";

function TickerTrack() {
  const items = [
    {
      badge: "LIVE",
      text: `Counseling started at ${siteConfig.shortName}`,
    },
    {
      badge: "NEW",
      text: `Admissions Open — Batch ${siteConfig.admissionBatch}`,
    },
    {
      badge: "OPEN",
      text: "Register now for BDS · D-Pharma · Paramedical · BBA",
    },
    {
      badge: "NOW",
      text: "Visit campus or enquire online for counseling",
    },
  ];

  return (
    <div className="flex shrink-0 items-center gap-10 px-8">
      {items.map((item) => (
        <p key={item.text} className="flex items-center gap-3 whitespace-nowrap text-sm font-semibold tracking-wide">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand-orange shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-orange" />
            </span>
            {item.badge}
          </span>
          <span>{item.text}</span>
          <span className="text-white/50" aria-hidden>
            •
          </span>
        </p>
      ))}
    </div>
  );
}

export default function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-brand-maroon-dark via-brand-orange to-brand-orange-dark font-sans text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02Ii8+PC9nPjwvZz48L3N2Zz4=\")",
        }}
      />
      <div className="relative py-2">
        <div className="announcement-marquee flex w-max">
          <TickerTrack />
          <div aria-hidden="true">
            <TickerTrack />
          </div>
        </div>
      </div>
    </div>
  );
}
