"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import Sidebar from "@/widgets/admin/shell/Sidebar";
import HeaderAdmin from "@/widgets/admin/shell/HeaderAdmin";
import AnaliticsPage from "@/widgets/admin/analytics/AnaliticsPage";
import MessagesPage from "@/widgets/admin/messages/MessagePage";
import ReviewsPage from "@/widgets/admin/reviews/ReviewsPage";
import ProductsPage from "@/widgets/admin/products/ProductsPage";
import UsersPage from "@/widgets/admin/users/UsersPage";
import { useTabContext } from "@/context/TabContext";

export default function Admin() {
  const [tokenChecked, setTokenChecked] = useState(false);
  const { page } = useTabContext();
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
        <Box sx={{ mb: 2, display: "flex", flexDirection: "row", gap: 3 }}>
          <Sidebar />
          <Box
            sx={{
              backgroundColor: "rgba(254, 247, 240, 0.6)",
              height: "100%",
              borderRadius: 3,
              p: 4,
              width: "100%",
              boxShadow: "0 8px 24px rgba(56, 29, 12, 0.08)",
            }}
          >
            {page.analitycs && <AnaliticsPage />}
            {page.messages && <MessagesPage />}
            {page.reviews && <ReviewsPage />}
            {page.products && <ProductsPage />}
            {page.users && <UsersPage />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
