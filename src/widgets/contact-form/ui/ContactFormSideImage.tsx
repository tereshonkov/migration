"use client";

import styles from "../ContactForm.module.css";
import Image from "next/image";

const SIDE_IMAGE =
  "https://storage.googleapis.com/t-mebel/Image/ourPage/modal/kitchen/5384567338008963271.webp";

type ContactFormSideImageProps = {
  imageAlt: string;
  badgeYears: string;
  badgeExperience: string;
};

export function ContactFormSideImage({
  imageAlt,
  badgeYears,
  badgeExperience,
}: ContactFormSideImageProps) {
  return (
    <div className={styles.imageSection}>
      <Image
        src={SIDE_IMAGE}
        alt={imageAlt}
        fill
        sizes="(max-width: 900px) 100vw, 50vw"
        className={styles.image}
      />
      <div className={styles.imageOverlay}>
        <div className={styles.badge}>
          <span className={styles.badgeIcon}>✓</span>
          <div className={styles.badgeText}>
            <strong>{badgeYears}</strong>
            <span>{badgeExperience}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
