"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";

import Sidebar from "@/components/Sidebar/Sidebar";
import HeaderAdmin from "@/components/HeaderAdmin/HeaderAdmin";
import AnaliticsPage from "@/components/AnaliticsPage/AnaliticsPage";
import MessagesPage from "@/components/MessagesPage/MessagePage";
import ReviewsPage from "@/components/ReviewsPage/ReviewsPage";
import ProductsPage from "@/components/ProductsPage/ProductsPage";
import UsersPage from "@/components/UsersPage/UsersPage";
import { useTabContext } from "@/context/TabContext";

export default function Admin() {
  const { data: session, status } = useSession();
  const { page } = useTabContext();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Box 
        display="flex" 
        minHeight="100vh" 
        alignItems="center" 
        justifyContent="center"
        sx={{
          background: (theme) => 
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, rgba(255, 235, 214, 1) 0%, rgba(247, 210, 173, 1) 50%, rgba(255, 235, 214, 1) 100%)"
              : "#0d0a08",
        }}
      >
        <Box sx={{ color: (theme) => theme.palette.mode === "light" ? "#4a3521" : "#f5e6d3" }}>
          Загрузка сессии...
        </Box>
      </Box>
    );
  }

  if (!session) {
    return null; // Редирект уже сработает
  }

  return (
    <Box 
      display="flex" 
      minHeight="100vh" 
      px={5} 
      py={4}
      sx={{
        background: (theme) => 
          theme.palette.mode === "light"
            ? "linear-gradient(135deg, rgba(255, 235, 214, 1) 0%, rgba(247, 210, 173, 1) 50%, rgba(255, 235, 214, 1) 100%)"
            : "#0d0a08",
      }}
    >
      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <HeaderAdmin />
        <Box sx={{ mb: 2, display: "flex", flexDirection: "row", gap: 3 }}>
        <Sidebar />
          <Box
            sx={(theme) => ({
              backgroundColor:
                theme.palette.mode === "light"
                  ? "rgba(254, 247, 240, 0.6)"
                  : "linear-gradient(180deg, #2a1f18 0%, #1a1410 100%)",
              height: "100%",
              borderRadius: 3,
              p: 4,
              width: "100%",
              boxShadow: "0 8px 24px rgba(56, 29, 12, 0.08)",
            })}
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
