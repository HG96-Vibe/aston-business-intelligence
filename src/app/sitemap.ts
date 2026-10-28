import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/* Every public page, with trailing slashes to match the live addresses. */
const pages: [string, number][] = [
  ["/", 1],
  ["/services/", 0.9],
  ["/services/data-bi/", 0.8],
  ["/services/business-analysis/", 0.8],
  ["/services/ai-consulting/", 0.8],
  ["/services/project-delivery/", 0.8],
  ["/scorecard/", 0.7],
  ["/about/", 0.6],
  ["/contact/", 0.6],
  ["/careers/", 0.5],
  ["/privacy/", 0.2],
  ["/terms/", 0.2],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map(([path, priority]) => ({ url: `${site.url}${path}`, lastModified, priority }));
}
