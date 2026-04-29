"use client";
import styles from "./Reviews.module.css";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { SliderReview } from "@/entities/reviews/model/type";

type Props = {
  reviews: SliderReview[];
};

export default function Slider({ reviews }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const t = useTranslations("label");

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

  return (
    <div className={styles.sliderWrapper}>
      <button onClick={scrollPrev} className={styles.prev} aria-label={t("prev")}></button>
      <div className={styles.cards} ref={emblaRef}>
        <div className={styles.emblaTrack}>
          {reviews.map((review) => (
            <div className={styles.emblaSlide} key={review.id}>
              <div className={styles.card}>
                <Image
                  width={300}
                  height={500}
                  className={styles.cardImage}
                  src={review.image}
                  alt=""
                />
                <div className={styles.cardContent}>
                  <h3 className={styles.name}>{review.name}</h3>
                  <p className={styles.text}>{review.text}</p>
                  <div className={styles.stars}>
                    <Image width={60} height={60} src="/star.svg" alt="" />
                    <Image width={60} height={60} src="/star.svg" alt="" />
                    <Image width={60} height={60} src="/star.svg" alt="" />
                    <Image width={60} height={60} src="/star.svg" alt="" />
                    <Image width={60} height={60} src="/star.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={scrollNext} className={styles.next} aria-label={t("next")}></button>
    </div>
  );
}
