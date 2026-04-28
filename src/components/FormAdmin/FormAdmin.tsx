"use client";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import Upload from "@/components/Upload/Upload";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { uploadImage } from "@/api/images";
import { createProduct } from "@/api/product";

/** Placeholders until create-product DTO exposes these in the form. */
const CREATE_PRODUCT_DEFAULTS = {
  color: "Standard",
  furnitures: "Standard",
  width: 100,
  height: 100,
  rating: 5,
} as const;

interface ProductFormData {
  titleRu: string;
  titleUk: string;
  titleEn: string;
  descriptionRu: string;
  descriptionUk: string;
  descriptionEn: string;
  category: "KITCHEN" | "WARDROBE" | "STORE" | "BEDROOM";
}

export default function FormAdmin() {
  const [files, setFiles] = useState<File[]>([]);
  const { register, handleSubmit, formState } = useForm<ProductFormData>({
    mode: "onBlur",
  });

  const { errors } = formState;

  const handleImageUpload = async () => {
    if (files.length === 0) return [];
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    try {
      const response = await uploadImage(formData);
      console.log("Upload successful:", response);
      return response;
    } catch (error) {
      console.error("Upload failed:", error);
      return [];
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    const filesUrls = await handleImageUpload();
    const imageUrlList = Array.isArray(filesUrls) ? filesUrls : [];
    console.log("OnSubmit", imageUrlList);
    const productData = {
      title: data.titleRu, // основное название (русский по умолчанию)
      description: data.descriptionRu, // основное описание
      category: data.category,
      ...CREATE_PRODUCT_DEFAULTS,
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
      const response = await createProduct(productData);
      console.log("Product creation successful:", response);
      alert("Товар успешно создан!");
    } catch (error) {
      console.error("Product creation failed:", error);
      alert("Ошибка при создании товара.");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1000,
        margin: "0 auto",
        p: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          background: (theme) =>
            theme.palette.mode === "light"
              ? "linear-gradient(155deg, rgba(255, 244, 232, 0.97), rgba(247, 210, 173, 0.9))"
              : "linear-gradient(135deg, #2a1f18 0%, #1a1410 100%)",
          boxShadow: "0 8px 24px rgba(56, 29, 12, 0.12)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            fontWeight: 700,
            color: (theme) => theme.palette.text.primary,
            textAlign: "center",
          }}
        >
          Создание нового товара
        </Typography>

        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Русский язык */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}>
              🇷🇺 Русский
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                {...register("titleRu", {
                  required: "Название на русском обязательно",
                })}
                label="Название товара"
                multiline
                rows={2}
                required
                fullWidth
                error={!!errors.titleRu}
                helperText={errors.titleRu?.message}
              />

              <TextField
                {...register("descriptionRu", {
                  required: "Описание на русском обязательно",
                })}
                label="Описание"
                multiline
                rows={4}
                required
                fullWidth
                error={!!errors.descriptionRu}
                helperText={errors.descriptionRu?.message}
              />
            </Box>
          </Box>

          {/* Украинский язык */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}>
              🇺🇦 Українська
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                {...register("titleUk", {
                  required: "Назва українською обов'язкова",
                })}
                label="Назва товару"
                multiline
                rows={2}
                required
                fullWidth
                error={!!errors.titleUk}
                helperText={errors.titleUk?.message}
              />

              <TextField
                {...register("descriptionUk", {
                  required: "Опис українською обов'язковий",
                })}
                label="Опис"
                multiline
                rows={4}
                required
                fullWidth
                error={!!errors.descriptionUk}
                helperText={errors.descriptionUk?.message}
              />
            </Box>
          </Box>

          {/* Английский язык */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}>
              🇬🇧 English
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                {...register("titleEn", {
                  required: "Title in English is required",
                })}
                label="Product Title"
                multiline
                rows={2}
                required
                fullWidth
                error={!!errors.titleEn}
                helperText={errors.titleEn?.message}
              />

              <TextField
                {...register("descriptionEn", {
                  required: "Description in English is required",
                })}
                label="Description"
                multiline
                rows={4}
                required
                fullWidth
                error={!!errors.descriptionEn}
                helperText={errors.descriptionEn?.message}
              />
            </Box>
          </Box>

          {/* Категория */}
          <FormControl required fullWidth>
            <InputLabel>Категория</InputLabel>
            <Select
              label="Категория"
              {...register("category", {
                required: "Выберите категорию",
              })}
              error={!!errors.category}
            >
              <MenuItem value="KITCHEN">Кухня</MenuItem>
              <MenuItem value="WARDROBE">Шкаф</MenuItem>
              <MenuItem value="STORE">Магазин</MenuItem>
              <MenuItem value="BEDROOM">Спальня</MenuItem>
            </Select>
            {errors.category && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                {errors.category.message}
              </Typography>
            )}
          </FormControl>

          {/* Загрузка изображений */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}>
              Изображения
            </Typography>
            <Upload files={files} setFiles={setFiles} />
          </Box>

          {/* Кнопка отправки */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: "999px",
              fontWeight: 700,
              fontSize: "16px",
              background: "linear-gradient(135deg, rgba(112, 64, 21, 1), rgba(66, 35, 19, 1))",
              color: "rgba(254, 247, 240, 1)",
              boxShadow: "0 4px 12px rgba(66, 35, 19, 0.3)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(66, 35, 19, 0.4)",
              },
            }}
          >
            Добавить товар
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
