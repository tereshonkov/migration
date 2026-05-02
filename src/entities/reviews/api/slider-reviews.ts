import type { AppLocale } from "@/shared/lib/serviceCategories";
import type { Data } from "@/entities/product/model/type";
import { getProducts } from "@/entities/product/api/product";
import type {
  ReviewListItem,
  SliderReview,
} from "@/entities/reviews/model/type";
import api from "@/shared/api/base";

const FALLBACK_IMAGE =
  "https://storage.googleapis.com/t-mebel/Image/ourPage/modal/shafa/3/tablet.webp";

function coverUrl(product: Data): string | undefined {
  const imgs = product.images;
  if (!imgs?.length) return undefined;
  const cover = imgs.find((img) => img.isCover);
  return cover?.url ?? imgs[0]?.url;
}

export async function getSliderReviews(
  locale: AppLocale = "uk",
): Promise<SliderReview[]> {
  const [reviewsResponse, products] = await Promise.all([
    api.get<ReviewListItem[]>("/reviews"),
    getProducts(locale),
  ]);

  const rawReviews = reviewsResponse.data;
  const productsList = products as Data[];

  const productById = new Map<string, Data>();
  for (const p of productsList) {
    if (p.id != null) {
      productById.set(String(p.id), p);
    }
  }

  return rawReviews
    .filter((r) => r.isApproved)
    .map((r) => {
      const product = productById.get(r.productId);
      const image = product
        ? (coverUrl(product) ?? FALLBACK_IMAGE)
        : FALLBACK_IMAGE;
      return {
        id: r.id,
        name: r.name,
        text: r.text,
        image,
      };
    });
}
