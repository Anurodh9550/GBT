import StudentErpShell from "@/components/student-erp/StudentErpShell";

export const metadata = { title: "Student ERP" };

export default function StudentErpLayout({ children }: { children: React.ReactNode }) {
  return <StudentErpShell>{children}</StudentErpShell>;
}
