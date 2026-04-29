"use client";

import { Box, Typography } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import Upload from "../Upload";

type ProductCreateImagesSectionProps = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function ProductCreateImagesSection({
  files,
  setFiles,
}: ProductCreateImagesSectionProps) {
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
      >
        Изображения
      </Typography>
      <Upload files={files} setFiles={setFiles} />
    </Box>
  );
}
