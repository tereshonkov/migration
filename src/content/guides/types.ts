import type { ServiceCategoryCode } from "@/shared/lib/serviceCategories";

export type GuideClusterId = "kitchen" | "bedroom" | "general";

export type GuideSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
  imageIdsAfter?: number[];
};

export type GuideLocaleBlock = {
  title: string;
  description: string;
  h1: string;
  lead: string[];
  sections: GuideSection[];
};

export type GuideDefinition = {
  slugUk: string;
  slugRu: string;
  cluster: GuideClusterId;
  linkCategories: ServiceCategoryCode[];
  heroImageIds: number[];
  datePublished: string;
  uk: GuideLocaleBlock;
  ru: GuideLocaleBlock;
};
