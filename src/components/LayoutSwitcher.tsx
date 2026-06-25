"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UiProvider } from "@/components/ui/UiProvider";

export default function LayoutSwitcher({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isErp = pathname.startsWith("/student-erp") || pathname.startsWith("/faculty-erp");
  const isAdmin = pathname.startsWith("/admin-panel") || pathname.startsWith("/admin-login");

  return (
    <UiProvider>
      {isErp || isAdmin ? (
        children
      ) : (
        <>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </>
      )}
    </UiProvider>
  );
}
