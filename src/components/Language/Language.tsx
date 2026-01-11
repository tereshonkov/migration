"use client";
import styles from './Language.module.css';
import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Language({ mobile = false }: { mobile?: boolean }) {

    const t = useTranslations('header');
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentLocale = pathname.split('/')[1]; //test

const supportedLocales = ['uk', 'ru', 'en'];

const getLocaleFromPath = (pathname: string) => {
  const first = pathname.split('/')[1];
  if (supportedLocales.includes(first)) return first;
  return 'uk'; // default
};

const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedLocale = e.target.value;
  const paramsString = searchParams.toString();
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

  router.push(`${newPathname}${query}`);
};
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    return (
      <>
              <div className={mobile ? styles.langWrapperDark : styles.langWrapper}>
            <img src={!mobile ? "/lang.svg" : "/lang-dark.svg"} alt="language" />
            {/* <p>{t('language')}</p> */}
            <div className={styles.langSelect}>
                <select
                    aria-label={t('language') || "Выберите язык"}
                    className={styles.select}
                    value={currentLocale === 'uk' ? 'uk' : currentLocale}
                    onChange={handleChange}
                    name="language"
                    id="language"
                >
                    <option className={styles.darkItem} value="uk">Українська</option>
                    <option className={styles.darkItem} value="en">English</option>
                    <option className={styles.darkItem} value="ru">Русский</option>
                </select>
            </div>
        </div>
        {token && (
          <Link className={styles.select} href="/admin">Админ панель</Link>
        )}
      </>
    )
}
