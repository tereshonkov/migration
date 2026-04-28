import styles from './Reviews.module.css'
import Slider from './Slider'
import { getTranslations } from 'next-intl/server'

export default async function Reviews() {
  const t = await getTranslations('reviews')
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('title')}</h2>
      </div>
        <Slider />
    </section>
  )
}
