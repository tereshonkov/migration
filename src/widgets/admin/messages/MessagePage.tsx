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
import { MessageRow } from "./Message";
import { useEffect } from "react";
import { getMessages, markMessageAsRead } from "@/entities/admin/api/messages";
import { MessagesTypes } from "@/entities/admin/model/type";

export default function MessagesTable() {
  const [messages, setMessages] = useState<MessagesTypes[]>([]);

  const handleMarkRead = (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  useEffect(() => {
    getMessages().then((data) => setMessages(data));
  }, []);

  const readMessage = async (id: string) => {
    try {
      await markMessageAsRead(id);
      handleMarkRead(id);
      await getMessages().then((data) => setMessages(data));
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
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
              onMarkRead={(id) => {
                readMessage(id);
              }}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
