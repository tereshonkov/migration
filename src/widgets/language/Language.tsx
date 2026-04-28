"use client";
import styles from './Language.module.css';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

export default function Language({ mobile = false }: { mobile?: boolean }) {

    const router = useRouter();
    const pathname = usePathname() || '/';
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

const labels: Record<string, string> = {
  uk: 'Українська',
  en: 'English',
  ru: 'Русский',
};

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

const supportedLocales = ['uk', 'ru', 'en'];

const getLocaleFromPath = (pathname: string) => {
  const first = pathname.split('/')[1];
  if (supportedLocales.includes(first)) return first;
  return 'uk'; // default
};

const currentLocale = getLocaleFromPath(pathname);

const handleChange = (selectedLocale: string) => {
   const paramsString = searchParams?.toString() ?? '';
   const query = paramsString ? `?${paramsString}` : '';

   let basePath = pathname;

  // Если есть префикс локали в начале — удаляем его
  const current = getLocaleFromPath(pathname);
  if (supportedLocales.includes(current)) {
    basePath = pathname.replace(`/${current}`, '') || '/';
  }

  let newPathname;
  // Для украинского (defaultLocale) не ставим префикс
  if (selectedLocale === 'uk') {
    newPathname = basePath;
  } else {
    // Для других языков добавляем префикс
    newPathname = `/${selectedLocale}${basePath === '/' ? '' : basePath}`;
  }

  setOpen(false);
  router.push(`${newPathname}${query}`);
};

const handleContainerToggle = (event: React.MouseEvent<HTMLDivElement>) => {
  const target = event.target as HTMLElement;
  // Тоглим только по клику на контейнер или иконку, не мешая кнопкам опций
  if (target.tagName === 'IMG' || target === wrapperRef.current) {
    setOpen((prev) => !prev);
  }
};

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    return (
      <>
              <div
          ref={wrapperRef}
          className={mobile ? styles.langWrapperDark : styles.langWrapper}
          onClick={handleContainerToggle}
        >
          <Image src={!mobile ? "/lang.svg" : "/lang-dark.svg"} alt="" width={24} height={24} />
            <div className={styles.langSelect}>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                className={styles.trigger}
                onClick={() => setOpen((prev) => !prev)}
              >
                <span>{labels[currentLocale]}</span>
                <span className={styles.chevron} aria-hidden="true">▾</span>
              </button>
              {open && (
                <ul className={styles.options} role="listbox">
                  {supportedLocales.map((locale) => (
                    <li key={locale}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={locale === currentLocale}
                        className={styles.option}
                        onClick={() => handleChange(locale)}
                      >
                        {labels[locale]}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
        </div>
         {token && (
           <Link className={styles.select} href="/admin">Админ панель</Link>
         )}
       </>
     )
 }
