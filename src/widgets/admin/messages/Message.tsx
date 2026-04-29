import { TableCell, TableRow, IconButton, Button, Box, Collapse } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useState } from "react";
import { MessagesTypes } from "@/entities/admin/model/type";

export function MessageRow({
  msg,
  onMarkRead,
}: {
  msg: MessagesTypes;
  onMarkRead: (_id: string) => void | Promise<void>;
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
        <TableCell>{msg.name}</TableCell>
        <TableCell>{msg.phone}</TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color={msg.read ? "success" : "primary"}
            size="small"
            onClick={() => onMarkRead(msg.id)}
          >
            {msg.read ? "Прочитано" : "Отметить как прочитано"}
          </Button>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={4} sx={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, fontSize: "0.95rem" }}>{msg?.message}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
