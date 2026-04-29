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
import { MessageRow } from "./Message";
import {
  useAdminMessagesQuery,
  useMarkMessageReadMutation,
} from "@/entities/admin/lib/use-messages";
import type { MessagesTypes } from "@/entities/admin/model/type";

export default function MessagesTable() {
  const { data: messages = [] } = useAdminMessagesQuery<MessagesTypes[]>();

  const markRead = useMarkMessageReadMutation({
    onError: (error) =>
      console.error("Failed to mark message as read:", error),
  });

  const readMessage = (id: string) => {
    markRead.mutate(id);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Имя</TableCell>
            <TableCell>Телефон</TableCell>
            <TableCell align="right">Прочитать</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((m) => (
            <MessageRow
              key={m.id}
              msg={m}
              onMarkRead={readMessage}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
