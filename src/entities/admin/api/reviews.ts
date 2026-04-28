import api from "@/shared/api/base";

export const getReviews = async () => {
  try {
    const response = await api.get("/reviews/not-approved-reviews");
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const approveReviewApi = async (id: string) => {
  try {
    const response = await api.post(`/reviews/approve-review/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error approving review:", error);
    throw error;
  }
};

export const cancelReview = async (id: string) => {
  try {
    const response = await api.delete(`/reviews/delete-review/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error canceling review:", error);
    throw error;
  }
};
