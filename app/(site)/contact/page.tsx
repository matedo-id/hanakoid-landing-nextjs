import type { Metadata } from "next";
import { MapPin, Phone, MessageCircle, Mail, Clock } from "lucide-react";
import { Container } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { Placeholder } from "@/components/placeholder";
import { ContactForm } from "./contact-form";
import { contact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi hanako.id (PT Hanna Integrasi Solusi) di Semarang. Telepon, WhatsApp, email, dan formulir kontak untuk kebutuhan pengadaan teknologi Anda.",
};

const info = [
  { icon: MapPin, label: "Alamat", value: contact.address },
  { icon: Phone, label: "Telepon", value: contact.phone, href: contact.phoneHref },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: contact.waDisplay,
    href: contact.waLink,
    external: true,
  },
  { icon: Mail, label: "Email", value: contact.email, href: contact.emailHref },
  { icon: Clock, label: "Jam Operasional", value: contact.hours },
];

export default function ContactPage() {
  return (
    <Container className="section flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <Breadcrumb
          items={[{ label: "Beranda", href: "/" }, { label: "Kontak" }]}
        />
        <h1 className="h1">Hubungi Kami</h1>
        <p className="lead max-w-2xl">
          Punya pertanyaan atau ingin berkonsultasi? Kirim pesan atau hubungi
          kami langsung — tim kami siap membantu pada jam operasional.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.85fr]">
        <ContactForm />

        <div className="flex flex-col gap-6">
          <ul className="flex flex-col gap-5">
            {info.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-primary-050 text-primary">
                    <Icon strokeWidth={1.8} className="size-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-muted-2">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-ink-2 transition-colors hover:text-primary"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-ink-2">{item.value}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <Placeholder label="Peta Lokasi — Semarang" ratio="4/3" />
        </div>
      </div>
    </Container>
  );
}
