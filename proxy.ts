import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Mode Maintenance.
 *
 * Catatan: pada Next.js 16, "Middleware" telah diganti nama menjadi "Proxy"
 * (file `proxy.ts` di root proyek). Fungsionalitasnya sama.
 *
 * Aktifkan dengan env var: MAINTENANCE_MODE=true (lalu restart server).
 *
 * Implementasi sengaja MENGEMBALIKAN HTML 503 secara langsung — bukan
 * rewrite/redirect ke /maintenance. Alasannya: di belakang reverse proxy yang
 * terminasi TLS (nginx/Caddy), membangun URL absolut dari request akan memakai
 * origin internal (mis. https://localhost:3002) sehingga:
 *   - rewrite() memicu subrequest TLS ke server HTTP internal → EPROTO
 *     "wrong version number";
 *   - redirect() menghasilkan Location yang salah / ERR_INVALID_URL.
 * Mengembalikan HTML langsung tidak menyentuh URL sama sekali, jadi aman di
 * semua konfigurasi proxy. Status 503 + Retry-After juga ramah SEO.
 *
 * Konten di bawah sengaja di-inline (tanpa import dari lib/data) agar bundle
 * proxy tetap ringan. Jika data kontak berubah, sinkronkan nilai berikut.
 */
const WA_LINK =
  "https://wa.me/628888707070?text=" +
  encodeURIComponent("Halo hanako.id, saya ingin menghubungi tim marketing.");
const PHONE = "+62 888-8707-070";
const PHONE_HREF = "tel:+628888707070";
const EMAIL = "sales@hanako.id";
const HOURS = "Sen–Jum 08.00–17.00 WIB";
const COMPANY = "PT Hanna Integrasi Solusi";

function maintenanceHtml(): string {
  return `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Sedang Dalam Perbaikan · hanako.id</title>
<style>
  :root { --primary:#7D2A8E; --primary-dark:#441852; --ink:#0F172A; --muted:#64748B; --surface:#F5F7FA; --border:#E2E8F0; --wa:#25D366; }
  * { box-sizing:border-box; }
  body { margin:0; min-height:100dvh; display:flex; flex-direction:column; background:var(--surface);
    color:var(--ink); font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    background-image:linear-gradient(to right,rgba(125,42,142,.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(125,42,142,.06) 1px,transparent 1px);
    background-size:44px 44px; }
  .bar { padding:20px 24px; font-weight:800; font-size:22px; letter-spacing:-.02em; }
  .bar span { color:var(--primary); }
  main { flex:1; display:flex; align-items:center; justify-content:center; padding:24px; }
  .card { width:100%; max-width:560px; text-align:center; }
  .badge { width:80px; height:80px; margin:0 auto 24px; border-radius:20px; background:var(--primary);
    display:grid; place-items:center; box-shadow:0 8px 20px -6px rgba(125,42,142,.4); }
  h1 { font-size:clamp(28px,6vw,44px); line-height:1.1; letter-spacing:-.03em; margin:0 0 16px; }
  h1 em { color:var(--primary); font-style:normal; }
  p { color:#334155; font-size:17px; line-height:1.6; margin:0 auto 28px; max-width:440px; }
  .actions { display:flex; flex-wrap:wrap; gap:12px; justify-content:center; }
  .btn { display:inline-flex; align-items:center; gap:8px; height:52px; padding:0 24px; border-radius:8px;
    font-weight:600; font-size:16px; text-decoration:none; border:1px solid transparent; }
  .btn-wa { background:var(--wa); color:#fff; }
  .btn-sec { background:#fff; color:var(--primary); border-color:#CBD5E1; }
  .meta { margin-top:24px; color:var(--muted); font-size:14px; }
  .meta a { color:var(--muted); text-decoration:none; }
  footer { padding:24px; text-align:center; color:#94A3B8; font-size:12px; }
</style>
</head>
<body>
  <div class="bar">hanako<span>.id</span></div>
  <main>
    <div class="card">
      <div class="badge" aria-hidden="true">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      </div>
      <h1>Website sedang <em>dalam perbaikan</em></h1>
      <p>Kami sedang meningkatkan layanan untuk pengalaman yang lebih baik. Sementara itu, tim marketing kami tetap siap membantu kebutuhan pengadaan teknologi Anda.</p>
      <div class="actions">
        <a class="btn btn-wa" href="${WA_LINK}" target="_blank" rel="noopener noreferrer">Hubungi Marketing</a>
        <a class="btn btn-sec" href="${PHONE_HREF}">${PHONE}</a>
      </div>
      <div class="meta"><a href="mailto:${EMAIL}">${EMAIL}</a> &nbsp;•&nbsp; ${HOURS}</div>
    </div>
  </main>
  <footer>© ${new Date().getFullYear()} ${COMPANY}</footer>
</body>
</html>`;
}

export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") return NextResponse.next();

  // Biarkan rute /maintenance (halaman React standalone) tetap dapat diakses
  // langsung, mis. untuk pratinjau.
  if (request.nextUrl.pathname === "/maintenance") return NextResponse.next();

  return new NextResponse(maintenanceHtml(), {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "retry-after": "3600",
    },
  });
}

export const config = {
  // Jalankan untuk semua rute KECUALI aset statis & gambar.
  // Matcher WAJIB string literal statis agar dapat dianalisis saat build
  // (jangan ubah ke String.raw / variabel — Next akan menolaknya).
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
