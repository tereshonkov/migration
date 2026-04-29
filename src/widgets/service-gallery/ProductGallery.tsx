"use client";

import styles from "./ProductGallery.module.css";
import Image from "next/image";
import PopupForm from "../popup-form/PopupForm";
import { useTranslations } from "next-intl";
import { useProductGallery } from "./lib/useProductGallery";
import { ProductGalleryArrows } from "./ui/ProductGalleryArrows";
import { ProductGalleryDots } from "./ui/ProductGalleryDots";
import { ProductGalleryStatus } from "./ui/ProductGalleryStatus";

interface ProductGalleryProps {
  id: string;
}

export default function ProductGallery({ id }: ProductGalleryProps) {
  const t = useTranslations("productGallery");
  const {
    data,
    imageUrls,
    currentIndex,
    isPending,
    isError,
    nextSlide,
    prevSlide,
    goToSlide,
  } = useProductGallery(id);

  if (isError) {
    return <ProductGalleryStatus variant="error" />;
  }

  if (isPending || !data) {
    return <ProductGalleryStatus variant="loading" />;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <Image
              src={imageUrls[currentIndex]}
              alt={t("imageAlt", {
                title: data.title,
                photoNumber: currentIndex + 1,
              })}
              fill
              className={styles.image}
              priority
            />

            {imageUrls.length > 1 && (
              <ProductGalleryArrows
                onPrev={prevSlide}
                onNext={nextSlide}
                prevLabel={t("prevPhoto")}
                nextLabel={t("nextPhoto")}
              />
            )}

            <div className={styles.counter}>
              {currentIndex + 1} / {imageUrls.length}
            </div>
          </div>

          <ProductGalleryDots
            count={imageUrls.length}
            currentIndex={currentIndex}
            onSelect={goToSlide}
            ariaLabelAt={(i) => `${t("goToPhoto")} ${i + 1}`}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.description}>{data.description}</p>

          <div className={styles.actions}>
            <PopupForm
              triggerLabel={t("ctaButton")}
              useDefaultTriggerStyles={false}
              triggerClassName={styles.ctaButton}
            />
            <p className={styles.note}>{t("note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
