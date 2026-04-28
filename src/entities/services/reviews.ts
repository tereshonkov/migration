import type { ReviewsTypes } from "@/types/reviews";
import api from "@/shared/api/base";

export const sendReviewApi = async (data: ReviewsTypes) => {
  try {
    const response = await api.post("/reviews/create-review", data);
    return response.data;
  } catch (error) {
    console.error("Error sending review:", error);
    throw error;
  }
};
