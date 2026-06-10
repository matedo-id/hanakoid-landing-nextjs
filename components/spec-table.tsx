import type { ProductSpec } from "@/lib/data";

export function SpecTable({ specs }: { specs: ProductSpec[] }) {
  return (
    <table className="w-full overflow-hidden rounded-[12px] border border-border text-sm">
      <tbody>
        {specs.map((s, i) => (
          <tr
            key={s.label}
            className={i % 2 === 1 ? "bg-surface" : "bg-white"}
          >
            <th
              scope="row"
              className="w-2/5 px-4 py-3 text-left align-top font-semibold text-ink-2"
            >
              {s.label}
            </th>
            <td className="px-4 py-3 text-ink">{s.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
