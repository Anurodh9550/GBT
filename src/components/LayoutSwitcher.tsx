"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutSwitcher({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isErp = pathname.startsWith("/student-erp") || pathname.startsWith("/faculty-erp");
  const isAdmin = pathname.startsWith("/admin-panel") || pathname.startsWith("/admin-login");

  if (isErp || isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
