import { MetadataRoute } from "next";
import { getAllSeriesSlugs } from "@/data/series-data";
import { getAllSeriesSlugs as getDeepWellSlugs } from "@/data/deep-well-pump-series";
import { getAllSlugs as getBlogSlugs } from "@/lib/blog";

const baseUrl = "https://alfagrandpumps.com";
const locales = ["en", "es", "fr", "ar", "pt", "ru"] as const;

const productSlugs = [
  "peripheral-pump",
  "centrifugal-pump",
  "solar-pump-system",
  "deep-well-pump",
  "self-priming-jet-pump",
  "submersible-sewage-pump",
  "variable-frequency-pump",
  "multi-stage-pump-sets",
];

const accessorySlugs = [
  "pressure-controller",
  "pressure-tank",
  "water-valve",
];

// Solar Pump System — 21 series slugs (mirrored from page.tsx)
const solarSeriesSlugs = [
  "2inch-dc-screw-impeller", "3-4inch-dc-screw", "3inch-dc-plastic-impeller",
  "3inch-dc-ss-impeller", "4inch-dc-plastic-impeller", "4-6inch-dc-ss-impeller",
  "psqb-dc-surface", "psgj-dc-surface", "phf-dc-surface", "pzsu-dc-surface",
  "psp-dc-pool", "peqdx-dc-submersible", "psg-dc-submersible",
  "3inch-acdc-plastic-impeller", "3inch-acdc-ss-impeller",
  "4inch-acdc-plastic-impeller", "4-6inch-acdc-ss-impeller",
  "pzsu-acdc-surface", "phf-acdc-surface", "psp-acdc-pool", "psg-acdc-submersible",
];

type LocaleString = (typeof locales)[number];

function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = locale === "en"
      ? `${baseUrl}${path}`
      : `${baseUrl}/${locale}${path}`;
  }
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // ── Homepage ──
  entries.push({
    url: baseUrl,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: buildAlternates("/"),
  });

  // ── Static pages ──
  const staticPages = ["/products", "/about", "/contact", "/news", "/privacy", "/terms"];
  for (const page of staticPages) {
    entries.push({
      url: `${baseUrl}${page}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: page === "/products" ? 0.9 : 0.7,
      alternates: buildAlternates(page),
    });
  }

  // ── Product category pages ──
  for (const slug of productSlugs) {
    const path = `/products/${slug}`;
    entries.push({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: buildAlternates(path),
    });
  }

  // ── Accessory pages ──
  for (const slug of accessorySlugs) {
    const path = `/products/${slug}`;
    entries.push({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: buildAlternates(path),
    });
  }

  // ── Standard product series (from series-data.ts) ──
  const seriesSlugs = getAllSeriesSlugs();
  for (const { slug, series } of seriesSlugs) {
    const path = `/products/${slug}/${series}`;
    entries.push({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: buildAlternates(path),
    });
  }

  // ── Deep Well Pump series ──
  const dwSlugs = getDeepWellSlugs();
  for (const series of dwSlugs) {
    const path = `/products/deep-well-pump/${series}`;
    entries.push({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: buildAlternates(path),
    });
  }

  // ── Solar Pump System series ──
  for (const series of solarSeriesSlugs) {
    const path = `/products/solar-pump-system/${series}`;
    entries.push({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: buildAlternates(path),
    });
  }

  // ── Blog / News article pages ──
  const blogSlugs = getBlogSlugs();
  for (const slug of blogSlugs) {
    const path = `/news/${slug}`;
    entries.push({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: buildAlternates(path),
    });
  }

  return entries;
}
