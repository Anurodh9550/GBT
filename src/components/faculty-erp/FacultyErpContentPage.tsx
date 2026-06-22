import FacultyErpPageHeader from "@/components/faculty-erp/FacultyErpPageHeader";

type FacultyErpContentPageProps = {
  title: string;
  section?: string;
  description?: string;
  children?: React.ReactNode;
};

export default function FacultyErpContentPage({
  title,
  section = "TEACHING",
  description,
  children,
}: FacultyErpContentPageProps) {
  return (
    <>
      <FacultyErpPageHeader title={title} section={section} />
      <div className="erp-panel p-5 sm:p-6">
        {description && <p className="mb-4 text-sm text-slate-600">{description}</p>}
        {children ?? (
          <p className="text-sm text-slate-500">
            Content for <strong>{title}</strong> will appear here. Contact the academic office if you
            need assistance.
          </p>
        )}
      </div>
    </>
  );
}
