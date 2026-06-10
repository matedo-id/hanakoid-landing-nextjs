import { contact } from "@/lib/data";

export type LeadType = "contact" | "rfq";

export interface LeadItem {
  product: string;
  qty: number;
}

export interface LeadPayload {
  type: LeadType;
  name: string;
  email: string;
  instansi?: string;
  phone?: string;
  message?: string;
  /** RFQ extras */
  instansiType?: string;
  timeline?: string;
  budget?: string;
  location?: string;
  items?: LeadItem[];
  /** Tracking */
  source?: string;
  page?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidLead(lead: Partial<LeadPayload>): lead is LeadPayload {
  return Boolean(
    lead &&
      typeof lead.name === "string" &&
      lead.name.trim() &&
      typeof lead.email === "string" &&
      EMAIL_RE.test(lead.email) &&
      (lead.type === "contact" || lead.type === "rfq")
  );
}

/** Susun pesan WhatsApp terstruktur dari data lead. */
export function buildWhatsAppMessage(lead: LeadPayload): string {
  const lines: string[] = [];
  lines.push(
    lead.type === "rfq"
      ? `Halo ${contact.brand}, saya ingin mengajukan permintaan penawaran (RFQ).`
      : `Halo ${contact.brand}, saya ingin mengirim pesan.`
  );
  lines.push("");
  lines.push(`Nama: ${lead.name}`);
  if (lead.instansi) lines.push(`Instansi: ${lead.instansi}`);
  if (lead.instansiType) lines.push(`Jenis Instansi: ${lead.instansiType}`);
  lines.push(`Email: ${lead.email}`);
  if (lead.phone) lines.push(`Telepon: ${lead.phone}`);
  if (lead.timeline) lines.push(`Target Pengadaan: ${lead.timeline}`);
  if (lead.location) lines.push(`Lokasi: ${lead.location}`);
  if (lead.budget) lines.push(`Estimasi Anggaran: ${lead.budget}`);

  if (lead.items && lead.items.length > 0) {
    lines.push("");
    lines.push("Item pengadaan:");
    for (const it of lead.items) lines.push(`- ${it.product} × ${it.qty}`);
  }

  if (lead.message) {
    lines.push("");
    lines.push(`Pesan: ${lead.message}`);
  }

  return lines.join("\n");
}

/** Tautan WhatsApp ke nomor sales dengan pesan lead terisi. */
export function leadWaLink(lead: LeadPayload): string {
  return `https://wa.me/${contact.waNumber}?text=${encodeURIComponent(
    buildWhatsAppMessage(lead)
  )}`;
}
