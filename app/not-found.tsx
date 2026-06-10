import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/section";
import { Button } from "@/components/button";

export default function NotFound() {
  return (
    <Container className="section flex flex-col items-center gap-6 py-28 text-center">
      <span className="font-head text-7xl font-extrabold tracking-tight text-primary">
        404
      </span>
      <h1 className="h2">Halaman tidak ditemukan</h1>
      <p className="lead max-w-md">
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Button href="/">
        <ArrowLeft />
        Kembali ke Beranda
      </Button>
    </Container>
  );
}
