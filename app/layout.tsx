import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hanako.id"),
  title: {
    default: "hanako.id — Best Partner for Your IT Solution",
    template: "%s · hanako.id",
  },
  description:
    "PT Hanna Integrasi Solusi (hanako.id) — system integrator & penyedia pengadaan teknologi untuk instansi pemerintah, kampus, dan rumah sakit. Video wall, IFP, CCTV, mesin antrian, UPS, dan lainnya.",
  keywords: [
    "system integrator",
    "pengadaan teknologi",
    "videotron",
    "video wall",
    "interactive flat panel",
    "CCTV",
    "mesin antrian",
    "UPS",
    "e-katalog",
    "Semarang",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "hanako.id",
    title: "hanako.id — Best Partner for Your IT Solution",
    description:
      "System integrator & penyedia pengadaan teknologi B2B dan instansi. Dipercaya pemerintah, kampus & rumah sakit sejak 2015.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
