import AdminShell from "@/components/admin-panel/AdminShell";
import { AdminProvider } from "@/components/admin-panel/AdminProvider";

export const metadata = { title: "ERP Admin Panel | GBT College" };

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}
