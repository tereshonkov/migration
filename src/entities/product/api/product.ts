import type { CreateProductPayload, Data } from "@/entities/product/model/type";
import api from "@/shared/api/base";

export const getProducts = async () => {
  try {
    const response = await api.get("/product/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: string): Promise<Data> => {
  try {
    const response = await api.get<Data>(`/product/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
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
