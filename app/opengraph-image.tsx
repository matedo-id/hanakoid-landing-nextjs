import { ImageResponse } from "next/og";

export const alt = "hanako.id — Best Partner for Your IT Solution";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #441852 0%, #7D2A8E 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 44, fontWeight: 800 }}>
          hanako
          <span style={{ color: "#06B6D4" }}>.id</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#E6FBFF",
            }}
          >
            System Integrator &amp; Pengadaan Teknologi
          </div>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.05 }}>
            Best Partner for Your IT Solution
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "rgba(255,255,255,0.8)" }}>
          Pemerintah · Kampus · Rumah Sakit — sejak 2015
        </div>
      </div>
    ),
    { ...size }
  );
}
