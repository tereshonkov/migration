import api from "@/shared/api/base";

export const getMessages = async () => {
  try {
    const response = await api.get("/messages");
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const markMessageAsRead = async (id: string) => {
  try {
    const response = await api.patch(`/messages/read/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw error;
  }
};
