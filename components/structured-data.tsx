import { contact, siteUrl } from "@/lib/data";

/**
 * JSON-LD structured data global (Organization + WebSite) untuk membantu
 * Google memahami entitas bisnis & menampilkan rich result.
 */
export function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: contact.company,
    alternateName: contact.brand,
    url: siteUrl,
    logo: `${siteUrl}/logo-hanakoid.webp`,
    slogan: contact.tagline,
    foundingDate: contact.since,
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Menteri Supeno I No. 26, Mugassari, Semarang Selatan",
      addressLocality: "Semarang",
      addressRegion: "Jawa Tengah",
      postalCode: "50249",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phone,
      contactType: "sales",
      email: contact.email,
      availableLanguage: ["id"],
    },
    areaServed: "ID",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: contact.brand,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "id-ID",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/catalog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organization, website]),
      }}
    />
  );
}
