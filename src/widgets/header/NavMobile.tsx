"use client";
import styles from './Header.module.css';
import { useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Language from '../language/Language';

const noopSubscribe = () => () => {};

function useClientReady() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export default function NavMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const clientReady = useClientReady();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  const t = useTranslations('header');
  
  const mobileMenu = isOpen ? (
    <nav className={styles.navMobile}>
      <Language mobile={true} />
      <button onClick={toggleMenu} className={styles.close}></button>
      <ul className={styles.wrapperNavMobile}>
        <li><Link href="/" onClick={toggleMenu}>{t('home')}</Link></li>
        <li><Link href="/service" onClick={toggleMenu}>{t('service')}</Link></li>
        <li><Link href="/about" onClick={toggleMenu}>{t('about')}</Link></li>
        <li><Link href="/contacts" onClick={toggleMenu}>{t('contacts')}</Link></li>
        <li><Link className={styles.active} href="tel:0671496741">{t('call')}</Link></li>
      </ul>
    </nav>
  ) : null;
  
  return (
    <>
      <div onClick={toggleMenu} className={styles.menuMobile}>
        <Image src="/menu-dark.svg" alt="" width={24} height={24} />
        <p>{t('menu')}</p>
      </div>
      {clientReady && mobileMenu && createPortal(mobileMenu, document.body)}
    </>
  )
}
