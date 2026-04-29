"use client";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProductFormData } from "../model/useAdminProductCreateForm";

type ProductCreateCategoryFieldProps = {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
};

export function ProductCreateCategoryField({
  register,
  errors,
}: ProductCreateCategoryFieldProps) {
  return (
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
  );
}
