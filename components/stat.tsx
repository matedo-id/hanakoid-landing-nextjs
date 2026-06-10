export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-head text-4xl font-extrabold tracking-tight text-primary">
        {value}
      </span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
