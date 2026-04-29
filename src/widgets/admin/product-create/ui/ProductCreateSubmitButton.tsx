"use client";

import { Button } from "@mui/material";

type ProductCreateSubmitButtonProps = {
  disabled: boolean;
};

export function ProductCreateSubmitButton({
  disabled,
}: ProductCreateSubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      disabled={disabled}
      sx={{
        mt: 2,
        py: 1.5,
        borderRadius: "999px",
        fontWeight: 700,
        fontSize: "16px",
        background:
          "linear-gradient(135deg, rgba(112, 64, 21, 1), rgba(66, 35, 19, 1))",
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
  );
}
