"use client";
import styles from './Hero.module.css';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useCallback } from 'react';
import heroData from './heroData';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function HeroCarusel({    initialIndex = 0 }: { initialIndex?: number }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        skipSnaps: false,
        dragFree: false,
        containScroll: 'trimSnaps',
        startIndex: initialIndex,
    });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
    }, [emblaApi]);

    const t = useTranslations('label');
    return (
        <>
            <div className={styles.backgroundImg} ref={emblaRef}>
                <div className={styles.emblaTrack}>
                    {heroData.map((item, index) => (
                        <div className={styles.emblaSlide} key={index}>
                            <Image
                                src={item}
                                alt="меблі на замовлення Харків"
                                width={1020}
                                height={768}
                                priority
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.sliderBtns}>
                <button onClick={scrollPrev} aria-label={t('prev')} className={styles.prev}></button>
                <button onClick={scrollNext} aria-label={t('next')} className={styles.next}></button>
            </div>
        </>
    )
}
