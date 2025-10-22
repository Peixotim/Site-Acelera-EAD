"use client";

import Script from "next/script";

export default function SchemaOrg() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://colegioaceleraead.com.br#organization",
        name: "Colégio Acelera EAD",
        url: "https://colegioaceleraead.com.br",
        logo: "https://colegioaceleraead.com.br/logo.png",
        description:
          "O Colégio Acelera EAD oferece cursos técnicos e profissionalizantes online com foco em empregabilidade e inovação no mercado.",
        sameAs: [
          "https://www.instagram.com/colegioaceleraead",
          "https://www.facebook.com/colegioaceleraead",
          "https://www.linkedin.com/school/colegioaceleraead",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "R. Luiz Rodrigues dos Santos, 44 - Todos Os Santos",
          addressLocality: "Cel. Fabriciano",
          addressRegion: "MG",
          postalCode: "35170-037",
          addressCountry: "BR",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+55-31-97314-4070",
          contactType: "customer service",
          areaServed: "BR",
          availableLanguage: ["Portuguese"],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://colegioaceleraead.com.br#website",
        url: "https://colegioaceleraead.com.br",
        name: "Colégio Acelera EAD",
        publisher: { "@id": "https://colegioaceleraead.com.br#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://colegioaceleraead.com.br/?s={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://colegioaceleraead.com.br#webpage",
        url: "https://colegioaceleraead.com.br",
        name: "Colégio Acelera EAD - Cursos Técnicos e Profissionalizantes Online",
        isPartOf: { "@id": "https://colegioaceleraead.com.br#website" },
        about: { "@id": "https://colegioaceleraead.com.br#organization" },
        description:
          "Educação técnica de excelência online. Descubra nossos cursos com foco em empregabilidade e inovação.",
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://colegioaceleraead.com.br#localbusiness",
        name: "Colégio Acelera EAD",
        image: "https://colegioaceleraead.com.br/logo.png",
        address: {
          "@type": "PostalAddress",
          streetAddress: "R. Luiz Rodrigues dos Santos, 44 - Todos Os Santos",
          addressLocality: "Cel. Fabriciano",
          addressRegion: "MG",
          postalCode: "35170-037",
          addressCountry: "BR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -19.5187,
          longitude: -42.6269,
        },
        telephone: "+55-31-97314-4070",
        url: "https://colegioaceleraead.com.br",
      },
      {
        "@type": "Course",
        name: "Técnico em Agente Comunitário de Saúde - Por Competência",
        description:
          "Capacitar o profissional para ser o elo vital entre a comunidade e os serviços de saúde, fortalecendo o SUS.",
        provider: { "@id": "https://colegioaceleraead.com.br#organization" },
      },
      {
        "@type": "Course",
        name: "Técnico em Logística",
        description:
          "Formação para atuar em gestão da cadeia de suprimentos, transporte, estoque e processos logísticos.",
        provider: { "@id": "https://colegioaceleraead.com.br#organization" },
      },
    ],
  };

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
