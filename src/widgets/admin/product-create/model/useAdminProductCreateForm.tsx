"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUploadImageMutation } from "@/entities/admin/lib/use-images";
import { useCreateProductMutation } from "@/entities/product/lib/use-products";
import type { CreateProductPayload } from "@/entities/product/model/type";

export type ProductFormData = {
  titleRu: string;
  titleUk: string;
  titleEn: string;
  descriptionRu: string;
  descriptionUk: string;
  descriptionEn: string;
  category: "KITCHEN" | "WARDROBE" | "STORE" | "BEDROOM";
};

function buildUploadFormData(files: File[]): FormData {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  return formData;
}

export function useAdminProductCreateForm() {
  const [files, setFiles] = useState<File[]>([]);
  const uploadImageMutation = useUploadImageMutation();
  const createProductMutation = useCreateProductMutation();

  const { register, handleSubmit, formState } = useForm<ProductFormData>({
    mode: "onBlur",
  });

  const { errors } = formState;

  const onSubmit = async (data: ProductFormData) => {
    let imageUrlList: string[] = [];

    if (files.length > 0) {
      try {
        const filesUrls = await uploadImageMutation.mutateAsync(
          buildUploadFormData(files),
        );
        imageUrlList = Array.isArray(filesUrls) ? filesUrls : [];
      } catch (error) {
        console.error("Upload failed:", error);
        imageUrlList = [];
      }
    }

    const productData: CreateProductPayload = {
      title: data.titleRu,
      description: data.descriptionRu,
      category: data.category,
      translations: {
        ru: {
          title: data.titleRu,
          description: data.descriptionRu,
        },
        uk: {
          title: data.titleUk,
          description: data.descriptionUk,
        },
        en: {
          title: data.titleEn,
          description: data.descriptionEn,
        },
      },
      images: imageUrlList.map((url: string, index: number) => ({
        url,
        isCover: index === 0,
      })),
    };

    try {
      await createProductMutation.mutateAsync(productData);
      alert("Товар успешно создан!");
    } catch (error) {
      console.error("Product creation failed:", error);
      alert("Ошибка при создании товара.");
    }
  };

  return {
    files,
    setFiles,
    register,
    errors,
    handleFormSubmit: handleSubmit(onSubmit),
    isSubmitPending:
      uploadImageMutation.isPending || createProductMutation.isPending,
  };
}
