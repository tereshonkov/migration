"use client";

import { useEffect, useRef, ReactNode } from "react";
import styles from "./AnimatedSection.module.css";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

export default function AnimatedSection({
  children,
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(styles.visible);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // Fire as soon as any pixel intersects the viewport (above-the-fold content becomes visible without scroll gymnastics)
        threshold: 0,
        rootMargin: "0px",
      },
    );

    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [delay]);

  return (
    <div ref={ref} className={styles.animatedSection}>
      {children}
    </div>
  );
}
