"use client";

import { useState, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import styles from "./ProductGallery.module.css";
import Image from "next/image";
import PopupForm from "../PopupForm/PopupForm";
import { useTranslations } from "next-intl";

type Images = {
  url: string;
  id: string;
  isCover: boolean;
  productId: string;
  reviewId: string | null;
};

type Data = {
  id: string;
  title: string;
  description: string;
  color: string;
  furnitures: string;
  images: Images[];
  width?: number;
  height?: number;
  rating?: number;
  category?: "KITCHEN" | "WARDROBE" | "STORE" | "BEDROOM";
};

interface ProductGalleryProps {
  id: string;
}

export default function ProductGallery({ id }: ProductGalleryProps) {
  const t = useTranslations("productGallery");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://t-mebel.onrender.com/product/product/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const items: Data = await response.json();
        if (items) {
          setData(items);
        } else {
          console.error(`Item with id ${id} not found`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!data) {
    return (
      <section className={styles.wrapper}>
        <div className={styles.container}>{t("loading")}
          <div className={styles.loading}>Завантаження...</div>
        </div>
      </section>
    );
  }

  const images = data.images.map(img => img.url);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* Галерея */}
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <Image
              src={images[currentIndex]}
              alt={`${data.title} — меблі на замовлення Харків, фото ${currentIndex + 1}`}
              fill
              className={styles.image}
              priority
            />
            
            {/* Навигация */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevSlide} 
                  className={`${styles.navButton} ${styles.navButtonPrev}`}
                  aria-label={t("prevPhoto")}
                >
                  <IoChevronBack size={28} />
                </button>
                <button 
                  onClick={nextSlide} 
                  className={`${styles.navButton} ${styles.navButtonNext}`}
                  aria-label={t("nextPhoto")}
                >
                  <IoChevronForward size={28} />
                </button>
              </>
            )}

            {/* Счетчик */}
            <div className={styles.counter}>
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Превью (точки) */}
          {images.length > 1 && (
            <div className={styles.dots}>
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ""}`}
                  aria-label={`${t("goToPhoto")} ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Информация */}
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.description}>{data.description}</p>
          
          <div className={styles.actions}>
            <PopupForm 
              triggerLabel={t("ctaButton")}
              useDefaultTriggerStyles={false}
              triggerClassName={styles.ctaButton}
            />
            <p className={styles.note}>
              {t("note")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
