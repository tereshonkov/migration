"use client";
import styles from "./Popap.module.css";
import { FaTags, FaGift } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { usePopap } from "./lib/use-popap";

export default function Popap() {
  const { t, isOpen, setIsOpen, input, setInput, onSubmit, isSubmitPending } =
    usePopap();

  if (!isOpen) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.popapWrapper}>
        <IoCloseCircleOutline
          onClick={() => setIsOpen((prev) => !prev)}
          className={styles.close}
          size={32}
        />
        <div className={styles.header}>
          <FaGift className={styles.iconGift} />
          <h2 className={styles.heading}>{t("title")}</h2>
          <h3 className={styles.heading}>{t("description")}</h3>
        </div>
        <div className={styles.body}>
          <p className={styles.text}>{t("text")}</p>
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.inputsWrapper}>
              <input
                value={input.name}
                onChange={(e) => setInput({ ...input, name: e.target.value })}
                type="text"
                placeholder={t("name")}
                className={styles.input}
                required
              />
              <input
                value={input.phone}
                onChange={(e) => setInput({ ...input, phone: e.target.value })}
                type="text"
                placeholder={t("phone")}
                className={styles.input}
                required
              />
            </div>
            <button
              type="submit"
              className={styles.button}
              disabled={isSubmitPending}
            >
              {t("btn")}
            </button>
          </form>
        </div>
        <FaTags className={styles.iconBgLeft} />
        <FaTags className={styles.iconBgRight} />
      </div>
    </div>
  );
}
