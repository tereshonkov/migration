import styles from './Header.module.css';
import { Link } from '@/i18n/navigation';
import NavMobile from './NavMobile';
import { getTranslations } from 'next-intl/server';
import Language from '../Language/Language';
import Image from 'next/image';

export default async function Header() {
  const t = await getTranslations('header');
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logoWrapper}>
          <Link href="/" className={styles.logo}>
            <Image src="/logo.png" alt="T-Mebel — меблі на замовлення Харків" width={150} height={50} />
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.wrapperNav}>
            <li><Link href="/">{t('home')}</Link></li>
            <li><Link href="/service">{t('service')}</Link></li>
            <li><Link href="/about">{t('about')}</Link></li>
            <li><Link href="/contacts">{t('contacts')}</Link></li>
          </ul>
          <NavMobile />
        </nav>
        <Language mobile={false} />
      </div>
    </>
  )
}
