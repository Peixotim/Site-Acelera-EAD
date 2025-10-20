import React from 'react';

// Tipos para simplificar a passagem de dados do parceiro
interface OrganizationSchemaProps {
    organizationName: string;
    description: string;
    
    phone?: string;
    addressState?: string;
    type?: string; 
}

export const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({
  organizationName,
  description,
  phone,
  addressState,
  type = "Organization", 
}) => {

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    "name": organizationName,
    "description": description,
    
    // Adiciona contato se o teleone for fornecido
    ...(phone && { 
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": phone,
            "contactType": "Geral"
        }
    }),
    
    // Adiciona endereço se o estado for fornecido (usando StructuredValue)
    ...(addressState && {
        "address": {
            "@type": "PostalAddress",
            "addressRegion": addressState,
            
        }
    }),
    
   
  };

  return (
    // Usamos a tag <script> nativa para evitar o erro de resolução do next/script
    <script
      id={`organization-schema-${organizationName.replace(/\s/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
    />
  );
};
