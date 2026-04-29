"use client";

import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { useMemo } from "react";
import { useAllReviewsQuery } from "@/entities/reviews/lib/use-reviews-list";

export default function UsersLastReview() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data: reviews = [] } = useAllReviewsQuery({
    enabled: Boolean(token),
  });

  const review = useMemo(() => {
    if (!reviews.length) return null;
    return reviews[reviews.length - 1];
  }, [reviews]);

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
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 32px rgba(56, 29, 12, 0.18)",
          },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ mb: 2, fontWeight: 600, opacity: 0.8 }}
        >
          Последние отзыв
        </Typography>

        <List sx={{ maxHeight: 120, overflowY: "auto" }}>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText
              primary={review?.name}
              secondary={review?.text}
              primaryTypographyProps={{ fontWeight: "bold" }}
            />
          </ListItem>
        </List>

        <CommentIcon
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
