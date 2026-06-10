import {
  MonitorPlay,
  Presentation,
  Cctv,
  Speaker,
  Ticket,
  BatteryCharging,
  Laptop,
  Armchair,
  HeartPulse,
  GraduationCap,
  Building2,
  MonitorCog,
  ShoppingBag,
  Hotel,
  TrainFront,
  Landmark,
  type LucideIcon,
} from "lucide-react";

/* ============================================================
   Types
   ============================================================ */
export type CategoryKey =
  | "video-wall"
  | "ifp"
  | "cctv"
  | "audio"
  | "antrian"
  | "ups"
  | "pc"
  | "perkakas";

export interface Category {
  key: CategoryKey;
  title: string;
  desc: string;
  icon: LucideIcon;
}

export type ProductStatus = "ready" | "inden" | "call";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  cat: string;
  catKey: CategoryKey;
  sku: string;
  status: ProductStatus;
  /** Harga dalam Rupiah; null untuk produk berstatus "call". */
  price: number | null;
  imgLabel: string;
  tags: string[];
  featured?: boolean;
  description?: string;
  specs?: ProductSpec[];
}

export interface Solution {
  key: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  items: string[];
}

/* ============================================================
   Kategori (8 lini)
   ============================================================ */
export const categories: Category[] = [
  {
    key: "video-wall",
    title: "Video Wall & Videotron",
    desc: "LED indoor/outdoor & video wall LCD untuk display besar.",
    icon: MonitorPlay,
  },
  {
    key: "ifp",
    title: "Interactive Flat Panel",
    desc: "Papan interaktif 4K untuk ruang kelas & rapat.",
    icon: Presentation,
  },
  {
    key: "cctv",
    title: "CCTV & IP Camera",
    desc: "Pengawasan IP HD dengan NVR dan analitik.",
    icon: Cctv,
  },
  {
    key: "audio",
    title: "Audio Sistem",
    desc: "Sound system, conference & public address.",
    icon: Speaker,
  },
  {
    key: "antrian",
    title: "Mesin Antrian",
    desc: "Sistem antrian touchscreen, kios & display panggilan.",
    icon: Ticket,
  },
  {
    key: "ups",
    title: "UPS Systems",
    desc: "UPS online & backup daya untuk perangkat kritis.",
    icon: BatteryCharging,
  },
  {
    key: "pc",
    title: "PC & Laptop",
    desc: "Desktop, laptop bisnis & server bermerek.",
    icon: Laptop,
  },
  {
    key: "perkakas",
    title: "Perkakas & Meubeler",
    desc: "Rak server, meubeler & perkakas pendukung.",
    icon: Armchair,
  },
];

export const categoryByKey: Record<CategoryKey, Category> = categories.reduce(
  (acc, c) => {
    acc[c.key] = c;
    return acc;
  },
  {} as Record<CategoryKey, Category>
);

/* ============================================================
   Produk (seed)
   ============================================================ */
export const products: Product[] = [
  {
    id: "videotron-indoor-led-p25",
    brand: "Absen",
    name: "Videotron Indoor LED P2.5",
    cat: "Video Wall & Videotron",
    catKey: "video-wall",
    sku: "VTR-IN-P25",
    status: "ready",
    price: 3500000,
    imgLabel: "LED P2.5 Indoor",
    tags: ["Indoor", "Modular", "SMD"],
    featured: true,
    description:
      "Modul LED indoor pixel pitch 2.5mm dengan kecerahan tinggi dan refresh rate stabil, cocok untuk lobi, command center, dan ruang serbaguna.",
    specs: [
      { label: "Pixel Pitch", value: "2.5 mm" },
      { label: "Kecerahan", value: "800 nits" },
      { label: "Refresh Rate", value: "≥ 3840 Hz" },
      { label: "Ukuran Modul", value: "320 × 160 mm" },
      { label: "Garansi", value: "2 tahun" },
    ],
  },
  {
    id: "video-wall-lcd-55-3x3",
    brand: "Samsung",
    name: 'Video Wall LCD 55" 3×3',
    cat: "Video Wall & Videotron",
    catKey: "video-wall",
    sku: "VW-LCD55-3X3",
    status: "inden",
    price: 185000000,
    imgLabel: "Video Wall 55\" 3x3",
    tags: ["Bezel 3.5mm", "Set 9 Unit"],
    featured: true,
    description:
      "Susunan 9 panel LCD 55 inci dengan bezel ultra-tipis untuk dinding video mulus di control room dan ruang monitoring.",
    specs: [
      { label: "Ukuran Panel", value: '55"' },
      { label: "Konfigurasi", value: "3 × 3 (9 unit)" },
      { label: "Bezel-to-bezel", value: "3.5 mm" },
      { label: "Kecerahan", value: "500 nits" },
      { label: "Garansi", value: "3 tahun" },
    ],
  },
  {
    id: "videotron-outdoor-led-p4",
    brand: "Unilumin",
    name: "Videotron Outdoor LED P4",
    cat: "Video Wall & Videotron",
    catKey: "video-wall",
    sku: "VTR-OUT-P4",
    status: "call",
    price: null,
    imgLabel: "LED P4 Outdoor",
    tags: ["Outdoor", "IP65", "Waterproof"],
    description:
      "Layar LED outdoor pixel pitch 4mm tahan cuaca (IP65) dengan kecerahan tinggi untuk reklame dan fasad gedung.",
    specs: [
      { label: "Pixel Pitch", value: "4 mm" },
      { label: "Kecerahan", value: "≥ 5500 nits" },
      { label: "Proteksi", value: "IP65 / IP54" },
      { label: "Garansi", value: "2 tahun" },
    ],
  },
  {
    id: "ifp-75-86-4k",
    brand: "Maxhub",
    name: 'IFP 75"/86" 4K',
    cat: "Interactive Flat Panel",
    catKey: "ifp",
    sku: "IFP-7586-4K",
    status: "ready",
    price: 24500000,
    imgLabel: "Interactive Panel 4K",
    tags: ["4K UHD", "Android", "Touch 20 titik"],
    featured: true,
    description:
      "Panel interaktif 4K dengan sentuhan 20 titik, OS Android bawaan, dan whiteboard untuk ruang kelas serta ruang rapat modern.",
    specs: [
      { label: "Ukuran", value: '75" / 86"' },
      { label: "Resolusi", value: "3840 × 2160 (4K)" },
      { label: "Touch Points", value: "20 titik" },
      { label: "OS", value: "Android 11" },
      { label: "Garansi", value: "3 tahun" },
    ],
  },
  {
    id: "mesin-antrian-touchscreen-kios",
    brand: "Hanako",
    name: "Mesin Antrian Touchscreen + Kios",
    cat: "Mesin Antrian",
    catKey: "antrian",
    sku: "QMS-TS-KIOS",
    status: "ready",
    price: 32000000,
    imgLabel: "Kios Antrian Touchscreen",
    tags: ["Touchscreen", "Printer Thermal", "Multi-loket"],
    featured: true,
    description:
      "Sistem antrian lengkap: kios touchscreen, printer tiket thermal, display panggilan, dan software multi-loket untuk layanan publik.",
    specs: [
      { label: "Layar Kios", value: '21.5" Touchscreen' },
      { label: "Printer", value: "Thermal 80mm auto-cutter" },
      { label: "Loket", value: "Hingga 32 loket" },
      { label: "Display", value: "LED / LCD panggilan" },
      { label: "Garansi", value: "1 tahun" },
    ],
  },
  {
    id: "paket-cctv-ip-4mp-8-titik",
    brand: "Hikvision",
    name: "Paket CCTV IP 4MP 8 Titik",
    cat: "CCTV & IP Camera",
    catKey: "cctv",
    sku: "CCTV-IP4MP-8",
    status: "ready",
    price: 18500000,
    imgLabel: "Paket CCTV IP 8 Titik",
    tags: ["4MP", "NVR 8CH", "Night Vision"],
    featured: true,
    description:
      "Paket pengawasan 8 kamera IP 4MP, NVR 8 channel dengan HDD, PoE switch, dan instalasi standar untuk kantor dan gudang.",
    specs: [
      { label: "Kamera", value: "8 × IP 4MP" },
      { label: "Perekam", value: "NVR 8CH + HDD 4TB" },
      { label: "Konektivitas", value: "PoE" },
      { label: "Night Vision", value: "Up to 30 m" },
      { label: "Garansi", value: "2 tahun" },
    ],
  },
  {
    id: "audio-conference-system",
    brand: "Bosch",
    name: "Audio Conference System",
    cat: "Audio Sistem",
    catKey: "audio",
    sku: "AUD-CONF-SYS",
    status: "inden",
    price: 47500000,
    imgLabel: "Audio Conference",
    tags: ["Digital", "Mic Delegasi", "DSP"],
    description:
      "Sistem konferensi digital dengan unit ketua & delegasi, DSP, dan mixer untuk ruang sidang dan rapat paripurna.",
    specs: [
      { label: "Tipe", value: "Digital Conference" },
      { label: "Unit", value: "1 ketua + delegasi" },
      { label: "Audio", value: "DSP + mixer" },
      { label: "Garansi", value: "2 tahun" },
    ],
  },
  {
    id: "ups-online-3kva",
    brand: "APC",
    name: "UPS Online 3kVA",
    cat: "UPS Systems",
    catKey: "ups",
    sku: "UPS-ONL-3K",
    status: "ready",
    price: 14250000,
    imgLabel: "UPS Online 3kVA",
    tags: ["Online", "Tower", "LCD"],
    description:
      "UPS online double-conversion 3kVA dengan proteksi penuh untuk server, perangkat jaringan, dan peralatan medis kritis.",
    specs: [
      { label: "Kapasitas", value: "3000 VA / 2700 W" },
      { label: "Topologi", value: "Online double-conversion" },
      { label: "Bentuk", value: "Tower" },
      { label: "Display", value: "LCD" },
      { label: "Garansi", value: "2 tahun" },
    ],
  },
  {
    id: "pc-optiplex-i7",
    brand: "Dell",
    name: "PC OptiPlex i7",
    cat: "PC & Laptop",
    catKey: "pc",
    sku: "PC-OPTI-I7",
    status: "ready",
    price: 16900000,
    imgLabel: "PC OptiPlex i7",
    tags: ["Core i7", "16GB", "SSD 512GB"],
    description:
      "Desktop bisnis Dell OptiPlex dengan prosesor Core i7, RAM 16GB, dan SSD 512GB untuk produktivitas kantor.",
    specs: [
      { label: "Prosesor", value: "Intel Core i7" },
      { label: "RAM", value: "16 GB DDR4" },
      { label: "Storage", value: "SSD 512 GB" },
      { label: "OS", value: "Windows 11 Pro" },
      { label: "Garansi", value: "3 tahun" },
    ],
  },
  {
    id: "laptop-bisnis-14",
    brand: "Lenovo",
    name: 'Laptop Bisnis 14"',
    cat: "PC & Laptop",
    catKey: "pc",
    sku: "LAP-BIZ-14",
    status: "inden",
    price: 13500000,
    imgLabel: 'Laptop Bisnis 14"',
    tags: ["Core i5", "16GB", "FHD"],
    description:
      "Laptop bisnis ringan 14 inci FHD dengan Core i5 dan RAM 16GB, ideal untuk mobilitas staf dan instansi.",
    specs: [
      { label: "Layar", value: '14" FHD IPS' },
      { label: "Prosesor", value: "Intel Core i5" },
      { label: "RAM", value: "16 GB" },
      { label: "Storage", value: "SSD 512 GB" },
      { label: "Garansi", value: "2 tahun" },
    ],
  },
  {
    id: "server-rack-2u",
    brand: "HPE",
    name: "Server Rack 2U",
    cat: "PC & Laptop",
    catKey: "pc",
    sku: "SRV-RACK-2U",
    status: "call",
    price: null,
    imgLabel: "Server Rack 2U",
    tags: ["Xeon", "Redundant PSU", "2U"],
    description:
      "Server rack 2U dengan prosesor Xeon dan power supply redundan untuk infrastruktur data center skala menengah.",
    specs: [
      { label: "Form Factor", value: "2U Rackmount" },
      { label: "Prosesor", value: "Intel Xeon Scalable" },
      { label: "PSU", value: "Redundant hot-plug" },
      { label: "Garansi", value: "3 tahun" },
    ],
  },
  {
    id: "rak-server-42u",
    brand: "Hanako",
    name: "Rak Server 42U Closed",
    cat: "Perkakas & Meubeler",
    catKey: "perkakas",
    sku: "RACK-42U-CL",
    status: "ready",
    price: 8750000,
    imgLabel: "Rak Server 42U",
    tags: ["42U", "Closed", "Fan Set"],
    description:
      "Rak server closed 42U dengan pintu berventilasi, fan set, dan PDU untuk perapian perangkat jaringan.",
    specs: [
      { label: "Kapasitas", value: "42U" },
      { label: "Tipe", value: "Closed rack" },
      { label: "Aksesori", value: "Fan set + PDU" },
      { label: "Garansi", value: "1 tahun" },
    ],
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function relatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.catKey === product.catKey && p.id !== product.id)
    .concat(products.filter((p) => p.catKey !== product.catKey))
    .slice(0, limit);
}

/* ============================================================
   Status badge mapping
   ============================================================ */
export const statusMeta: Record<
  ProductStatus,
  { label: string; variant: "success" | "warning" | "neutral" }
> = {
  ready: { label: "Tersedia", variant: "success" },
  inden: { label: "Indent", variant: "warning" },
  call: { label: "Pre-order", variant: "neutral" },
};

export function formatPrice(price: number | null): string {
  if (price === null) return "Hubungi untuk harga";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function priceNote(product: Product): string {
  return product.price === null
    ? "Penawaran sesuai kebutuhan"
    : "Belum termasuk PPN";
}

/* ============================================================
   Solusi Vertikal (8 paket)
   ============================================================ */
export const solutions: Solution[] = [
  {
    key: "rumah-sakit",
    title: "Rumah Sakit & Klinik",
    desc: "Antrian poli, nurse call, CCTV, UPS untuk alat medis.",
    icon: HeartPulse,
    items: ["Mesin antrian poli", "CCTV area perawatan", "UPS perangkat medis", "Display informasi"],
  },
  {
    key: "smart-class",
    title: "Smart Class & Kampus",
    desc: "Interactive panel, audio kelas, dan lab komputer.",
    icon: GraduationCap,
    items: ["Interactive flat panel", "Audio ruang kelas", "PC & laptop lab", "Video wall auditorium"],
  },
  {
    key: "kantor",
    title: "Kantor & Pemerintahan",
    desc: "Ruang rapat, konferensi, dan keamanan gedung.",
    icon: Building2,
    items: ["Audio conference", "Mesin antrian layanan", "CCTV gedung", "Meeting room display"],
  },
  {
    key: "command-center",
    title: "Command Center",
    desc: "Video wall, monitoring, dan daya cadangan.",
    icon: MonitorCog,
    items: ["Video wall LCD/LED", "Workstation operator", "UPS redundan", "Integrasi monitoring"],
  },
  {
    key: "retail",
    title: "Retail & Mal",
    desc: "Digital signage, videotron, dan pengawasan.",
    icon: ShoppingBag,
    items: ["Videotron outdoor", "Digital signage", "CCTV analitik", "Audio public address"],
  },
  {
    key: "perhotelan",
    title: "Perhotelan",
    desc: "Signage, TV sistem, dan keamanan tamu.",
    icon: Hotel,
    items: ["Digital signage lobi", "CCTV area publik", "Audio background", "UPS front office"],
  },
  {
    key: "transportasi",
    title: "Transportasi & Bandara",
    desc: "Display jadwal, antrian, dan pengawasan area.",
    icon: TrainFront,
    items: ["Display informasi jadwal", "Mesin antrian", "Video wall kontrol", "CCTV perimeter"],
  },
  {
    key: "perbankan",
    title: "Perbankan & Keuangan",
    desc: "Antrian nasabah, CCTV, dan daya andal.",
    icon: Landmark,
    items: ["Mesin antrian nasabah", "CCTV ATM & teller", "UPS online", "Digital signage produk"],
  },
];

/* ============================================================
   Konten pendukung
   ============================================================ */
export const trustText =
  "Dipercaya instansi pemerintah, kampus & rumah sakit di seluruh Indonesia.";

export const trustLogos: string[] = [
  "Pemkot",
  "Universitas",
  "RSUD",
  "BUMN",
  "Dinas",
  "Politeknik",
];

export const stats: { value: string; label: string }[] = [
  { value: "9+", label: "Tahun pengalaman sejak 2015" },
  { value: "800+", label: "Pilihan produk teknologi" },
  { value: "500+", label: "Proyek instansi terlayani" },
  { value: "34", label: "Provinsi jangkauan layanan" },
];

export const whyReasons: { title: string; desc: string }[] = [
  {
    title: "PT Resmi & Legalitas Lengkap",
    desc: "Badan usaha resmi dengan NIB, siap untuk proses pengadaan dan tender instansi.",
  },
  {
    title: "Terdaftar e-Katalog INAPROC",
    desc: "Pengadaan transparan melalui e-katalog LKPP, mempermudah pembelian pemerintah.",
  },
  {
    title: "Solusi End-to-End",
    desc: "Dari konsultasi, pengadaan, instalasi, hingga purna jual dalam satu pintu.",
  },
  {
    title: "Brand Resmi & Bergaransi",
    desc: "Produk original dari principal terpercaya dengan garansi dan dukungan teknis.",
  },
  {
    title: "Tim Teknis Berpengalaman",
    desc: "Engineer bersertifikat menangani instalasi dan integrasi sistem yang kompleks.",
  },
  {
    title: "Purna Jual Responsif",
    desc: "Dukungan maintenance dan respons cepat untuk menjaga operasional Anda.",
  },
];

export const processSteps: { title: string; desc: string }[] = [
  {
    title: "Konsultasi",
    desc: "Diskusi kebutuhan, survei lokasi, dan rekomendasi solusi yang tepat.",
  },
  {
    title: "Penawaran",
    desc: "Penyusunan RAB, spesifikasi, dan penawaran resmi sesuai anggaran.",
  },
  {
    title: "Instalasi",
    desc: "Pengiriman, pemasangan, dan integrasi oleh tim teknis bersertifikat.",
  },
  {
    title: "Purna Jual",
    desc: "Pelatihan, garansi, dan dukungan maintenance berkelanjutan.",
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Apakah hanako.id melayani pengadaan melalui e-katalog?",
    a: "Ya. Kami terdaftar di e-Katalog INAPROC (LKPP) sehingga instansi pemerintah dapat melakukan pembelian secara transparan melalui sistem e-katalog.",
  },
  {
    q: "Apakah harga sudah termasuk instalasi?",
    a: "Sebagian besar paket sudah mencakup instalasi standar. Untuk kebutuhan khusus, tim kami akan menyusun penawaran instalasi sesuai kondisi lapangan.",
  },
  {
    q: "Berapa lama garansi produk?",
    a: "Garansi bervariasi per produk, umumnya 1–3 tahun resmi dari principal. Detail tertera pada spesifikasi masing-masing produk.",
  },
  {
    q: "Apakah bisa pengadaan dalam jumlah besar untuk banyak lokasi?",
    a: "Bisa. Kami berpengalaman menangani proyek multi-lokasi dengan jadwal pengiriman dan instalasi terkoordinasi. Silakan ajukan penawaran (RFQ).",
  },
];

/* ============================================================
   Brand / Logo
   Ubah path, dimensi, dan tinggi tampil di sini agar logo
   mudah diganti tanpa menyentuh komponen.
   ============================================================ */
export interface LogoConfig {
  /** Logo utama untuk latar terang (mis. di public/). */
  src: string;
  /** Logo versi terang untuk latar gelap (footer). Null = pakai `src` + darkFilter. */
  srcDark: string | null;
  /** Dimensi intrinsik gambar — wajib agar rasio terjaga. */
  width: number;
  height: number;
  /** Tinggi tampil dalam px; lebar mengikuti rasio secara otomatis. */
  displayHeight: number;
  alt: string;
  /** Filter CSS agar `src` tampil putih di latar gelap saat srcDark null. */
  darkFilter: string;
}

export const logo: LogoConfig = {
  src: "/logo-hanakoid.webp",
  srcDark: null, // ganti ke mis. "/logo-white.png" bila tersedia
  width: 433,
  height: 300,
  displayHeight: 44,
  alt: "hanako.id",
  darkFilter: "brightness(0) invert(1)",
};

/* ============================================================
   Kontak
   ============================================================ */
export const contact = {
  company: "PT Hanna Integrasi Solusi",
  brand: "hanako.id",
  tagline: "Best Partner for Your IT Solution.",
  address:
    "Jl. Menteri Supeno I No. 26, Mugassari, Semarang Selatan, Jawa Tengah 50249",
  phone: "+62 888-8707-070",
  phoneHref: "tel:+628888707070",
  waDisplay: "+62 888-8707-070",
  waNumber: "628888707070",
  waLink: "https://wa.me/628888707070",
  email: "sales@hanako.id",
  emailHref: "mailto:sales@hanako.id",
  hours: "Sen–Jum 08.00–17.00 WIB",
  since: "2015",
} as const;

export function waLink(message?: string): string {
  if (!message) return contact.waLink;
  return `${contact.waLink}?text=${encodeURIComponent(message)}`;
}
