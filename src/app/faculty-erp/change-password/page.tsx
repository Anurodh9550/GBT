import FacultyErpContentPage from "@/components/faculty-erp/FacultyErpContentPage";

export default function Page() {
  return (
    <FacultyErpContentPage title="Change Password" section="EXTRA FEATURES">
      <form className="mx-auto max-w-md space-y-4">
        <input type="password" placeholder="Current Password" className="w-full rounded border border-slate-300 px-4 py-2.5 text-sm" />
        <input type="password" placeholder="New Password" className="w-full rounded border border-slate-300 px-4 py-2.5 text-sm" />
        <input type="password" placeholder="Confirm New Password" className="w-full rounded border border-slate-300 px-4 py-2.5 text-sm" />
        <button type="button" className="rounded bg-brand-green px-6 py-2.5 text-sm font-bold text-white">
          Update Password
        </button>
      </form>
    </FacultyErpContentPage>
  );
}
