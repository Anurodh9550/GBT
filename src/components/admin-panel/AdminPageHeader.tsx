type AdminPageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  badge?: string;
};

export default function AdminPageHeader({ title, subtitle, action, badge }: AdminPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">ERP Administration</p>
          {badge && (
            <span className="rounded-full bg-brand-orange/10 px-2 py-0.5 text-[10px] font-bold text-brand-orange">
              {badge}
            </span>
          )}
        </div>
        <h1 className="mt-1 font-serif text-2xl font-bold text-brand-maroon sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 max-w-2xl text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
