"use client";

import {
  Paper,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState, useMemo } from "react";
import type { Data } from "@/entities/product/model/type";
import { useProductsQuery } from "@/entities/product/lib/use-products";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
  const [filter, setFilter] = useState<string>("");
  const { data: products = [] } = useProductsQuery<Data[]>();

  const filteredProducts = useMemo(() => {
    if (!filter) return products;
    return products.filter((item) => item?.category?.toString() === filter);
  }, [filter, products]);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Категория</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Категория"
            sx={{
              borderRadius: "12px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(112, 64, 21, 0.3)",
              },
            }}
          >
            <MenuItem value="">Все товары</MenuItem>
            <MenuItem value="KITCHEN">Кухни</MenuItem>
            <MenuItem value="WARDROBE">Шкафы</MenuItem>
            <MenuItem value="STORE">Магазины</MenuItem>
            <MenuItem value="BEDROOM">Спальни</MenuItem>
          </Select>
        </FormControl>

        <Link href="/admin/create">
          <Button
            variant="contained"
            sx={{
              borderRadius: "999px",
              px: 3,
              py: 1.2,
              fontWeight: 600,
              background: "linear-gradient(135deg, rgba(112, 64, 21, 1), rgba(66, 35, 19, 1))",
              color: "rgba(254, 247, 240, 1)",
              boxShadow: "0 4px 12px rgba(66, 35, 19, 0.3)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(66, 35, 19, 0.4)",
              },
            }}
          >
            + Добавить товар
          </Button>
        </Link>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 3,
        }}
      >
        {filteredProducts.map((item, index) => (
          <Paper
            key={item.id || index}
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 3,
              aspectRatio: "1",
              background:
                "linear-gradient(155deg, rgba(255, 244, 232, 0.97), rgba(247, 210, 173, 0.9))",
              boxShadow: "0 4px 16px rgba(56, 29, 12, 0.12)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 24px rgba(56, 29, 12, 0.2)",
                "& .productOverlay": {
                  opacity: 1,
                },
              },
            }}
          >
            <Image
              src={
                item?.images?.find((image) => image.isCover)?.url ||
                "/placeholder.jpg"
              }
              alt={item.title}
              fill
              style={{
                objectFit: "cover",
              }}
            />

            <Box
              className="productOverlay"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                padding: 2,
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {item.title}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {filteredProducts.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: "text.secondary",
          }}
        >
          <Typography variant="h6">Товары не найдены</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Попробуйте изменить фильтр или добавьте новый товар
          </Typography>
        </Box>
      )}
    </Box>
  );
}
