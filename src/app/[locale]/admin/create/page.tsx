"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Box
} from "@mui/material";
import HeaderAdmin from "@/widgets/admin/shell/HeaderAdmin";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormAdmin from "@/widgets/admin/product-create/FormAdmin";

export default function Admin() {
  const [tokenChecked, setTokenChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
    } else {
      setTokenChecked(true);
    }
  }, [router]);

  if (!tokenChecked) return null;

  return (
    <Box 
      display="flex" 
      minHeight="100vh" 
      px={5} 
      py={4}
      sx={{
        background:
          "linear-gradient(135deg, rgba(255, 235, 214, 1) 0%, rgba(247, 210, 173, 1) 50%, rgba(255, 235, 214, 1) 100%)",
      }}
    >
      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <HeaderAdmin />
        <Button
          sx={{ 
            mb: 3, 
            width: "fit-content",
            borderRadius: "999px",
            px: 3,
            fontWeight: 600,
            borderColor: "primary.main",
            color: "primary.main",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "rgba(112, 64, 21, 0.08)",
            },
          }}
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
        >
          Назад
        </Button>
        <FormAdmin />
      </Box>
    </Box>
  );
}
