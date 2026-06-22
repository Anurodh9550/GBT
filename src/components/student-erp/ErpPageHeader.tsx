import Link from "next/link";

type ErpPageHeaderProps = {
  title: string;
  section?: string;
  homeHref?: string;
  accent?: "orange" | "green";
};

export default function ErpPageHeader({
  title,
  section = "Dashboard",
  homeHref = "/student-erp",
  accent = "orange",
}: ErpPageHeaderProps) {
  return (
    <div className="erp-page-header">
      <div>
        <p className="text-eyebrow text-slate-400">{section}</p>
        <h1 className="mt-1 font-serif text-xl font-bold text-brand-maroon sm:text-2xl">{title}</h1>
      </div>
      <nav className="text-sm text-slate-500">
        <Link
          href={homeHref}
          className={accent === "green" ? "transition hover:text-brand-green" : "transition hover:text-brand-orange"}
        >
          Home
        </Link>
        <span className="mx-2 text-slate-300">/</span>
        <span className="font-medium text-slate-700">{title}</span>
      </nav>
    </div>
  );
}
