import ErpPageHeader from "@/components/student-erp/ErpPageHeader";

type ErpContentPageProps = {
  title: string;
  section?: string;
  description?: string;
  children?: React.ReactNode;
};

export default function ErpContentPage({
  title,
  section = "ACADEMIA",
  description,
  children,
}: ErpContentPageProps) {
  return (
    <>
      <ErpPageHeader title={title} section={section} />
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
