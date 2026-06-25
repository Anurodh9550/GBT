"use client";

import { useCallback, useEffect, useState } from "react";
import { filterRows, parseAdminError } from "@/lib/admin-utils";
import { useAdminToast } from "@/components/admin-panel/AdminProvider";

export function useAdminList(
  loadFn: () => Promise<Record<string, unknown>[]>,
  searchKeys?: string[]
) {
  const { toast, withProgress } = useAdminToast();
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await withProgress(() => loadFn());
      setItems(data);
    } catch (err) {
      const msg = parseAdminError(err);
      setError(msg);
      toast(msg, "error");
    } finally {
      setLoading(false);
    }
  }, [loadFn, toast, withProgress]);

  useEffect(() => {
    reload();
  }, [reload]);

  const filtered = filterRows(items, search, searchKeys);

  return { items: filtered, total: items.length, loading, error, search, setSearch, reload };
}
