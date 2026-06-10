import { MessageCircle } from "lucide-react";
import { contact, waLink } from "@/lib/data";

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink(`Halo ${contact.brand}, saya ingin berkonsultasi.`)}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label="Chat Sales via WhatsApp"
    >
      <MessageCircle strokeWidth={1.9} />
      <span className="wa-float__label">Chat Sales</span>
    </a>
  );
}
