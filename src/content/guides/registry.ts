import { bedroomGuides } from "./bedroomArticles";
import { generalGuides } from "./generalArticles";
import { kitchenGuides } from "./kitchenArticles";
import type { GuideClusterId, GuideDefinition } from "./types";

export const ALL_GUIDES: GuideDefinition[] = [
  ...kitchenGuides,
  ...bedroomGuides,
  ...generalGuides,
];

const bySlug = new Map<string, GuideDefinition>();
for (const g of ALL_GUIDES) {
  bySlug.set(g.slugUk, g);
  bySlug.set(g.slugRu, g);
}

/** Resolves Ukrainian or Russian URL segment → article. */
export function getGuideBySlug(slug: string): GuideDefinition | undefined {
  return bySlug.get(slug);
}

export function listGuideSlugsUk(): string[] {
  return ALL_GUIDES.map((g) => g.slugUk);
}

export function listGuideSlugsRu(): string[] {
  return ALL_GUIDES.map((g) => g.slugRu);
}

export function guidesInCluster(cluster: GuideClusterId): GuideDefinition[] {
  return ALL_GUIDES.filter((g) => g.cluster === cluster);
}
