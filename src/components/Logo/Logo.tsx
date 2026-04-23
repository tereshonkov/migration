import styles from './Logo.module.css';
import Image from 'next/image';

export default function Logo() {
  return (
    <section className={styles.wrapper}>
        <div className={styles.logos}>
            <div className={styles.logo}>
                <Image width={100} height={100} src="/logos/1.png" alt="" className={styles.image} />
            </div>
            <div className={styles.logo}>
                <Image width={100} height={100} src="/logos/2.png" alt="" className={styles.image} />
            </div>
            <div className={styles.logo}>
                <Image width={100} height={100} src="/logos/3.webp" alt="" className={styles.image} />
            </div>
            <div className={styles.logo}>
                <Image width={100} height={100} src="/logos/1.png" alt="" className={styles.image} />
            </div>
            <div className={styles.logo}>
                <Image width={100} height={100} src="/logos/2.png" alt="" className={styles.image} />
            </div>
            <div className={styles.logo}>
                <Image width={100} height={100} src="/logos/3.webp" alt="" className={styles.image} />
            </div>
        </div>
    </section>
  )
}
