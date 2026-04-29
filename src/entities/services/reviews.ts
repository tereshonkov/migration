import type { ReviewsTypes } from "@/entities/services/model/review";
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
