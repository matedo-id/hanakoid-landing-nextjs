@AGENTS.md

# Briefing Proyek — Website Korporat hanako.id

> Dokumen ini adalah sumber instruksi utama untuk membangun proyek. Baca penuh sebelum menulis kode. Aturan di `AGENTS.md` (baca `node_modules/next/dist/docs/` dulu) tetap berlaku dan **mengikat**.

## 1. Ringkasan

Bangun ulang website korporat **PT Hanna Integrasi Solusi** (brand: **hanako.id**) — sebuah *system integrator* & penyedia pengadaan teknologi untuk **B2B / instansi pemerintah, kampus, dan rumah sakit**.

- **Tagline:** *"Best Partner for Your IT Solution."*
- **Bahasa konten:** Indonesia.
- **Sifat:** production-ready, responsif (mobile-first), SEO-friendly.
- **Estetika:** B2B bersih, tepercaya, minimalis. Banyak ruang putih, shadow lembut berlapis, aksen ungu yang hemat. **Hindari gradient norak & emoji.**

## 2. Aturan Lingkungan Repo (WAJIB)

Repo ini memakai **Next.js fork kustom** — bukan Next.js standar. APIs, konvensi, dan struktur file bisa berbeda dari pengetahuan umummu.

- **Versi nyata:** Next.js **16.2.9**, React **19.2.4**, TypeScript **^5** (strict). (Brief asli menyebut "Next.js 14+" — abaikan, pakai versi repo.)
- **WAJIB**: sebelum menulis kode fitur, baca guide relevan di `node_modules/next/dist/docs/`. Hormati deprecation notice. Contoh konvensi kustom: untuk memperbaiki navigasi client yang lambat, Suspense saja tidak cukup — `export const unstable_instant` dari route; baca `docs/01-app/02-guides/instant-navigation.mdx` dulu.
- **App Router** (`app/`). React Server Components sebagai default; tandai komponen interaktif dengan `"use client"` (Navbar, Drawer, filter katalog, form, toast, IntersectionObserver).
- **Path alias:** `@/*` → root proyek (`./*`). Impor pakai `@/components/...`, `@/lib/data`.
- **Perintah:** `npm run dev`, `npm run build`, `npm run lint`.

## 3. Stack & Konvensi

- **TypeScript strict** di seluruh kode. Tipe data produk/kategori eksplisit.
- **Styling: Tailwind CSS v4** (sudah terpasang via `@tailwindcss/postcss`, `@import "tailwindcss"` di `app/globals.css`). 
  > Catatan koreksi brief: brief asli meminta "jangan pakai Tailwind". Keputusan proyek ini **memakai Tailwind v4** karena repo sudah ter-setup. Cara: semua design token dipetakan ke `@theme` di `app/globals.css` sehingga tersedia sebagai utility (`bg-primary`, `text-ink`, `rounded-r-sm`, dll). Layout pakai utility Tailwind. Class semantik/komponen kompleks (`.display`, `.eyebrow`, `.ph`, dst.) ditulis sebagai CSS kustom via `@layer components` / `@utility`.
- **Font:** `next/font/google` → **Plus Jakarta Sans** (heading, weight 700/800) & **Inter** (body, weight 400/500/600). Wire ke variabel `--font-head` / `--font-body` dan daftarkan ke `@theme` (`--font-head`, `--font-body`). Ganti Geist default. Set di `app/layout.tsx`.
- **Ikon:** **lucide-react** (stroke 1.8). **Belum terpasang** → jalankan `npm i lucide-react`. Padankan nama ikon yang relevan.
- **Gambar:** `next/image`. Untuk konten yang belum ada fotonya, render `<Placeholder label="..." ratio="16/9" />` (kotak abu pola garis diagonal + label monospace). **Jangan bikin foto palsu.**
- **Aksesibilitas:** `aria-label` pada tombol ikon, fokus terlihat, hormati `prefers-reduced-motion`. Kontras teks memadai (ungu tua di atas terang, putih di footer gelap).
- **Struktur folder:** `app/`, `components/`, `lib/data.ts`, `app/globals.css`. (`components/` & `lib/` belum ada — buat.)

## 4. Brand & Logo

- **Aset (TODO — belum ada di repo, harus ditambahkan ke `public/`):** `logo-hanakoid.webp` (433×300, latar terang) & `logo-white.png` (versi putih untuk footer gelap).
- Komponen `<Logo light?: boolean />` → render `<Link href="/">` dengan `next/image`, tinggi 44px, width auto. Footer pakai `light`.
- **Primary color = UNGU.** Token brand (jangan diubah nilainya):

```
--primary:#7D2A8E; --primary-dark:#441852; --primary-700:#6A2479; --primary-050:#F6EBF8;
--accent:#06B6D4;  /* cyan — aksen, eyebrow line, ikon footer */  --accent-050:#E6FBFF;
```

## 5. Design Tokens (di `app/globals.css`)

Petakan token ke Tailwind v4 lewat `@theme` (warna & font jadi utility), dan simpan token non-utility (radius, shadow, layout, ease) sebagai CSS variables. Contoh bentuk:

```css
@import "tailwindcss";

@theme {
  /* Brand */
  --color-primary:#7D2A8E; --color-primary-dark:#441852; --color-primary-700:#6A2479; --color-primary-050:#F6EBF8;
  --color-accent:#06B6D4; --color-accent-050:#E6FBFF;
  /* Neutrals */
  --color-white:#FFFFFF; --color-surface:#F5F7FA; --color-surface-2:#EDF1F6;
  --color-border:#E2E8F0; --color-border-strong:#CBD5E1;
  --color-ink:#0F172A; --color-ink-2:#334155; --color-muted:#64748B; --color-muted-2:#94A3B8;
  /* Status */
  --color-success:#16A34A; --color-warning:#D97706; --color-error:#DC2626;
  --color-success-bg:#ECFDF3; --color-warning-bg:#FEF6E7;
  /* Type */
  --font-head:'Plus Jakarta Sans',system-ui,sans-serif;
  --font-body:'Inter',system-ui,sans-serif;
  /* Radius */
  --radius-r-sm:8px; --radius-r-md:10px; --radius-r-lg:12px; --radius-r-xl:16px; --radius-r-pill:999px;
}

:root {
  /* Shadow (soft, layered) */
  --sh-xs:0 1px 2px rgba(15,23,42,.04);
  --sh-sm:0 1px 2px rgba(15,23,42,.05),0 2px 4px rgba(15,23,42,.04);
  --sh-md:0 4px 6px -2px rgba(15,23,42,.05),0 12px 20px -8px rgba(15,23,42,.10);
  --sh-lg:0 12px 28px -8px rgba(15,23,42,.16),0 4px 10px -4px rgba(15,23,42,.08);
  --sh-primary:0 8px 20px -6px rgba(125,42,142,.40);
  /* Layout */
  --maxw:1240px; --gutter:24px; --nav-h:72px;
  --ease:cubic-bezier(.22,.61,.36,1);
}
```

- **Type scale** (class kustom via `@layer`): `.display` clamp(40–56px)/800; `.h1` clamp(34–44px); `.h2` clamp(28–36px); `.h3` 24px; `.h4` 19px; `.lead` clamp(17–19px) warna `--color-ink-2`. Heading pakai `--font-head`, letter-spacing -0.02em s/d -0.03em.
- **Eyebrow** (`.eyebrow`): label uppercase 13px, letter-spacing .14em, warna primary, didahului garis 22×2px warna accent via `::before`.

## 6. Komponen UI (reusable, di `components/`)

1. **Button** — varian `primary` (ungu, hover `--primary-700` + shadow ungu + translateY -1px), `secondary` (putih, border, teks ungu), `ghost`, `wa` (hijau `#25D366`). Ukuran `lg`/`default`/`sm`, opsi `block`. Tinggi default 44px, radius `r-sm`, font-head 600.
2. **Badge / Chip** — badge varian `accent`/`primary`/`success`/`warning` + opsi `dot`. Chip toggle (aktif = ungu).
3. **Card** — `card` + `card--hover` (lift + shadow-md).
4. **Placeholder** (`.ph`) — kotak pola garis diagonal; prop `label`, `ratio` (16/9, 4/3, 1/1); varian `dark`.
5. **ProductCard** — media (placeholder/foto ratio 4/3), badge status, tombol favorit (hati), brand (uppercase), nama (link), meta `kategori · SKU`, harga + subteks ("Belum termasuk PPN" / "Penawaran sesuai kebutuhan"), aksi **Minta Penawaran** (primary) + **Detail** (secondary).
6. **CategoryTile** — ikon dalam kotak `--primary-050` (hover jadi ungu solid), judul, deskripsi.
7. **Navbar** (sticky, blur) — Logo, link (Produk + **mega menu**, Solusi, Profil, Artikel, Kontak), aksi: tombol cari, **WhatsApp** (hijau), **Minta Penawaran** (primary). Mobile: hamburger → **Drawer** geser dari kanan.
8. **Mega menu** — panel grid 2 kolom: 8 kategori (ikon+judul+desc) + kartu feature "Butuh paket lengkap?" dengan CTA.
9. **Footer** (latar `--primary-dark`, logo putih) — kolom: brand + tagline + badge ("PT Resmi · NIB", "e-Katalog INAPROC", "Sejak 2015"), Produk, Perusahaan, Hubungi Kami (alamat, telp, WA, email, jam). Bottom bar copyright + link privasi.
10. **Floating WhatsApp** (`wa-float`) — pill hijau fixed kanan-bawah, "Chat Sales".
11. **Lainnya:** SpecTable (striped), Accordion (FAQ, ikon plus→rotate 45°), Breadcrumb, Form fields (input/textarea/select; state error & focus ring ungu), Tabs (underline ungu), Steps/Process (4 langkah bernomor, garis putus penghubung), Stat, TrustStrip (logo grayscale→warna saat hover), Toast (sukses), Skeleton shimmer.

**Animasi:** reveal-on-scroll (fade + translateY) via IntersectionObserver (`"use client"`), hormati `prefers-reduced-motion`.

## 7. Halaman (App Router)

Layout bersama (Navbar + Footer + Floating WhatsApp) di `app/layout.tsx`. Semua CTA utama mengarah ke `/rfq` atau WhatsApp. Gunakan heading/landmark yang benar untuk SEO.

| Route | File | Isi |
|---|---|---|
| `/` | `app/page.tsx` | **Homepage**: Hero (eyebrow, judul display, lead, CTA ganda, grid-bg dekoratif) → Trust strip → Kategori (8 lini, "800+ pilihan") → Produk Unggulan (grid ProductCard) → Solusi Vertikal (8 paket) → Mengapa Hanako → Proses (4 langkah) → Closing CTA |
| `/catalog` | `app/catalog/page.tsx` | **Katalog**: breadcrumb, judul, deskripsi, filter (chip kategori + search), grid ProductCard. Filter interaktif (client). |
| `/product/[id]` | `app/product/[id]/page.tsx` | **Detail produk**: galeri (placeholder), brand, nama, status, harga, CTA penawaran/WA, SpecTable, tab deskripsi/spesifikasi, produk terkait. |
| `/solution` | `app/solution/page.tsx` | **Solusi & paket** per vertikal (rumah sakit, smart class, kantor, dll). |
| `/about` | `app/about/page.tsx` | **Profil perusahaan**: cerita, statistik, portofolio/klien, sejak 2015. |
| `/contact` | `app/contact/page.tsx` | **Kontak**: form (nama, instansi, email, telp, pesan) + info kontak + (opsional) embed peta. |
| `/rfq` | `app/rfq/page.tsx` | **Minta Penawaran**: form multi-field pengadaan, ringkasan item, CTA kirim → Toast sukses. |

## 8. Data (`lib/data.ts`, typed)

**Kategori (8)** — masing-masing `key`, `title`, `desc`, ikon (lucide):
Video Wall & Videotron · Interactive Flat Panel · CCTV & IP Camera · Audio Sistem · Mesin Antrian · UPS Systems · PC & Laptop · Perkakas & Meubeler.

**Produk** — typed array. Field: `id, brand, name, cat, catKey, sku, status('ready'|'inden'|'call'), price, imgLabel, tags[]`. Seed: Videotron Indoor LED P2.5, Video Wall LCD 55" 3×3, Videotron Outdoor LED P4, IFP 75"/86" 4K, Mesin Antrian Touchscreen + Kios, Paket CCTV IP 4MP 8 titik, Audio Conference, UPS Online 3kVA, PC OptiPlex i7, Laptop Bisnis 14", Server Rack 2U (lengkapi).

**Mapping status badge:** `ready`→"Tersedia" (success) · `inden`→"Indent" (warning) · `call`→"Pre-order" (netral) + harga "Hubungi untuk harga".

**Kontak:** Jl. Menteri Supeno I No. 26, Mugassari, Semarang Selatan, Jawa Tengah 50249 · Telp (024) 8454 000 · WA +62 812 0000 0000 (`https://wa.me/6281200000000`) · sales@hanako.id · Sen–Jum 08.00–17.00 WIB.

## 9. Responsif (breakpoint kunci)

- **≤1024px:** footer 2 kolom, steps 2 kolom, mega menu 1 kolom.
- **≤860px:** `--nav-h:64px`, sembunyikan nav links → hamburger + drawer, sembunyikan label desktop.
- **≤640px:** `--gutter:18px`, steps 1 kolom, product actions 1 kolom, `wa-float` jadi bulat tanpa label.

Petakan breakpoint ini ke utility responsif Tailwind + CSS variables yang sesuai.

## 10. Catatan Kualitas

- Pertahankan rasa B2B bersih, tepercaya, minimalis — ruang putih, shadow lembut berlapis, aksen ungu hemat.
- Hindari gradient norak & emoji.
- Semua CTA utama → `/rfq` atau WhatsApp.
- Kontras teks memadai di semua latar.

## 11. Urutan Kerja & README

Bangun bertahap: **(1) tokens & layout → (2) komponen UI → (3) data (`lib/data.ts`) → (4) halaman**. Sertakan `README` singkat cara menjalankan (`npm install`, `npm run dev`). Jalankan `npm run lint` & `npm run build` sebelum dianggap selesai.
