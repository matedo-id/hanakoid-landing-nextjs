import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/structured-data";
import { siteUrl } from "@/lib/data";

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

export const viewport: Viewport = {
  themeColor: "#7D2A8E",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
    siteName: "hanako.id",
    title: "hanako.id — Best Partner for Your IT Solution",
    description:
      "System integrator & penyedia pengadaan teknologi B2B dan instansi. Dipercaya pemerintah, kampus & rumah sakit sejak 2015.",
  },
  twitter: {
    card: "summary_large_image",
    title: "hanako.id — Best Partner for Your IT Solution",
    description:
      "System integrator & penyedia pengadaan teknologi B2B dan instansi sejak 2015.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
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
      <body className="min-h-full flex flex-col">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
