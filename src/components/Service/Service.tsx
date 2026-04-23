import styles from './Service.module.css'
import Button from '../Button/Button'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function Service() {
    const t = await getTranslations('service')
  return (
    <section className={styles.service}>
        <div className={styles.first}>
            <div className={styles.imgWrapper}>
                <Image width={1024} height={768} src="https://storage.googleapis.com/t-mebel/Image/ourPage/modal/kitchen/5384567338008963271.webp" alt="кухня на замовлення Харків" />
            </div>
            <div className={styles.textWrapper}>
                <h2 className={styles.title}>{t('titleKitchen')}</h2>
                <p className={styles.subtitle}>{t('subtitleKitchen')}</p>
                <Button link='/service#furniture'>{t('btnKitchen')}</Button>
            </div>
        </div>
        <div className={styles.second}>
            <div className={styles.textWrapper}>
            <h2 className={styles.title}>{t('titleWardrobe')}</h2>
            <p className={styles.subtitle}>{t('subtitleWardrobe')}</p>
            <Button link='/service#furniture'>{t('btnWardrobe')}</Button>
            </div>
            <div className={styles.imgWrapper}>
                <Image width={1024} height={768} src="https://storage.googleapis.com/t-mebel/Image/ourPage/modal/shafa/7/tablet.webp" alt="шафа-купе на замовлення Харків" />
            </div>
        </div>
    </section>
  )}
