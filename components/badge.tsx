import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "primary" | "accent" | "success" | "warning" | "neutral";

export function Badge({
  variant = "primary",
  dot = false,
  children,
  className,
}: {
  variant?: BadgeVariant;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("badge", `badge--${variant}`, className)}>
      {dot && <span className="dot" />}
      {children}
    </span>
  );
}

export function Chip({
  active = false,
  children,
  onClick,
  className,
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn("chip", className)}
    >
      {children}
    </button>
  );
}
