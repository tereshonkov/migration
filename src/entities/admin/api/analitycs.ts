import api from "@/shared/api/base";

export const getAnalitycsDay = async () => {
  try {
    const response = await api.get("/analitycs/day");
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw error;
  }
};

export const getAnalitycsWeek = async () => {
  try {
    const response = await api.get("/analitycs/week");
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw error;
  }
};

export const getAnalitycsMonth = async () => {
  try {
    const response = await api.get("/analitycs/month");
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw error;
  }
};

export const getCallClick = async () => {
  try {
    const response = await api.get("/callclick");
    return response.data;
  } catch (error) {
    console.error("Error fetching call click data:", error);
    throw error;
  }
};

export const getPageVisits = async () => {
  try {
    const response = await api.get("/analitycs/pageviews");
    return response.data;
  } catch (error) {
    console.error("Error fetching page visit data:", error);
    throw error;
  }
};
