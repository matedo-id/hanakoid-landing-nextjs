import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  hover = false,
  className,
  children,
  style,
}: {
  hover?: boolean;
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn("card", hover && "card--hover", className)}
      style={style}
    >
      {children}
    </div>
  );
}
