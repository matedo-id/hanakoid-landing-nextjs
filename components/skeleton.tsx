import { cn } from "@/lib/cn";

export function Skeleton({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn("shimmer rounded-[8px]", className)}
      style={style}
      aria-hidden
    />
  );
}
