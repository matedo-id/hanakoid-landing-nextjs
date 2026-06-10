import { NextResponse } from "next/server";
import { isValidLead, type LeadPayload } from "@/lib/lead";

// Selalu dinamis (jangan di-cache).
export const dynamic = "force-dynamic";

interface LeadBody extends Partial<LeadPayload> {
  /** Honeypot anti-spam — harus kosong. */
  _gotcha?: string;
}

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  // Honeypot terisi → kemungkinan bot. Balas sukses diam-diam (jangan proses).
  if (body._gotcha) {
    return NextResponse.json({ ok: true });
  }

  const lead: Partial<LeadPayload> = { ...body };
  delete (lead as LeadBody)._gotcha;
  if (!isValidLead(lead)) {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 422 }
    );
  }

  const record = {
    ...lead,
    receivedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? undefined,
  };

  // Teruskan ke webhook bila dikonfigurasi (Make/Zapier/n8n/Apps Script/Slack/CRM).
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) {
        console.error("[lead] webhook responded", res.status);
      }
    } catch (err) {
      // Jangan gagalkan permintaan pengguna hanya karena webhook gagal —
      // WhatsApp tetap menjadi kanal cadangan di sisi klien.
      console.error("[lead] webhook error", err);
    }
  } else {
    // Tanpa webhook: minimal catat ke log server agar tidak hilang.
    console.log("[lead]", JSON.stringify(record));
  }

  return NextResponse.json({ ok: true });
}
