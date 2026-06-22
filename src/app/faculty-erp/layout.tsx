import FacultyErpShell from "@/components/faculty-erp/FacultyErpShell";

export const metadata = { title: "Faculty ERP" };

export default function FacultyErpLayout({ children }: { children: React.ReactNode }) {
  return <FacultyErpShell>{children}</FacultyErpShell>;
}
