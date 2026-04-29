import api from "@/shared/api/base";

export const sendTelegramMessageApi = async (data: { message: string }) => {
  const response = await api.post("/telegram/send-message", data);
  return response.data;
};
