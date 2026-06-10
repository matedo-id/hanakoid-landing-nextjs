import { Container, SectionHeader } from "@/components/section";
import { Accordion } from "@/components/accordion";
import { faqs } from "@/lib/data";

/**
 * Section FAQ + structured data FAQPage (JSON-LD) untuk peluang rich result.
 */
export function FaqSection() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="section bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Container className="flex flex-col gap-10">
        <SectionHeader
          center
          eyebrow="FAQ"
          title="Pertanyaan yang sering diajukan"
          lead="Belum menemukan jawaban? Hubungi kami melalui WhatsApp atau halaman kontak."
        />
        <div className="mx-auto w-full max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </Container>
    </section>
  );
}
