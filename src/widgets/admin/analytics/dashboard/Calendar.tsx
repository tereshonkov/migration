"use client";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";

export default function Calendar() {
  const [currentDate] = useState(() =>
    new Date().toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    }),
  );

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Paper
        sx={{
          p: 3,
          position: "relative",
          overflow: "hidden",
          height: "100%",
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(56, 29, 12, 0.12)",
          background: (theme) =>
            theme.palette.mode === "light"
              ? "linear-gradient(155deg, rgba(255, 244, 232, 0.97), rgba(247, 210, 173, 0.9))"
              : "linear-gradient(135deg, #2a1f18 0%, #1a1410 100%)",
          color: (theme) => theme.palette.text.primary,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 32px rgba(56, 29, 12, 0.18)",
          },
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, opacity: 0.8 }}>
          Сегодня
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "rgba(112, 64, 21, 1)" }}
        >
          {currentDate}
        </Typography>
        <CalendarMonthIcon
          sx={{
            position: "absolute",
            bottom: -10,
            right: -10,
            fontSize: 60,
            color: (theme) => theme.palette.primary.main,
            opacity: 0.15,
            transform: "rotate(15deg)",
          }}
        />
      </Paper>
    </Grid>
  );
}
