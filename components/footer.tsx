import Link from "next/link";
import {
  ShieldCheck,
  PackageCheck,
  Sparkles,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { categories, contact } from "@/lib/data";

const badges = [
  { icon: ShieldCheck, label: "PT Resmi · NIB" },
  { icon: PackageCheck, label: "e-Katalog INAPROC" },
  { icon: Sparkles, label: `Sejak ${contact.since}` },
];

const perusahaanLinks = [
  { label: "Profil Perusahaan", href: "/about" },
  { label: "Solusi Vertikal", href: "/solution" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Artikel", href: "/articles" },
  { label: "Kontak", href: "/contact" },
  { label: "Minta Penawaran", href: "/rfq" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="text-white/75"
      style={{ background: "var(--color-primary-dark)" }}
    >
      <div className="wrap grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div className="flex flex-col gap-5">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            {contact.company} — {contact.tagline} System integrator & pengadaan
            teknologi untuk instansi, kampus, dan rumah sakit.
          </p>
          <ul className="flex flex-col gap-2">
            {badges.map((b) => {
              const Icon = b.icon;
              return (
                <li key={b.label} className="flex items-center gap-2 text-sm">
                  <Icon
                    className="size-4 shrink-0"
                    strokeWidth={1.8}
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span className="text-white/80">{b.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Produk */}
        <FooterCol title="Produk">
          {categories.map((c) => (
            <FooterLink key={c.key} href={`/catalog?cat=${c.key}`}>
              {c.title}
            </FooterLink>
          ))}
        </FooterCol>

        {/* Perusahaan */}
        <FooterCol title="Perusahaan">
          {perusahaanLinks.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterCol>

        {/* Kontak */}
        <div className="flex flex-col gap-4">
          <h3 className="font-head text-sm font-bold uppercase tracking-wider text-white">
            Hubungi Kami
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            <ContactRow icon={MapPin}>{contact.address}</ContactRow>
            <ContactRow icon={Phone} href={contact.phoneHref}>
              {contact.phone}
            </ContactRow>
            <ContactRow icon={MessageCircle} href={contact.waLink} external>
              {contact.waDisplay}
            </ContactRow>
            <ContactRow icon={Mail} href={contact.emailHref}>
              {contact.email}
            </ContactRow>
            <ContactRow icon={Clock}>{contact.hours}</ContactRow>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="wrap flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/55 sm:flex-row">
          <p>
            © {year} {contact.company}. Hak cipta dilindungi.
          </p>
          <Link href="/" className="transition-colors hover:text-white">
            Kebijakan Privasi
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-head text-sm font-bold uppercase tracking-wider text-white">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}

function ContactRow({
  icon: Icon,
  href,
  external,
  children,
}: {
  icon: typeof MapPin;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const content = (
    <span className="flex items-start gap-2.5 leading-relaxed">
      <Icon
        className="mt-0.5 size-4 shrink-0"
        strokeWidth={1.8}
        style={{ color: "var(--color-accent)" }}
      />
      <span>{children}</span>
    </span>
  );
  return (
    <li>
      {href ? (
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="transition-colors hover:text-white"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}
