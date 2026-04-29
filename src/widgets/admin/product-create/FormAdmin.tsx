"use client";

import { Box, Typography, Paper } from "@mui/material";
import { useAdminProductCreateForm } from "./model/useAdminProductCreateForm";
import { ProductCreateTranslationFields } from "./ui/ProductCreateTranslationFields";
import { ProductCreateCategoryField } from "./ui/ProductCreateCategoryField";
import { ProductCreateImagesSection } from "./ui/ProductCreateImagesSection";
import { ProductCreateSubmitButton } from "./ui/ProductCreateSubmitButton";

export default function FormAdmin() {
  const {
    files,
    setFiles,
    register,
    errors,
    handleFormSubmit,
    isSubmitPending,
  } = useAdminProductCreateForm();

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
          background:
            "linear-gradient(155deg, rgba(255, 244, 232, 0.97), rgba(247, 210, 173, 0.9))",
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
          onSubmit={handleFormSubmit}
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <ProductCreateTranslationFields register={register} errors={errors} />
          <ProductCreateCategoryField register={register} errors={errors} />
          <ProductCreateImagesSection files={files} setFiles={setFiles} />
          <ProductCreateSubmitButton disabled={isSubmitPending} />
        </Box>
      </Paper>
    </Box>
  );
}
