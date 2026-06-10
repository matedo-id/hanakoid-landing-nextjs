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
        src: "/logo-hanakoid.webp",
        sizes: "433x300",
        type: "image/webp",
      },
    ],
  };
}
