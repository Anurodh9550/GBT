"use client";

import { useState } from "react";
import { MotionStagger, MotionCard } from "@/components/motion";
import GalleryImageCard from "@/components/GalleryImageCard";
import { galleryItems } from "@/lib/site-data";

const categories = ["All", "Campus", "Events", "Sports", "Classroom", "Labs"] as const;

export default function GalleryGrid() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered =
    active === "All" ? galleryItems : galleryItems.filter((item) => item.category === active);

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              active === cat
                ? "bg-brand-orange text-white shadow-md"
                : "border border-slate-200 text-slate-600 hover:border-brand-orange hover:text-brand-orange"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <MotionStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => (
          <MotionCard key={item.title}>
            <GalleryImageCard item={item} aspect="4/3" showCategoryOnHover />
          </MotionCard>
        ))}
      </MotionStagger>
    </>
  );
}
