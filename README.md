# hanako.id — Website Korporat

Website korporat **PT Hanna Integrasi Solusi** (brand **hanako.id**) — system
integrator & penyedia pengadaan teknologi B2B untuk instansi pemerintah,
kampus, dan rumah sakit. Tagline: _"Best Partner for Your IT Solution."_

Dibangun dengan **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4**.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
```

Perintah lain:

```bash
npm run build    # build produksi
npm run start    # menjalankan hasil build
npm run lint     # ESLint
```

## Struktur

```
app/
  layout.tsx            # Root layout: <html>/<body>, font, metadata global
  globals.css           # Design tokens (@theme) + komponen/utility classes
  not-found.tsx         # Halaman 404
  (site)/               # Grup rute dengan chrome (Navbar/Footer/FloatingWA)
    layout.tsx          # Layout situs (menyuntikkan chrome)
    page.tsx            # Homepage
    catalog/            # Katalog produk (filter kategori + pencarian)
    product/[id]/       # Detail produk (generateStaticParams)
    solution/           # Solusi & paket vertikal
    about/              # Profil perusahaan
    contact/            # Kontak + form
    rfq/                # Minta Penawaran (Request for Quote)
    articles/           # Artikel (placeholder)
  maintenance/          # Halaman "dalam perbaikan" — STANDALONE (tanpa chrome)
components/              # Komponen UI reusable (Button, ProductCard, Navbar, dll.)
lib/
  data.ts               # Data terketik: kategori, produk, solusi, kontak, helper
  cn.ts                 # Helper className
proxy.ts                # Gerbang mode maintenance (Proxy = Middleware di Next 16)
```

> **Route groups:** `(site)` mengelompokkan halaman yang memakai Navbar/Footer
> tanpa mengubah URL. Halaman `/maintenance` sengaja berada di luar grup agar
> dirender **standalone** (hanya `<html>`/`<body>`, tanpa navbar/footer).

## Mode Maintenance

Untuk menutup sementara seluruh situs dan menampilkan halaman "dalam perbaikan":

```bash
# .env.local
MAINTENANCE_MODE=true
```

Lalu restart server. Saat aktif, `proxy.ts` mengembalikan **halaman HTML 503**
secara langsung untuk semua rute (kecuali aset statis & rute `/maintenance`).
Set `false` (atau hapus var) untuk kembali normal.

Halaman React `/maintenance` (standalone, di `app/maintenance/`) tetap dapat
diakses langsung untuk pratinjau/penyuntingan.

> **Kenapa HTML langsung, bukan rewrite/redirect?**
> Di belakang reverse proxy yang terminasi TLS (nginx/Caddy), `request.url`
> berisi origin internal (mis. `https://localhost:3002`) sementara server Node
> melayani HTTP. Membangun URL absolut dari request akan memicu subrequest TLS
> ke server HTTP internal → error `EPROTO: wrong version number`, atau
> `ERR_INVALID_URL`. Mengembalikan HTML langsung tidak menyentuh URL sama
> sekali, jadi aman di semua konfigurasi proxy dan memberi status `503` yang
> tepat. **Jangan** ubah `proxy.ts` menjadi `NextResponse.rewrite/redirect`
> dengan `new URL(..., request.url)`.

> Catatan Next.js 16: _Middleware_ berganti nama menjadi _Proxy_ (`proxy.ts`).
> `matcher` harus berupa string literal statis (jangan pakai `String.raw`/
> variabel — build akan gagal "Invalid segment configuration export").
> Lihat `.env.example`.

## Design System

- **Warna brand:** ungu (`--color-primary #7D2A8E`) + aksen cyan (`--color-accent #06B6D4`).
- **Font:** Plus Jakarta Sans (heading) + Inter (body) via `next/font/google`.
- **Tokens:** didefinisikan di `app/globals.css` melalui Tailwind v4 `@theme`
  (warna/font/radius jadi utility seperti `bg-primary`, `font-head`,
  `rounded-pill`) dan CSS variables (shadow, layout, easing).
- **Ikon:** [lucide-react](https://lucide.dev) (stroke 1.8).
- **Animasi:** reveal-on-scroll (IntersectionObserver), menghormati
  `prefers-reduced-motion`.

## Catatan

- **Gambar produk** dirender sebagai komponen `<Placeholder>` (pola garis
  diagonal) karena belum ada aset foto. Ganti dengan `next/image` saat foto
  tersedia.
- **Logo** dirender sebagai wordmark (`components/logo.tsx`) agar tidak
  bergantung pada aset raster. Untuk memakai logo resmi, taruh
  `logo-hanakoid.webp` / `logo-white.png` di `public/` lalu sesuaikan komponen.
- **Form** (Kontak & RFQ) divalidasi di sisi klien dan menampilkan Toast sukses.
  Belum terhubung ke backend — tambahkan Route Handler / Server Action sesuai
  kebutuhan.
- Data kontak, harga, dan nomor WhatsApp pada `lib/data.ts` masih contoh —
  sesuaikan dengan data resmi sebelum produksi.
