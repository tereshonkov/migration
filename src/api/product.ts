import type { CreateProductPayload } from "@/types/data";
import api from "./api";

export const getProducts = async () => {
  try {
    const response = await api.get("/product/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const createProduct = async (productData: CreateProductPayload) => {
  try {
    const response = await api.post("/product/create-product", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
