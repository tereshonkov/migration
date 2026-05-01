import type { GuideDefinition } from "@/content/guides/types";
import Footer from "@/widgets/footer/Footer";
import Header from "@/widgets/header/Header";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/shared/ui/AnimatedSection/AnimatedSection";
import { JsonLd } from "@/shared/ui/JsonLd/JsonLd";
import {
  buildBreadcrumbListJsonLd,
  siteAbsolutePath,
} from "@/shared/lib/breadcrumbJsonLd";
import {
  guideArticlePath,
  localizedServiceCategoryPath,
} from "@/shared/lib/guideRoutes";
import { resolveGuideImages } from "@/shared/lib/guideMedia";
import type { ServiceCategoryCode } from "@/shared/lib/serviceCategories";
import styles from "./GuideArticlePage.module.css";

export type GuideArticleCopy = {
  homeLabel: string;
  guidesHubLabel: string;
  relatedHeading: string;
  portfolioKitchen: string;
  portfolioWardrobe: string;
  portfolioBedroom: string;
  portfolioStore: string;
  portfolioProjectPrefix: string;
};

function categoryPortfolioLabel(
  copy: GuideArticleCopy,
  code: ServiceCategoryCode,
): string {
  switch (code) {
    case "KITCHEN":
      return copy.portfolioKitchen;
    case "WARDROBE":
      return copy.portfolioWardrobe;
    case "BEDROOM":
      return copy.portfolioBedroom;
    default:
      return copy.portfolioStore;
  }
}

function articleJsonLd(locale: string, guide: GuideDefinition) {
  const block = locale === "uk" ? guide.uk : guide.ru;
  const path = guideArticlePath(locale, guide);
  const firstId = guide.heroImageIds[0];
  const firstImg =
    firstId != null ? resolveGuideImages([firstId])[0] : undefined;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: block.h1,
    description: block.description,
    datePublished: guide.datePublished,
    mainEntityOfPage: siteAbsolutePath(locale, path),
    author: { "@type": "Organization", name: "T-Mebel" },
    publisher: {
      "@type": "Organization",
      name: "T-Mebel",
      logo: {
        "@type": "ImageObject",
        url: "https://t-mebel.com.ua/logo.svg",
      },
    },
  };

  if (firstImg?.url) data.image = [firstImg.url];
  return data;
}

type Props = {
  locale: string;
  guide: GuideDefinition;
  copy: GuideArticleCopy;
};

export default function GuideArticlePage({ locale, guide, copy }: Props) {
  const block = locale === "uk" ? guide.uk : guide.ru;
  const hubPath = "/guides";

  const breadcrumbJsonLd = buildBreadcrumbListJsonLd(locale, [
    { name: copy.homeLabel, path: "" },
    {
      name: copy.guidesHubLabel,
      path: locale === "uk" ? hubPath : `/${locale}${hubPath}`,
    },
    {
      name: block.h1,
      path: guideArticlePath(locale, guide),
    },
  ]);

  const articleLd = articleJsonLd(locale, guide);
  const heroImages = resolveGuideImages(guide.heroImageIds);

  return (
    <>
      <Header />
      <div className={`container ${styles.page}`}>
        <JsonLd data={breadcrumbJsonLd} />
        <JsonLd data={articleLd} />

        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link
            className={styles.crumbLink}
            href={locale === "uk" ? "/" : `/${locale}`}
          >
            {copy.homeLabel}
          </Link>
          <span className={styles.crumbSep} aria-hidden>
            /
          </span>
          <Link
            className={styles.crumbLink}
            href={locale === "uk" ? hubPath : `/${locale}${hubPath}`}
          >
            {copy.guidesHubLabel}
          </Link>
          <span className={styles.crumbSep} aria-hidden>
            /
          </span>
          <span className={styles.crumbCurrent}>{block.h1}</span>
        </nav>

        <main className={styles.main}>
          <AnimatedSection>
            <h1 className={styles.title}>{block.h1}</h1>
            <div className={styles.lead}>
              {block.lead.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className={styles.heroGrid}>
              {heroImages.map((img) => (
                <figure key={img.productId} className={styles.heroFigure}>
                  <div className={styles.heroImageWrap}>
                    <Image
                      className={styles.coverImage}
                      src={img.url}
                      alt={img.title}
                      width={900}
                      height={600}
                      sizes="(max-width: 940px) 100vw, 900px"
                    />
                  </div>
                  <figcaption className={styles.heroCaption}>
                    <Link
                      prefetch={false}
                      className={styles.projectLink}
                      href={
                        locale === "uk"
                          ? `/service/${img.productId}`
                          : `/${locale}/service/${img.productId}`
                      }
                    >
                      {copy.portfolioProjectPrefix} · #{img.productId}
                    </Link>
                  </figcaption>
                </figure>
              ))}
            </div>

            {block.sections.map((section, sIdx) => {
              const imgsAfter = section.imageIdsAfter?.length
                ? resolveGuideImages(section.imageIdsAfter)
                : [];

              return (
                <AnimatedSection
                  key={section.heading ?? `sec-${String(sIdx)}`}
                  delay={60}
                >
                  <section className={styles.section}>
                    {section.heading ? (
                      <h2 className={styles.sectionHeading}>
                        {section.heading}
                      </h2>
                    ) : null}
                    <div className={styles.sectionBody}>
                      {section.paragraphs.map((p) => (
                        <p key={p} className={styles.paragraph}>
                          {p}
                        </p>
                      ))}
                      {section.bullets?.length ? (
                        <ul className={styles.bulletList}>
                          {section.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>

                    {imgsAfter.length ? (
                      <div className={styles.inlineFigureRow}>
                        {imgsAfter.map((img) => (
                          <figure
                            key={img.productId}
                            className={styles.inlineFigure}
                          >
                            <div className={styles.inlineImgWrap}>
                              <Image
                                className={styles.coverImage}
                                src={img.url}
                                alt={img.title}
                                width={740}
                                height={480}
                                sizes="(max-width: 800px) 100vw, 740px"
                              />
                            </div>
                            <figcaption className={styles.inlineCaption}>
                              <Link
                                prefetch={false}
                                className={styles.projectLink}
                                href={
                                  locale === "uk"
                                    ? `/service/${img.productId}`
                                    : `/${locale}/service/${img.productId}`
                                }
                              >
                                {copy.portfolioProjectPrefix} · #{img.productId}
                              </Link>
                            </figcaption>
                          </figure>
                        ))}
                      </div>
                    ) : null}
                  </section>
                </AnimatedSection>
              );
            })}

            <AnimatedSection delay={120}>
              <aside className={styles.related}>
                <h2 className={styles.relatedHeading}>{copy.relatedHeading}</h2>
                <ul className={styles.relatedList}>
                  {guide.linkCategories.map((code) => (
                    <li key={code}>
                      <Link
                        prefetch={false}
                        className={styles.relatedLink}
                        href={localizedServiceCategoryPath(locale, code)}
                      >
                        {categoryPortfolioLabel(copy, code)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            </AnimatedSection>
          </AnimatedSection>
        </main>

        <Footer />
      </div>
    </>
  );
}
