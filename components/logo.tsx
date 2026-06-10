import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { logo } from "@/lib/data";

/**
 * Brand logo. Sumber gambar & ukuran dikonfigurasi di `logo` pada
 * `lib/data.ts` agar mudah diganti. Untuk latar gelap (footer), set
 * `light` — memakai `logo.srcDark` bila ada, atau `logo.src` + `darkFilter`.
 */
export function Logo({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  const src = light && logo.srcDark ? logo.srcDark : logo.src;
  const filter = light && !logo.srcDark ? logo.darkFilter : undefined;

  return (
    <Link
      href="/"
      aria-label={`${logo.alt} — beranda`}
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src={src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        priority
        style={{ height: logo.displayHeight, width: "auto", filter }}
      />
    </Link>
  );
}
