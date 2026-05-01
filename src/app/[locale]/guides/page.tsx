import messages from "@/messages/uk.json";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildGuidesHubMetadata } from "@/shared/lib/guideMetadata";
import GuidesHubPage from "@/views/GuidesHubPage/GuidesHubPage";

export function generateStaticParams(): { locale: Locale }[] {
  return [{ locale: "uk" }, { locale: "ru" }];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "en") return {};
  if (locale === "uk") {
    const g = messages.guides;
    return buildGuidesHubMetadata({
      locale: "uk",
      title: g.seoHubTitle,
      description: g.seoHubDescription,
    });
  }
  const t = await getTranslations({ locale, namespace: "guides" });
  return buildGuidesHubMetadata({
    locale,
    title: t("seoHubTitle"),
    description: t("seoHubDescription"),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (locale === "en") notFound();
  if (!(locale === "uk" || locale === "ru")) notFound();

  setRequestLocale(locale);

  if (locale === "uk") {
    const g = messages.guides;
    return (
      <GuidesHubPage
        locale="uk"
        copy={{
          homeLabel: messages.header.home,
          breadcrumbSelf: g.breadcrumb,
          hubTitle: g.hubTitle,
          hubSubtitle: g.hubSubtitle,
          clusterKitchen: g.clusterKitchen,
          clusterBedroom: g.clusterBedroom,
          clusterGeneral: g.clusterGeneral,
          readArticle: g.readArticle,
        }}
      />
    );
  }

  const tGuide = await getTranslations({ locale, namespace: "guides" });
  const tHeader = await getTranslations({ locale, namespace: "header" });

  return (
    <GuidesHubPage
      locale={locale}
      copy={{
        homeLabel: tHeader("home"),
        breadcrumbSelf: tGuide("breadcrumb"),
        hubTitle: tGuide("hubTitle"),
        hubSubtitle: tGuide("hubSubtitle"),
        clusterKitchen: tGuide("clusterKitchen"),
        clusterBedroom: tGuide("clusterBedroom"),
        clusterGeneral: tGuide("clusterGeneral"),
        readArticle: tGuide("readArticle"),
      }}
    />
  );
}
