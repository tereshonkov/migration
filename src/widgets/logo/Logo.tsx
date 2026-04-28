import styles from './Logo.module.css';
import Image from 'next/image';

type srcLogo = "1" | "2" | "3";

const srcLogoMap: Record<srcLogo, string> = {
  "1": "/logos/1.png",
  "2": "/logos/2.png",
  "3": "/logos/3.webp",
}
const logos = Object.values(srcLogoMap);

export default function Logo() {
  return (
    <section className={styles.wrapper}>
        <div className={styles.logos}>
           {[...logos, ...logos].map((src: string, index: number) => (
            <div className={styles.logo} key={`logo-${index}-${src}`}>
                <Image width={100} height={100} src={src} alt="" className={styles.image} />
            </div>
           ))}
        </div>
    </section>
  )
}
