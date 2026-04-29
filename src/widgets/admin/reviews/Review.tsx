import {
  TableCell,
  TableRow,
  IconButton,
  Button,
  Box,
  Collapse,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useState } from "react";
import type { ReviewsTypes } from "@/entities/services/model/review";

export function Review({
  review,
  approveReview,
  cancelReview,
}: {
  review: ReviewsTypes;
  approveReview: (_id: string) => void | Promise<void>;
  cancelReview: (_id: string) => void | Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover>
        <TableCell width={50}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{review.name}</TableCell>
        <TableCell align="right">
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            color={review.isAproved ? "success" : "primary"}
            size="small"
            onClick={() => approveReview(review.id)}
          >
            {review.isAproved ? "Готово" : "Подтвердить"}
          </Button>
          <Button
            variant="contained"
            color={review.isAproved ? "success" : "error"}
            size="small"
            onClick={() => cancelReview(review.id)}
          >
            {review.isAproved ? "Прочитано" : "Отклонить"}
          </Button>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={4} sx={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, fontSize: "0.95rem" }}>{review?.text}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
