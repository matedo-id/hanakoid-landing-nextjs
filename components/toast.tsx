"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

export function Toast({
  open,
  message,
  onClose,
  duration = 5000,
}: {
  open: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-[12px] border border-border bg-white px-5 py-3.5 shadow-[var(--sh-lg)]"
    >
      <CheckCircle2
        className="size-5 shrink-0"
        style={{ color: "var(--color-success)" }}
      />
      <span className="text-sm font-medium text-ink">{message}</span>
      <button
        type="button"
        aria-label="Tutup notifikasi"
        onClick={onClose}
        className="ml-1 text-muted-2 transition-colors hover:text-ink"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
