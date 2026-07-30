import { getTranslations } from "next-intl/server";
import { generateOrganizationSchema } from "@/lib/schema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import ManufacturingCapability from "@/components/sections/ManufacturingCapability";
import ApplicationIndustries from "@/components/sections/ApplicationIndustries";
import CertificatesStandards from "@/components/sections/CertificatesStandards";
import KnowledgeCenter from "@/components/sections/KnowledgeCenter";
import CTASection from "@/components/sections/CTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const orgSchema = generateOrganizationSchema(locale);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <Navbar />
      <main>
        <HeroSection />
        <ProductsSection locale={locale} />
        <AdvantagesSection />
        <ManufacturingCapability />
        <ApplicationIndustries />
        <CertificatesStandards />
        <KnowledgeCenter locale={locale} />
        <CTASection />
      </main>
      <Footer locale={locale} />
    </>
  );
}
