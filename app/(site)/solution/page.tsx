import type { Metadata } from "next";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { Container, SectionHeader } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { Steps } from "@/components/steps";
import { solutions, processSteps, waLink } from "@/lib/data";

export const metadata: Metadata = {
  title: "Solusi & Paket Vertikal",
  description:
    "Solusi teknologi terintegrasi per sektor: rumah sakit, kampus/smart class, kantor pemerintahan, command center, retail, perhotelan, dan lainnya.",
};

export default function SolutionPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="section flex flex-col gap-5">
          <Breadcrumb
            items={[{ label: "Beranda", href: "/" }, { label: "Solusi" }]}
          />
          <h1 className="h1 max-w-2xl">
            Solusi terintegrasi untuk setiap sektor
          </h1>
          <p className="lead max-w-2xl">
            Kami menggabungkan produk, instalasi, dan dukungan menjadi paket
            yang dirancang sesuai kebutuhan operasional instansi Anda.
          </p>
        </Container>
      </section>

      <section className="section">
        <Container className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {solutions.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal
                key={s.key}
                delay={(i % 2) * 80}
                className="scroll-mt-28"
              >
                <div id={s.key} className="card flex h-full flex-col gap-5 p-7">
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-[12px] bg-primary-050 text-primary">
                      <Icon strokeWidth={1.8} className="size-6" />
                    </span>
                    <div className="flex flex-col">
                      <h2 className="h3">{s.title}</h2>
                      <p className="text-sm text-muted">{s.desc}</p>
                    </div>
                  </div>
                  <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-ink-2"
                      >
                        <Check
                          className="size-4 shrink-0 text-primary"
                          strokeWidth={2.4}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-2">
                    <Button href={`/rfq?solusi=${s.key}`} variant="secondary" size="sm">
                      Minta paket {s.title}
                      <ArrowRight />
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </Container>
      </section>

      <section className="section bg-surface">
        <Container className="flex flex-col gap-12">
          <SectionHeader
            eyebrow="Cara Kerja"
            title="Implementasi yang terukur"
            lead="Setiap paket kami kerjakan dengan proses yang jelas dari awal hingga purna jual."
          />
          <Steps steps={processSteps} />
        </Container>
      </section>

      <section className="section">
        <Container>
          <div
            className="relative overflow-hidden rounded-[20px] px-8 py-14 text-center text-white sm:px-14"
            style={{ background: "var(--color-primary-dark)" }}
          >
            <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
              <h2 className="h1 text-white">Belum menemukan paket yang pas?</h2>
              <p className="text-white/75">
                Ceritakan kebutuhan Anda, kami susun solusi khusus sesuai
                anggaran dan kondisi lapangan.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/rfq" size="lg">
                  Konsultasi Kebutuhan
                  <ArrowRight />
                </Button>
                <Button href={waLink()} external variant="wa" size="lg">
                  <MessageCircle />
                  Chat Sales
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
