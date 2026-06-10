import { cn } from "@/lib/cn";

type Ratio = "16/9" | "4/3" | "1/1";

const ratioValue: Record<Ratio, string> = {
  "16/9": "16 / 9",
  "4/3": "4 / 3",
  "1/1": "1 / 1",
};

export function Placeholder({
  label,
  ratio = "16/9",
  dark = false,
  className,
}: {
  label: string;
  ratio?: Ratio;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("ph", dark && "ph--dark", className)}
      style={{ aspectRatio: ratioValue[ratio] }}
      role="img"
      aria-label={label}
    >
      <span className="ph__label">{label}</span>
    </div>
  );
}
