"use client";

import styles from "./Language.module.css";
import Link from "next/link";
import Image from "next/image";
import { useLocaleSwitcher } from "./model/useLocaleSwitcher";
import { LocaleSelect } from "./ui/LocaleSelect";

export default function Language({ mobile = false }: { mobile?: boolean }) {
  const {
    open,
    setOpen,
    wrapperRef,
    labels,
    supportedLocales,
    currentLocale,
    handleChange,
    handleContainerToggle,
  } = useLocaleSwitcher();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return (
    <>
      <div
        ref={wrapperRef}
        className={mobile ? styles.langWrapperDark : styles.langWrapper}
        onClick={handleContainerToggle}
      >
        <Image
          src={!mobile ? "/lang.svg" : "/lang-dark.svg"}
          alt=""
          width={24}
          height={24}
        />
        <LocaleSelect
          open={open}
          setOpen={setOpen}
          labels={labels}
          supportedLocales={supportedLocales}
          currentLocale={currentLocale}
          onSelectLocale={handleChange}
        />
      </div>
      {token && (
        <Link className={styles.select} href="/admin">
          Админ панель
        </Link>
      )}
    </>
  );
}
