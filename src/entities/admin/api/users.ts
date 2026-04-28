import api from "@/shared/api/base";

export const getUsers = async () => {
  try {
    const response = await api.get("/user/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
