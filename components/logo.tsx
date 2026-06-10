import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Brand wordmark. Dirender sebagai mark + teks agar tidak bergantung pada
 * aset raster yang belum tersedia. Untuk mengganti dengan logo resmi
 * (logo-hanakoid.webp / logo-white.png), letakkan file di public/ lalu
 * tukar isi komponen ini dengan next/image — tinggi tetap 44px.
 */
export function Logo({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="hanako.id — beranda"
      className={cn("inline-flex items-center gap-2.5", className)}
      style={{ height: 44 }}
    >
      <span
        aria-hidden
        className="grid place-items-center rounded-[10px] font-head font-extrabold text-white"
        style={{
          width: 38,
          height: 38,
          background: "var(--color-primary)",
          fontSize: 20,
          boxShadow: "var(--sh-primary)",
        }}
      >
        h
      </span>
      <span
        className="font-head font-extrabold tracking-tight"
        style={{ fontSize: 22, color: light ? "#fff" : "var(--color-ink)" }}
      >
        hanako
        <span style={{ color: "var(--color-accent)" }}>.id</span>
      </span>
    </Link>
  );
}
