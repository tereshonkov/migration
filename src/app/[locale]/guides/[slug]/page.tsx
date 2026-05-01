import {
  getGuideBySlug,
  listGuideSlugsRu,
  listGuideSlugsUk,
} from "@/content/guides/registry";
import GuideArticlePage from "@/views/GuideArticlePage/GuideArticlePage";
import { buildGuideArticleMetadata } from "@/shared/lib/guideMetadata";
import messages from "@/messages/uk.json";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams(): { locale: Locale; slug: string }[] {
  const uk = listGuideSlugsUk().map((slug) => ({
    locale: "uk" as Locale,
    slug,
  }));
  const ru = listGuideSlugsRu().map((slug) => ({
    locale: "ru" as Locale,
    slug,
  }));
  return [...uk, ...ru];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale === "en") return {};

  const guide = getGuideBySlug(slug);
  if (
    !guide ||
    (locale === "uk" && guide.slugUk !== slug) ||
    (locale === "ru" && guide.slugRu !== slug)
  ) {
    return {};
  }

  return buildGuideArticleMetadata({ locale, guide });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale === "en") notFound();
  if (!(locale === "uk" || locale === "ru")) notFound();

  const guide = getGuideBySlug(slug);
  if (!guide) notFound();
  if (locale === "uk" && guide.slugUk !== slug) notFound();
  if (locale === "ru" && guide.slugRu !== slug) notFound();

  setRequestLocale(locale);

  if (locale === "uk") {
    return (
      <GuideArticlePage
        locale="uk"
        guide={guide}
        copy={{
          homeLabel: messages.header.home,
          guidesHubLabel: messages.guides.breadcrumb,
          relatedHeading: messages.guides.relatedHeading,
          portfolioKitchen: messages.furniture.kitchens,
          portfolioWardrobe: messages.furniture.wardrobes,
          portfolioBedroom: messages.furniture.bedrooms,
          portfolioStore: messages.furniture.stores,
          portfolioProjectPrefix: messages.guides.portfolioProjectPrefix,
        }}
      />
    );
  }

  const tHeader = await getTranslations({ locale, namespace: "header" });
  const tGuide = await getTranslations({ locale, namespace: "guides" });
  const tFurniture = await getTranslations({ locale, namespace: "furniture" });

  return (
    <GuideArticlePage
      locale={locale}
      guide={guide}
      copy={{
        homeLabel: tHeader("home"),
        guidesHubLabel: tGuide("breadcrumb"),
        relatedHeading: tGuide("relatedHeading"),
        portfolioKitchen: tFurniture("kitchens"),
        portfolioWardrobe: tFurniture("wardrobes"),
        portfolioBedroom: tFurniture("bedrooms"),
        portfolioStore: tFurniture("stores"),
        portfolioProjectPrefix: tGuide("portfolioProjectPrefix"),
      }}
    />
  );
}
