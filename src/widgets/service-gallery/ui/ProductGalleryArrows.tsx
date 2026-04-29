"use client";

import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import styles from "../ProductGallery.module.css";

type ProductGalleryArrowsProps = {
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
};

export function ProductGalleryArrows({
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
}: ProductGalleryArrowsProps) {
  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        className={`${styles.navButton} ${styles.navButtonPrev}`}
        aria-label={prevLabel}
      >
        <IoChevronBack size={28} />
      </button>
      <button
        type="button"
        onClick={onNext}
        className={`${styles.navButton} ${styles.navButtonNext}`}
        aria-label={nextLabel}
      >
        <IoChevronForward size={28} />
      </button>
    </>
  );
}
