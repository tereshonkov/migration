"use client";

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
import {
  useAdminReviewsQuery,
  useApproveReviewMutation,
  useCancelReviewMutation,
} from "@/entities/admin/lib/use-reviews";
import type { ReviewsTypes } from "@/entities/services/model/review";

export default function ReviewsTable() {
  const { data: reviews = [] } = useAdminReviewsQuery<ReviewsTypes[]>();

  const approveMutation = useApproveReviewMutation({
    onError: (error) =>
      console.error("Ошибка подтверждения отзыва", error),
  });

  const cancelMutation = useCancelReviewMutation({
    onError: (error) => console.error("Ошибка отмены отзыва:", error),
  });

  const approveReview = (id: string) => {
    approveMutation.mutate(id);
  };

  const canceledReview = (id: string) => {
    cancelMutation.mutate(id);
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
              approveReview={approveReview}
              cancelReview={canceledReview}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
