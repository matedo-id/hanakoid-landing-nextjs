import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/eyebrow";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("wrap", className)}>{children}</div>;
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  center = false,
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        center
          ? "items-center text-center max-w-2xl mx-auto"
          : action
            ? "md:flex-row md:items-end md:justify-between"
            : "max-w-2xl",
        className
      )}
    >
      <div className={cn("flex flex-col gap-4", center && "items-center")}>
        {eyebrow && <Eyebrow center={center}>{eyebrow}</Eyebrow>}
        <h2 className="h2">{title}</h2>
        {lead && <p className="lead">{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
