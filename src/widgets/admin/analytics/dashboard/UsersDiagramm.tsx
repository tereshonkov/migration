"use client";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useState, useEffect } from "react";
import { getAnalitycsWeek } from "@/entities/admin/api/analitycs";
import { UserRequest } from "@/types/users";

export default function UsersDiagramm() {
  const [data, setData] = useState<UserRequest[]>();
  const token = localStorage.getItem("token");
  useEffect(() => {
    getAnalitycsWeek().then((res) => {
      const sortedData = res?.sort((a: UserRequest, b: UserRequest) => a.date.localeCompare(b.date));
      setData(sortedData);
    });
  }, [token]);
  return (
    <Grid size={{ xs: 12, sm: 6, md: 8 }}>
<Paper
  sx={{
    p: 3,
    height: 300,
    position: "relative",
    overflow: "hidden",
    borderRadius: 3,
    boxShadow: "0 8px 24px rgba(56, 29, 12, 0.12)",
    background: (theme) =>
      theme.palette.mode === "light"
        ? "linear-gradient(155deg, rgba(255, 244, 232, 0.97), rgba(247, 210, 173, 0.9))"
        : "linear-gradient(135deg, #2a1f18 0%, #1a1410 100%)",
    color: (theme) => theme.palette.text.primary,
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 12px 32px rgba(56, 29, 12, 0.18)",
    },
  }}
>
  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, opacity: 0.8 }}>
    Пользователи за день
  </Typography>
  <Box
    sx={{
      height: "calc(100% - 32px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(112, 64, 21, 0.1)" />
        <XAxis 
          dataKey="date" 
          stroke="rgba(112, 64, 21, 0.6)"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="rgba(112, 64, 21, 0.6)"
          style={{ fontSize: '12px' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(254, 247, 240, 0.95)',
            border: '1px solid rgba(112, 64, 21, 0.2)',
            borderRadius: '8px',
          }}
        />
        <Bar 
          dataKey="activeUsers" 
          fill="rgba(112, 64, 21, 1)" 
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </Box>
</Paper>

    </Grid>
  );
}
