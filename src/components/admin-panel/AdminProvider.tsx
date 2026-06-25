"use client";

import { useUi } from "@/components/ui/UiProvider";

/** @deprecated Use useUi from @/components/ui/UiProvider */
export function useAdminToast() {
  return useUi();
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
