export function Steps({
  steps,
}: {
  steps: { title: string; desc: string }[];
}) {
  return (
    <ol className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={i} className="relative flex flex-col gap-3">
            {/* Garis putus penghubung (lg+) */}
            {!last && (
              <span
                aria-hidden
                className="absolute left-12 top-5 hidden h-px w-[calc(100%-2rem)] border-t-2 border-dashed border-border-strong lg:block"
              />
            )}
            <span className="relative z-10 grid size-10 place-items-center rounded-full bg-primary font-head text-sm font-bold text-white shadow-[var(--sh-primary)]">
              {i + 1}
            </span>
            <h3 className="h4">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{step.desc}</p>
          </li>
        );
      })}
    </ol>
  );
}
