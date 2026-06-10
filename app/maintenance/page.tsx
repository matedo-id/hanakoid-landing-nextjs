import type { Metadata } from "next";
import { Wrench, MessageCircle, Phone, Mail } from "lucide-react";
import { Container } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Button } from "@/components/button";
import { Logo } from "@/components/logo";
import { contact, waLink } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sedang Dalam Perbaikan",
  description:
    "Website hanako.id sedang dalam perbaikan. Hubungi tim marketing kami untuk informasi dan kebutuhan pengadaan teknologi Anda.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-surface">
      <div className="absolute inset-0 grid-bg" aria-hidden />

      {/* Brand (pengganti navbar pada halaman standalone) */}
      <header className="relative">
        <Container className="flex h-[72px] items-center">
          <Logo />
        </Container>
      </header>

      {/* Konten utama */}
      <section className="relative flex flex-1 items-center">
        <Container className="flex flex-col items-center gap-7 py-16 text-center">
          <span
            className="grid size-20 place-items-center rounded-[20px] text-white"
            style={{
              background: "var(--color-primary)",
              boxShadow: "var(--sh-primary)",
            }}
          >
            <Wrench className="size-9" strokeWidth={1.8} />
          </span>

          <Eyebrow center>Pemeliharaan Sistem</Eyebrow>

          <h1 className="display max-w-2xl">
            Website sedang{" "}
            <span style={{ color: "var(--color-primary)" }}>
              dalam perbaikan
            </span>
          </h1>

          <p className="lead max-w-xl">
            Kami sedang meningkatkan layanan untuk pengalaman yang lebih baik.
            Sementara itu, tim marketing kami tetap siap membantu kebutuhan
            pengadaan teknologi Anda.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              href={waLink(
                `Halo ${contact.brand}, saya ingin menghubungi tim marketing.`
              )}
              external
              variant="wa"
              size="lg"
            >
              <MessageCircle />
              Hubungi Marketing
            </Button>
            <Button href={contact.phoneHref} variant="secondary" size="lg">
              <Phone />
              {contact.phone}
            </Button>
          </div>

          <div className="flex flex-col items-center gap-2 pt-2 text-sm text-muted sm:flex-row sm:gap-6">
            <a
              href={contact.emailHref}
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Mail className="size-4" strokeWidth={1.8} />
              {contact.email}
            </a>
            <span className="hidden text-border-strong sm:inline">•</span>
            <span>{contact.hours}</span>
          </div>
        </Container>
      </section>

      {/* Footer ringkas */}
      <footer className="relative">
        <Container className="py-6 text-center text-xs text-muted-2">
          © {new Date().getFullYear()} {contact.company}
        </Container>
      </footer>
    </div>
  );
}
