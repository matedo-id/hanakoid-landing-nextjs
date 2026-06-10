"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Menu,
  X,
  MessageCircle,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/button";
import { cn } from "@/lib/cn";
import { categories, waLink } from "@/lib/data";

const navLinks = [
  { label: "Produk", href: "/catalog", mega: true },
  { label: "Solusi", href: "/solution" },
  { label: "Profil", href: "/about" },
  { label: "Artikel", href: "/articles" },
  { label: "Kontak", href: "/contact" },
];

export function Navbar() {
  const router = useRouter();
  const [drawer, setDrawer] = useState(false);
  const [mega, setMega] = useState(false);
  const [search, setSearch] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Kunci scroll saat drawer terbuka.
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  useEffect(() => {
    if (search) searchRef.current?.focus();
  }, [search]);

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim();
    setSearch(false);
    router.push(q ? `/catalog?q=${encodeURIComponent(q)}` : "/catalog");
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md"
      style={{ height: "var(--nav-h)" }}
    >
      <div className="wrap flex h-full items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 min-[861px]:flex">
          {navLinks.map((link) =>
            link.mega ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setMega(true)}
                onMouseLeave={() => setMega(false)}
              >
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1 rounded-[8px] px-3.5 py-2 text-[15px] font-medium text-ink-2 transition-colors hover:text-primary"
                  aria-expanded={mega}
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform",
                      mega && "rotate-180"
                    )}
                  />
                </Link>
                {mega && <MegaMenu />}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[8px] px-3.5 py-2 text-[15px] font-medium text-ink-2 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 min-[861px]:flex">
          <button
            type="button"
            aria-label="Cari produk"
            onClick={() => setSearch((v) => !v)}
            className="icon-btn"
          >
            <Search />
          </button>
          <Button href={waLink()} external variant="wa" size="sm">
            <MessageCircle />
            WhatsApp
          </Button>
          <Button href="/rfq" size="sm">
            Minta Penawaran
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 min-[861px]:hidden">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat WhatsApp"
            className="icon-btn"
            style={{ color: "var(--color-wa)" }}
          >
            <MessageCircle />
          </a>
          <button
            type="button"
            aria-label="Buka menu"
            aria-expanded={drawer}
            onClick={() => setDrawer(true)}
            className="icon-btn"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {search && (
        <div className="absolute inset-x-0 top-full border-b border-border bg-white shadow-[var(--sh-md)]">
          <form onSubmit={onSearch} className="wrap flex items-center gap-3 py-3">
            <Search className="size-5 text-muted" />
            <input
              ref={searchRef}
              name="q"
              type="search"
              placeholder="Cari produk, kategori, atau SKU…"
              className="h-10 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-2"
            />
            <button
              type="button"
              aria-label="Tutup pencarian"
              onClick={() => setSearch(false)}
              className="icon-btn"
            >
              <X />
            </button>
          </form>
        </div>
      )}

      {/* Mobile drawer */}
      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </header>
  );
}

function MegaMenu() {
  return (
    <div className="absolute left-1/2 top-full z-50 w-[760px] max-w-[92vw] -translate-x-1/2 pt-3">
      <div className="card grid grid-cols-1 gap-5 p-5 shadow-[var(--sh-lg)] lg:grid-cols-[1fr_240px]">
        <div className="grid grid-cols-2 gap-1">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.key}
                href={`/catalog?cat=${c.key}`}
                className="group flex items-start gap-3 rounded-[10px] p-3 transition-colors hover:bg-surface"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-[8px] bg-primary-050 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon strokeWidth={1.8} className="size-[18px]" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-ink">
                    {c.title}
                  </span>
                  <span className="text-xs leading-snug text-muted">
                    {c.desc}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-[12px] bg-primary-dark p-5 text-white">
          <div className="flex flex-col gap-2">
            <span className="h4 text-white">Butuh paket lengkap?</span>
            <p className="text-sm text-white/75">
              Konsultasikan kebutuhan instansi Anda, kami susun solusi end-to-end.
            </p>
          </div>
          <Link
            href="/rfq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white"
          >
            Minta penawaran
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-ink/40 transition-opacity duration-300 min-[861px]:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-[84vw] max-w-[360px] flex-col bg-white shadow-[var(--sh-lg)] transition-transform duration-300 min-[861px]:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
        style={{ transitionTimingFunction: "var(--ease)" }}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Logo />
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={onClose}
            className="icon-btn"
          >
            <X />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-[8px] px-3 py-3 text-[16px] font-medium text-ink transition-colors hover:bg-surface hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
          <Button href={waLink()} external variant="wa" block onClick={onClose}>
            <MessageCircle />
            Chat WhatsApp
          </Button>
          <Button href="/rfq" block onClick={onClose}>
            Minta Penawaran
          </Button>
        </div>
      </aside>
    </>
  );
}
