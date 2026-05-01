export type Review = {
  id: string;
  name: string;
  text: string;
  productId: string;
  isApproved?: boolean;
};

export type Images = {
  url: string;
  id: string;
  isCover: boolean;
  productId: string;
  reviewId: string | null;
};

/** Payload image shape for POST /create-product (server assigns ids). */
export type CreateProductImage = Pick<Images, "url" | "isCover">;

export type Data = {
  id?: number;
  title: string;
  description: string;
  images: Images[];
  category?: "KITCHEN" | "WARDROBE" | "STORE" | "BEDROOM";
  reviews?: Review[];
  translations?: {
    ru?: { title: string; description: string };
    uk?: { title: string; description: string };
    en?: { title: string; description: string };
  };
};

export type CreateProductPayload = Omit<Data, "images"> & {
  images: CreateProductImage[];
};
