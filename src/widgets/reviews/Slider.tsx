"use client";
import styles from "./Reviews.module.css";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

type Data = {
  id: number;
  title: string;
  description: string;
  color: string;
  furnitures: string;
  image: string;
  images: string[];
  width?: number;
  height?: number;
  raiting?: number;
  categories?: string[];
  reviews: Review[];
};
type Review = {
  name: string;
  text: string;
  image: string;
};

export default function Slider() {
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

  const [reviewsData, setreviewsData] = useState<Review[]>([]);
  // console.log("Slider data:", reviewsData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/data.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const items: Data[] = await response.json();
        const reviews = items
          .filter((el) => el.reviews.length > 0)
          .flatMap((el) => el.reviews);
          setreviewsData(reviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={styles.sliderWrapper}>
      <button onClick={scrollPrev} className={styles.prev} aria-label={t("prev")}></button>
      <div className={styles.cards} ref={emblaRef}>
        <div className={styles.emblaTrack}>
          {reviewsData.map((review, index) => (
            <div className={styles.emblaSlide} key={index}>
              <div className={styles.card}>
                <Image
                  width={300}
                  height={500}
                  className={styles.cardImage}
                  src={review.image}
                  alt="picture"
                />
                <div className={styles.cardContent}>
                  <h3 className={styles.name}>{review.name}</h3>
                  <p className={styles.text}>{review.text}</p>
                  <div className={styles.stars}>
                    <Image width={60} height={60} src="/star.svg" alt="star" />
                    <Image width={60} height={60} src="/star.svg" alt="star" />
                    <Image width={60} height={60} src="/star.svg" alt="star" />
                    <Image width={60} height={60} src="/star.svg" alt="star" />
                    <Image width={60} height={60} src="/star.svg" alt="star" />
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
