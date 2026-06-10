import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  center = false,
  className,
}: {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("eyebrow", center && "eyebrow--center", className)}>
      {children}
    </span>
  );
}
