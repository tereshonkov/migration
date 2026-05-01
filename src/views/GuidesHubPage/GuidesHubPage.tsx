import type { GuideDefinition } from "@/content/guides/types";
import Header from "@/widgets/header/Header";
import Footer from "@/widgets/footer/Footer";
import Link from "next/link";
import Image from "next/image";
import { guidesInCluster } from "@/content/guides/registry";
import { guideArticlePath } from "@/shared/lib/guideRoutes";
import AnimatedSection from "@/shared/ui/AnimatedSection/AnimatedSection";
import { resolveGuideImages } from "@/shared/lib/guideMedia";
import { JsonLd } from "@/shared/ui/JsonLd/JsonLd";
import { buildBreadcrumbListJsonLd } from "@/shared/lib/breadcrumbJsonLd";
import styles from "./GuidesHubPage.module.css";

export type GuidesHubCopy = {
  homeLabel: string;
  breadcrumbSelf: string;
  hubTitle: string;
  hubSubtitle: string;
  clusterKitchen: string;
  clusterBedroom: string;
  clusterGeneral: string;
  readArticle: string;
};

type Props = {
  locale: string;
  copy: GuidesHubCopy;
};

function clusterTitle(copy: GuidesHubCopy, id: GuideDefinition["cluster"]) {
  if (id === "kitchen") return copy.clusterKitchen;
  if (id === "bedroom") return copy.clusterBedroom;
  return copy.clusterGeneral;
}

function GuideCard(props: {
  locale: string;
  guide: GuideDefinition;
  readArticle: string;
}) {
  const block = props.locale === "uk" ? props.guide.uk : props.guide.ru;
  const firstHero = props.guide.heroImageIds[0];
  const cover =
    firstHero != null ? resolveGuideImages([firstHero])[0] : undefined;
  const href = guideArticlePath(props.locale, props.guide);

  return (
    <Link prefetch={false} href={href} className={styles.card}>
      <div
        className={`${styles.cardImageWrap}${cover ? "" : ` ${styles.cardImagePlaceholder}`}`}
      >
        {cover ? (
          <Image
            fill
            className={styles.cardImage}
            src={cover.url}
            alt={cover.title}
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 360px"
          />
        ) : null}
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{block.title}</h3>
        <span className={styles.cardMeta}>{props.readArticle}</span>
      </div>
    </Link>
  );
}

export default function GuidesHubPage({ locale, copy }: Props) {
  const hubPath = "/guides";
  const breadcrumbItems = [
    { name: copy.homeLabel, path: "" },
    {
      name: copy.breadcrumbSelf,
      path: locale === "uk" ? hubPath : `/${locale}${hubPath}`,
    },
  ];

  const clusters: GuideDefinition["cluster"][] = [
    "kitchen",
    "bedroom",
    "general",
  ];

  return (
    <>
      <Header />
      <div className={`container ${styles.page}`}>
        <JsonLd data={buildBreadcrumbListJsonLd(locale, breadcrumbItems)} />
        <nav className={styles.breadcrumbs}>
          <Link
            className={styles.crumbLink}
            href={locale === "uk" ? "/" : `/${locale}`}
          >
            {copy.homeLabel}
          </Link>
          <span className={styles.crumbSep} aria-hidden>
            /
          </span>
          <span className={styles.crumbCurrent}>{copy.breadcrumbSelf}</span>
        </nav>

        <main className={styles.main}>
          <AnimatedSection>
            <header className={styles.header}>
              <h1 className={styles.title}>{copy.hubTitle}</h1>
              <p className={styles.subtitle}>{copy.hubSubtitle}</p>
            </header>

            {clusters.map((clusterKey) => {
              const list = guidesInCluster(clusterKey);
              if (!list.length) return null;

              return (
                <section key={clusterKey} className={styles.cluster}>
                  <h2 className={styles.clusterTitle}>
                    {clusterTitle(copy, clusterKey)}
                  </h2>
                  <div className={styles.grid}>
                    {list.map((g) => (
                      <GuideCard
                        key={g.slugUk}
                        locale={locale}
                        guide={g}
                        readArticle={copy.readArticle}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </AnimatedSection>
        </main>
        <Footer />
      </div>
    </>
  );
}
