"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Review } from "./Review";
import { useEffect } from "react";
import { getReviews, approveReviewApi, cancelReview } from "@/api/reviews";
import type { ReviewsTypes } from "@/types/reviews";

export default function ReviewsTable() {
  const [reviews, setReviews] = useState<ReviewsTypes[]>([]);

  const handleMarkRead = (id: string) => {
    setReviews((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  useEffect(() => {
    getReviews().then((data) => setReviews(data));
  }, []);

  const approveReview = async (id: string) => {
    try {
      await approveReviewApi(id);
      handleMarkRead(id);
      await getReviews().then((data) => setReviews(data));
    } catch (error) {
      console.error("Ошибка подтверждения отзыва", error);
    }
  };

  const canceledReview = async (id: string) => {
    try {
      await cancelReview(id);
      handleMarkRead(id);
      await getReviews().then((data) => setReviews(data));
    } catch (error) {
      console.error("Ошибка отмены отзыва:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Имя</TableCell>
            <TableCell align="right">Одобрить / Отклонить</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((m) => (
            <Review
              key={m.id}
              review={m}
              approveReview={(id) => {
                approveReview(id);
              }}
              cancelReview={(id) => {
                canceledReview(id);
              }}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
