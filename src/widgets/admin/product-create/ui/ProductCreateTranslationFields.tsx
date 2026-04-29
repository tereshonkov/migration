"use client";

import { Box, TextField, Typography } from "@mui/material";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProductFormData } from "../model/useAdminProductCreateForm";

type ProductCreateTranslationFieldsProps = {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
};

export function ProductCreateTranslationFields({
  register,
  errors,
}: ProductCreateTranslationFieldsProps) {
  return (
    <>
      <Box>
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
        >
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

      <Box>
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
        >
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

      <Box>
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
        >
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
    </>
  );
}
