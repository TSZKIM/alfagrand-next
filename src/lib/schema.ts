export function generateOrganizationSchema(locale: string) {
  const baseUrl = "https://alfagrandpumps.com";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ALFAGRAND",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: getOrgDescription(locale),
    foundingDate: "2017",
    areaServed: ["Southeast Asia", "Middle East", "South America", "Africa"],
    knowsLanguage: ["en", "es", "fr", "ar"],
  };
}

export function generateProductSchema(product: {
  name: string;
  slug: string;
  desc: string;
  image: string;
}) {
  const baseUrl = "https://alfagrandpumps.com";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.desc,
    image: `${baseUrl}${product.image}`,
    url: `${baseUrl}/products/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: "ALFAGRAND",
    },
  };
}

function getOrgDescription(locale: string): string {
  const descs: Record<string, string> = {
    en: "Professional water pump manufacturer since 2017, supplying vortex pumps, centrifugal pumps, submersible pumps, solar pumps and accessories to 50+ countries worldwide.",
    es: "Fabricante profesional de bombas de agua desde 2017, suministrando bombas vortex, centrifugas, sumergibles, solares y accesorios a 50+ paises.",
    fr: "Fabricant profesionnel de pompes à eau depuis 2017, fournissant des pompes vortex, centrifuges, submersibles, solaires et accesoires à 50+ pays.",
    ar: "مصنع متخصص لمضخات المياه منذ 2017، نورد مضخات الدوامة والطاردة المركزية والمغمورة والشمسية والاكسسوارات إلى 50+ دولة.",
  };
  return descs[locale] || descs.en;
}
