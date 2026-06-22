"use client";

import Link from "next/link";
import { motion } from "@/components/motion";
import { siteConfig } from "@/lib/site-config";

export default function AnnouncementBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden bg-gradient-to-r from-brand-maroon-dark via-brand-orange to-brand-orange-dark font-sans text-white"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImevenoddIj48ZyBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
      <div className="relative mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-2 lg:px-6">
        <p className="flex items-center gap-2.5 text-xs font-medium tracking-wide sm:text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          Admissions Open — Batch {siteConfig.admissionBatch}
        </p>
        <Link
          href="/admissions"
          className="hidden shrink-0 rounded-full border border-white/30 bg-white/15 px-4 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm transition hover:bg-white/25 sm:inline-block"
        >
          Enroll Now →
        </Link>
      </div>
    </motion.div>
  );
}
