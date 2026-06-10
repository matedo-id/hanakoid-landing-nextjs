import type { Metadata } from "next";
import { Container } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { PortfolioGrid } from "./portfolio-grid";
import { portfolio } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Hasil pekerjaan hanako.id: command center, smart class, sistem antrian rumah sakit, videotron, CCTV, dan audio conference untuk instansi di seluruh Indonesia.",
};

export default function PortfolioPage() {
  return (
    <Container className="section flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <Breadcrumb
          items={[{ label: "Beranda", href: "/" }, { label: "Portfolio" }]}
        />
        <h1 className="h1">Portfolio</h1>
        <p className="lead max-w-2xl">
          Sebagian hasil pekerjaan kami di berbagai sektor — dari command center
          dan smart class hingga sistem antrian dan videotron. Klik tiap proyek
          untuk melihat detail lingkup dan teknologi yang digunakan.
        </p>
      </div>

      <PortfolioGrid items={portfolio} />
    </Container>
  );
}
