"use client";
import styles from "./Furniture.module.css";
import useDataFurniture from "../model/useDataFurniture";
import { Link } from "@/i18n/navigation";
import Image from "next/image";


type ActiveTab = 1 | 2 | 3 | 4;

export default function FurnitureClient({ limit }: { limit: number }) {

  const { selected, active, setActive, kitchens, wardrobe, bedrooms, store } = useDataFurniture();

  const tabConfig: Record<ActiveTab,
    { items: typeof kitchens; altTail: string }
  > = {
    1: { items: kitchens, altTail: "кухня на замовлення Харків" },
    2: { items: wardrobe, altTail: "шафа на замовлення Харків" },
    3: { items: store, altTail: "торгові меблі Харків" },
    4: { items: bedrooms, altTail: "спальня на замовлення Харків" },
  };

  const { items, altTail } = tabConfig[active as ActiveTab] ?? tabConfig[1];

  return (
    <div className={styles.container}>
      <ul className={styles.nav}>
        {selected.map((item) => (
          <li
            key={item.id}
            className={`${styles.navItem} ${item.id === active ? styles.active : "" }`}
            onClick={() => setActive(item.id)}
          >
            {item.name}
          </li>
        ))}
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

