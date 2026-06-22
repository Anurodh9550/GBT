"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin-panel/AdminPageHeader";
import { adminApi } from "@/lib/admin-api";

export default function AdminMessagesPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const load = () => adminApi.messages.list().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const markRead = async (id: number) => {
    await adminApi.messages.update(id, { is_read: true });
    load();
  };

  return (
    <>
      <AdminPageHeader title="Contact Messages" subtitle="Messages from the contact form" />
      <div className="space-y-4">
        {items.map((m) => (
          <div key={String(m.id)} className={`card-surface p-5 ${m.is_read ? "opacity-70" : "ring-2 ring-brand-orange/20"}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-brand-maroon">{String(m.name)}</p>
                <p className="text-xs text-slate-500">{String(m.email)} · {String(m.phone || "—")} · {String(m.department || "General")}</p>
              </div>
              {!m.is_read && (
                <button type="button" onClick={() => markRead(Number(m.id))} className="rounded-full bg-brand-green px-3 py-1 text-xs font-semibold text-white">
                  Mark Read
                </button>
              )}
            </div>
            <p className="mt-3 text-sm text-slate-600">{String(m.message)}</p>
            <p className="mt-2 text-xs text-slate-400">{String(m.created_at).slice(0, 10)}</p>
          </div>
        ))}
        {items.length === 0 && <p className="text-center text-slate-400 py-12">No messages yet</p>}
      </div>
    </>
  );
}
