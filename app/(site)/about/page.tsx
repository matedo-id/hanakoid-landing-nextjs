import type { Metadata } from "next";
import { ArrowRight, Target, Eye, Award } from "lucide-react";
import { Container, SectionHeader } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { Placeholder } from "@/components/placeholder";
import { Stat } from "@/components/stat";
import { TrustStrip } from "@/components/trust-strip";
import { Reveal } from "@/components/reveal";
import { stats, whyReasons, trustLogos, contact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Profil Perusahaan",
  description:
    "PT Hanna Integrasi Solusi (hanako.id) — system integrator & penyedia pengadaan teknologi sejak 2015, melayani instansi pemerintah, kampus, dan rumah sakit di seluruh Indonesia.",
};

const values = [
  {
    icon: Target,
    title: "Misi",
    desc: "Menghadirkan solusi teknologi yang andal dan tepat guna untuk mendukung transformasi digital instansi.",
  },
  {
    icon: Eye,
    title: "Visi",
    desc: "Menjadi mitra system integrator tepercaya nomor satu bagi sektor publik dan institusi di Indonesia.",
  },
  {
    icon: Award,
    title: "Nilai",
    desc: "Integritas, kualitas, dan layanan purna jual yang responsif dalam setiap proyek yang kami kerjakan.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="section grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Breadcrumb
              items={[{ label: "Beranda", href: "/" }, { label: "Profil" }]}
            />
            <h1 className="h1">
              Mitra teknologi instansi sejak {contact.since}
            </h1>
            <p className="lead">
              {contact.company} adalah system integrator dan penyedia pengadaan
              teknologi yang berfokus pada sektor pemerintahan, pendidikan, dan
              kesehatan. Kami membantu instansi memilih, mengadakan, dan
              mengintegrasikan teknologi dengan proses yang transparan.
            </p>
            <div>
              <Button href="/rfq">
                Ajak Kami Berkolaborasi
                <ArrowRight />
              </Button>
            </div>
          </div>
          <Reveal>
            <div className="card overflow-hidden p-3 shadow-[var(--sh-lg)]">
              <Placeholder label="Tim & Proyek hanako.id" ratio="4/3" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Statistik */}
      <section className="section">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </Container>
      </section>

      {/* Cerita */}
      <section className="section bg-surface">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <SectionHeader eyebrow="Cerita Kami" title="Tumbuh bersama instansi" />
            <div className="flex flex-col gap-4 leading-relaxed text-ink-2">
              <p>
                Berdiri sejak {contact.since}, hanako.id berawal dari kebutuhan
                instansi akan penyedia teknologi yang bisa diandalkan — bukan
                sekadar menjual perangkat, tetapi memastikan solusi benar-benar
                berfungsi di lapangan.
              </p>
              <p>
                Hari ini kami telah melayani ratusan proyek di berbagai provinsi,
                mulai dari ruang kelas pintar, command center, hingga sistem
                antrian rumah sakit. Kami terdaftar resmi dengan NIB dan tersedia
                melalui e-Katalog INAPROC.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card flex gap-4 p-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-primary-050 text-primary">
                    <Icon strokeWidth={1.8} className="size-5" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="h4">{v.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Klien / portofolio */}
      <section className="section">
        <Container className="flex flex-col gap-10">
          <SectionHeader
            center
            eyebrow="Klien & Portofolio"
            title="Dipercaya lintas sektor"
            lead="Sebagian instansi yang telah bekerja sama dengan kami."
          />
          <TrustStrip logos={[...trustLogos, "Kementerian", "Puskesmas"]} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              "Smart Class Kampus",
              "Command Center Pemkot",
              "Antrian RSUD",
              "Video Wall BUMN",
            ].map((p) => (
              <Placeholder key={p} label={p} ratio="4/3" />
            ))}
          </div>
        </Container>
      </section>

      {/* Mengapa kami (ringkas) */}
      <section className="section bg-surface">
        <Container className="flex flex-col gap-10">
          <SectionHeader
            eyebrow="Keunggulan"
            title="Mengapa instansi memilih kami"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyReasons.map((r) => (
              <div key={r.title} className="card flex flex-col gap-2 p-6">
                <h3 className="h4">{r.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{r.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
