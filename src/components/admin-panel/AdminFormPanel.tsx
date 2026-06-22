type AdminFormPanelProps = {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
  loading?: boolean;
};

export default function AdminFormPanel({
  title,
  children,
  onSubmit,
  submitLabel = "Save",
  loading,
}: AdminFormPanelProps) {
  return (
    <form onSubmit={onSubmit} className="admin-form-panel mb-6">
      <div className="border-b border-slate-100 px-5 py-4">
        <h3 className="font-semibold text-brand-maroon">{title}</h3>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-2">{children}</div>
      <div className="border-t border-slate-100 px-5 py-4">
        <button type="submit" disabled={loading} className="btn-primary text-xs disabled:opacity-60">
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export function AdminField({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</label>
      {children}
    </div>
  );
}
