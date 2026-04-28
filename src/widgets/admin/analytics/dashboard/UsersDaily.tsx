"use client";
import { Grid, Paper, Typography, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { useEffect, useState } from "react";
import { getAnalitycsDay } from "@/api/analitycs";
import type { UserRequest } from "@/types/users";

export default function UsersDaily() {
  const [users, setUsers] = useState<UserRequest[]>();
  const token = localStorage.getItem("token");
  useEffect(() => {
    getAnalitycsDay()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching analytics data:", error);
      });
  }, [token]);
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
<Paper
  sx={{
    p: 3,
    position: "relative",
    overflow: "hidden",
    borderRadius: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 150,
    background: (theme) =>
      theme.palette.mode === "light"
        ? "linear-gradient(155deg, rgba(255, 244, 232, 0.97), rgba(247, 210, 173, 0.9))"
        : "linear-gradient(135deg, #2a1f18 0%, #1a1410 100%)",
    color: (theme) => theme.palette.text.primary,
    boxShadow: "0 8px 24px rgba(56, 29, 12, 0.12)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 32px rgba(56, 29, 12, 0.18)",
    },
  }}
>
  <Box>
    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, opacity: 0.8 }}>
      Пользователи за день
    </Typography>
    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
      {users && users.length > 0 ? users[0].activeUsers : 0}
    </Typography>
  </Box>
  <PeopleIcon
    sx={{
      position: "absolute",
      bottom: -10,
      right: -10,
      fontSize: 80,
      color: (theme) => theme.palette.primary.main,
      opacity: 0.15,
      transform: "rotate(20deg)",
    }}
  />
</Paper>

    </Grid>
  );
}
