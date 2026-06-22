import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { MotionSection } from "@/components/motion";

export const metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Explore life at our campus through our photo gallery"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <MotionSection className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <GalleryGrid />
        </div>
      </MotionSection>
    </>
  );
}
