import type { ReviewListItem } from "@/entities/reviews/model/type";
import api from "@/shared/api/base";

export async function getAllReviews(): Promise<ReviewListItem[]> {
  const response = await api.get<ReviewListItem[]>("/reviews");
  return response.data;
}
