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
  layout.tsx            # Root layout: font, metadata, Navbar/Footer/FloatingWA
  globals.css           # Design tokens (@theme) + komponen/utility classes
  page.tsx              # Homepage
  catalog/              # Katalog produk (filter kategori + pencarian)
  product/[id]/         # Detail produk (generateStaticParams)
  solution/             # Solusi & paket vertikal
  about/                # Profil perusahaan
  contact/              # Kontak + form
  rfq/                  # Minta Penawaran (Request for Quote)
  articles/             # Artikel (placeholder)
  not-found.tsx         # Halaman 404
components/              # Komponen UI reusable (Button, ProductCard, Navbar, dll.)
lib/
  data.ts               # Data terketik: kategori, produk, solusi, kontak, helper
  cn.ts                 # Helper className
```

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
