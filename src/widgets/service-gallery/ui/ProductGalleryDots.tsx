"use client";

import styles from "../ProductGallery.module.css";

type ProductGalleryDotsProps = {
  count: number;
  currentIndex: number;
  onSelect: (index: number) => void;
  ariaLabelAt: (index: number) => string;
};

export function ProductGalleryDots({
  count,
  currentIndex,
  onSelect,
  ariaLabelAt,
}: ProductGalleryDotsProps) {
  if (count <= 1) return null;

  return (
    <div className={styles.dots}>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ""}`}
          aria-label={ariaLabelAt(index)}
        />
      ))}
    </div>
  );
}
