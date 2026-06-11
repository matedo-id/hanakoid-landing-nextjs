import type { MetadataRoute } from "next";
import { contact } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${contact.brand} — ${contact.company}`,
    short_name: contact.brand,
    description: `${contact.company} — ${contact.tagline}`,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7D2A8E",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
