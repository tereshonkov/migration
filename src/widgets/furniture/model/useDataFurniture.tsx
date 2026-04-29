"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useProductsQuery } from "@/entities/product/lib/use-products";

type SelectedItem = {
  name: string;
  id: number;
};

export default function useDataFurniture() {
  const t = useTranslations("furniture");
  const { data: products = [] } = useProductsQuery();

  const selected: SelectedItem[] = useMemo(
    () => [
      { name: t("kitchens"), id: 1 },
      { name: t("wardrobes"), id: 2 },
      { name: t("stores"), id: 3 },
      { name: t("bedrooms"), id: 4 },
    ],
    [t],
  );

  const [active, setActive] = useState<number>(1);

  const byCategory = useMemo(() => {
    const kitchens = products.filter((item) => item.category === "KITCHEN");
    const wardrobe = products.filter((item) => item.category === "WARDROBE");
    const store = products.filter((item) => item.category === "STORE");
    const bedrooms = products.filter((item) => item.category === "BEDROOM");
    return { kitchens, wardrobe, store, bedrooms };
  }, [products]);

  return {
    active,
    setActive,
    selected,
    kitchens: byCategory.kitchens,
    wardrobe: byCategory.wardrobe,
    store: byCategory.store,
    bedrooms: byCategory.bedrooms,
  };
}
