export function TrustStrip({ logos }: { logos: string[] }) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
      {logos.map((logo) => (
        <li
          key={logo}
          className="font-head text-lg font-bold tracking-tight text-muted-2 grayscale transition-all duration-200 hover:text-primary hover:grayscale-0"
        >
          {logo}
        </li>
      ))}
    </ul>
  );
}
