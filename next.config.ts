import type { NextConfig } from "next";

// Header keamanan diterapkan ke semua respons.
const securityHeaders = [
  // Cegah MIME-sniffing.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Cegah clickjacking (situs ini tidak perlu di-embed di iframe lain).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Kebijakan referrer yang aman namun tetap berguna untuk analytics.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Matikan fitur sensor yang tidak dipakai.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Paksa HTTPS (aktif setelah situs disajikan via HTTPS).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // Sembunyikan header "X-Powered-By: Next.js".
  poweredByHeader: false,
  // Kompresi gzip respons (default true; eksplisit untuk kejelasan).
  compress: true,
  // Sajikan format gambar modern via next/image.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
