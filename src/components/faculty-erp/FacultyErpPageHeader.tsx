import ErpPageHeader from "@/components/student-erp/ErpPageHeader";

type FacultyErpPageHeaderProps = {
  title: string;
  section?: string;
};

export default function FacultyErpPageHeader({ title, section = "Dashboard" }: FacultyErpPageHeaderProps) {
  return (
    <ErpPageHeader
      title={title}
      section={section}
      homeHref="/faculty-erp"
      accent="green"
    />
  );
}
