import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Mode Maintenance.
 *
 * Catatan: pada Next.js 16, "Middleware" telah diganti nama menjadi "Proxy"
 * (file `proxy.ts` di root proyek). Fungsionalitasnya sama.
 *
 * Aktifkan dengan env var: MAINTENANCE_MODE=true (lalu restart server).
 * Saat aktif, semua permintaan halaman di-rewrite ke /maintenance — URL asli
 * tetap dipertahankan di address bar, hanya kontennya yang diganti.
 */
export function proxy(request: NextRequest) {
  const enabled = process.env.MAINTENANCE_MODE === "true";
  if (!enabled) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Biarkan halaman maintenance itu sendiri dan endpoint kesehatan lewat.
  if (pathname === "/maintenance") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  return NextResponse.rewrite(url);
}

export const config = {
  // Jalankan untuk semua rute KECUALI aset statis & gambar, agar CSS/JS/font
  // dan favicon halaman maintenance tetap termuat.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
