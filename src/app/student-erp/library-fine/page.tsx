import ErpContentPage from "@/components/student-erp/ErpContentPage";

export default function Page() {
  return (
    <ErpContentPage title="Library Fine/Fee Detail" section="EXTRA FEATURES" description="Outstanding library fines and related fee details.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="pb-3 pr-4 font-semibold">Description</th>
              <th className="pb-3 pr-4 font-semibold">Due Date</th>
              <th className="pb-3 pr-4 font-semibold">Amount</th>
              <th className="pb-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="py-3 pr-4">Library Fine — Late Return</td>
              <td className="py-3 pr-4">—</td>
              <td className="py-3 pr-4">₹0</td>
              <td className="py-3">
                <span className="rounded-full bg-brand-green/15 px-3 py-1 text-xs font-bold text-brand-green">Clear</span>
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 pr-4">Semester Library Fee</td>
              <td className="py-3 pr-4">15 Jul 2026</td>
              <td className="py-3 pr-4">₹500</td>
              <td className="py-3">
                <span className="rounded-full bg-brand-green/15 px-3 py-1 text-xs font-bold text-brand-green">Paid</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ErpContentPage>
  );
}
