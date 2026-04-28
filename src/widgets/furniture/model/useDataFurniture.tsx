import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export default function useDataFurniture() {
  const t = useTranslations("furniture");

  type Review = {
    id: string;
    name: string;
    text: string;
    productId: string;
    isApproved?: boolean;
  }

  type Images = {
    url: string;
    id: string;
    isCover: boolean;
    productId: string;
    reviewId: string | null;
  };

  type Data = {
    id: number;
    title: string;
    description: string;
    color: string;
    furnitures: string;
    images: Images[];
    width?: number;
    height?: number;
    rating?: number;
    category?: "KITCHEN" | "WARDROBE" | "STORE" | "BEDROOM";
    reviews?: Review[];
  };
  type SelectedItem = {
    name: string;
    id: number;
  };
  const selected: SelectedItem[] = [
    {
      name: t("kitchens"),
      id: 1,
    },
    {
      name: t("wardrobes"),
      id: 2,
    },
    {
      name: t("stores"),
      id: 3,
    },
    {
      name: t("bedrooms"),
      id: 4,
    },
  ];

  const [active, setActive] = useState<number>(1);
  const [array, setArray] = useState<Data[]>([]);

  useEffect(() => {
    const fetchDataPosrgress = async () => {
      try {
        const response = await fetch(
          "https://t-mebel.onrender.com/product/products"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(
          "Data fetched successfully in useDataFurniture component:",
          data
        );
        setArray(data);
      } catch (e) {
        console.error("Error fetching data in useDataFurniture component!:", e);
      }
    };
    fetchDataPosrgress();
  }, []);

  const kitchens = array.filter((item) => item.category === "KITCHEN");
  const wardrobe = array.filter((item) => item.category === "WARDROBE");
  const store = array.filter((item) => item.category === "STORE");
  const bedrooms = array.filter((item) => item.category === "BEDROOM");
  
  return {
    active,
    setActive,
    selected,
    kitchens,
    wardrobe,
    store,
    bedrooms,
  };
}
