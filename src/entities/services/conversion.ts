import api from "@/shared/api/base";

export const registerConversion = async () => {
  try {
    await api.post("/callclick/record");
  } catch (error) {
    console.error("Error recording conversion:", error);
    throw error;
  }
};
