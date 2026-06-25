"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type ToastType = "success" | "error" | "info";

type Toast = { id: number; message: string; type: ToastType };

type UiContextValue = {
  toast: (message: string, type?: ToastType) => void;
  startProgress: () => void;
  stopProgress: () => void;
  withProgress: <T>(fn: () => Promise<T>) => Promise<T>;
};

const UiContext = createContext<UiContextValue>({
  toast: () => {},
  startProgress: () => {},
  stopProgress: () => {},
  withProgress: async (fn) => fn(),
});

const TOAST_ICONS: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  info: "i",
};

const TOAST_STYLES: Record<ToastType, string> = {
  success: "border-green-200 bg-green-50 text-green-800",
  error: "border-red-200 bg-red-50 text-red-700",
  info: "border-sky-200 bg-sky-50 text-sky-800",
};

export function UiProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [progress, setProgress] = useState(0);
  const [progressVisible, setProgressVisible] = useState(false);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearProgressTimer = useCallback(() => {
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
  }, []);

  const startProgress = useCallback(() => {
    clearProgressTimer();
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setProgressVisible(true);
    setProgress(12);
    progressTimer.current = setInterval(() => {
      setProgress((p) => (p >= 88 ? p : p + Math.random() * 8));
    }, 280);
  }, [clearProgressTimer]);

  const stopProgress = useCallback(() => {
    clearProgressTimer();
    setProgress(100);
    hideTimer.current = setTimeout(() => {
      setProgressVisible(false);
      setProgress(0);
    }, 350);
  }, [clearProgressTimer]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4200);
  }, []);

  const withProgress = useCallback(
    async <T,>(fn: () => Promise<T>): Promise<T> => {
      startProgress();
      try {
        return await fn();
      } finally {
        stopProgress();
      }
    },
    [startProgress, stopProgress]
  );

  useEffect(() => () => {
    clearProgressTimer();
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, [clearProgressTimer]);

  return (
    <UiContext.Provider value={{ toast, startProgress, stopProgress, withProgress }}>
      {children}

      {progressVisible && (
        <div
          className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-1 bg-orange-100/80"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-gradient-to-r from-brand-orange via-brand-maroon to-brand-orange transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="pointer-events-none fixed bottom-4 right-4 z-[200] flex max-w-sm flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg animate-toast-in ${TOAST_STYLES[t.type]}`}
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/80 text-xs font-bold">
              {TOAST_ICONS[t.type]}
            </span>
            <span className="leading-snug">{t.message}</span>
          </div>
        ))}
      </div>
    </UiContext.Provider>
  );
}

export function useUi() {
  return useContext(UiContext);
}
