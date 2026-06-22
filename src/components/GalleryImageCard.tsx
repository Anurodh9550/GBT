import Image from "next/image";
import type { GalleryItem } from "@/lib/site-data";

type GalleryImageCardProps = {
  item: GalleryItem;
  aspect?: "16/10" | "4/3";
  showCategoryOnHover?: boolean;
};

export default function GalleryImageCard({
  item,
  aspect = "16/10",
  showCategoryOnHover = false,
}: GalleryImageCardProps) {
  const aspectClass = aspect === "4/3" ? "aspect-[4/3]" : "aspect-[16/10]";

  return (
    <div
      className={`group relative ${aspectClass} overflow-hidden rounded-2xl bg-slate-200 shadow-sm`}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      {showCategoryOnHover && item.category ? (
        <>
          <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition group-hover:opacity-100">
            <p className="font-bold text-white">{item.title}</p>
            <p className="text-xs text-brand-orange">{item.category}</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 transition group-hover:opacity-0">
            <p className="text-sm font-semibold text-white">{item.title}</p>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-end p-5">
          <p className="font-semibold text-white">{item.title}</p>
        </div>
      )}
    </div>
  );
}
