import type { Metadata } from "next";
import { Container } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { RfqForm } from "./rfq-form";

export const metadata: Metadata = {
  title: "Minta Penawaran (RFQ)",
  description:
    "Ajukan permintaan penawaran (Request for Quote) untuk kebutuhan pengadaan teknologi instansi Anda. Tim hanako.id akan menyusun penawaran terbaik.",
};

export default async function RfqPage({
  searchParams,
}: {
  searchParams: Promise<{ produk?: string; solusi?: string }>;
}) {
  const sp = await searchParams;
  return (
    <Container className="section flex max-w-4xl flex-col gap-8">
      <div className="flex flex-col gap-5">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Minta Penawaran" },
          ]}
        />
        <h1 className="h1">Minta Penawaran</h1>
        <p className="lead">
          Lengkapi formulir berikut untuk mengajukan permintaan penawaran. Tim
          sales kami akan menyusun penawaran resmi sesuai kebutuhan dan anggaran
          instansi Anda.
        </p>
      </div>

      <RfqForm initialProduct={sp.produk} initialSolution={sp.solusi} />
    </Container>
  );
}
