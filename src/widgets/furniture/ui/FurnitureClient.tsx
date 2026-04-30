"use client";

import styles from "./Furniture.module.css";
import useDataFurniture from "../model/useDataFurniture";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
  categoryFromTabId,
  getCategorySlug,
  resolveCategoryFromSlug,
  tabIdFromCategory,
  type AppLocale,
} from "@/shared/lib/serviceCategories";

function portfolioSlugSegment(pathname: string): string | undefined {
  const m = pathname.match(/\/service\/([^/]+)\/?$/);
  return m?.[1];
}

type ActiveTab = 1 | 2 | 3 | 4;

export default function FurnitureClient({ limit }: { limit: number }) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const { selected, active, setActive, kitchens, wardrobe, bedrooms, store } =
    useDataFurniture();

  const segment = portfolioSlugSegment(pathname);
  const categoryFromUrl =
    segment && !/^\d+$/.test(segment)
      ? resolveCategoryFromSlug(locale, segment)
      : undefined;
  const tabFromUrl =
    categoryFromUrl != null ? tabIdFromCategory(categoryFromUrl) : undefined;

  const displayedTab = (tabFromUrl ?? active) as ActiveTab;

  const tabConfig: Record<
    ActiveTab,
    { items: typeof kitchens; altTail: string }
  > = {
    1: { items: kitchens, altTail: "кухня на замовлення Харків" },
    2: { items: wardrobe, altTail: "шафа на замовлення Харків" },
    3: { items: store, altTail: "торгові меблі Харків" },
    4: { items: bedrooms, altTail: "спальня на замовлення Харків" },
  };

  const { items, altTail } = tabConfig[displayedTab] ?? tabConfig[1];

  const leaveCategoryHubOtherTab = (tabId: number) => {
    if (tabFromUrl != null) router.push("/service");
    setActive(tabId);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.nav}>
        {selected.map((item) => {
          const code = categoryFromTabId(item.id);
          const slug = code != null ? getCategorySlug(locale, code) : undefined;
          const isActive = displayedTab === item.id;

          return (
            <li
              key={item.id}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              {slug ? (
                <Link
                  href={`/service/${slug}`}
                  scroll={false}
                  className={styles.navItemLink}
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  className={styles.navItemLink}
                  onClick={() => leaveCategoryHubOtherTab(item.id)}
                  role="presentation"
                >
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ul>
      <div className={styles.cards}>
        {items.slice(0, limit).map((item, index) => (
          <Link
            href={`/service/${item.id}`}
            className={styles.card}
            key={item.id || index}
          >
            <Image
              src={item?.images.find((image) => image.isCover)?.url || ""}
              alt={`${item.title} — ${altTail}`}
              width={1024}
              height={768}
              loading={index < 3 ? "eager" : "lazy"}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
