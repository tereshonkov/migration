import api from "@/shared/api/base";

export const sendMessageApi = async (data: {
  name: string;
  phone: string;
  message: string;
}) => {
  try {
    const response = await api.post("/messages/send", data);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
