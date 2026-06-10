import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";

/**
 * Layout untuk seluruh halaman situs (dengan Navbar, Footer, dan tombol
 * WhatsApp mengambang). Halaman standalone seperti /maintenance berada di
 * luar grup ini sehingga tidak ikut me-render chrome.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
