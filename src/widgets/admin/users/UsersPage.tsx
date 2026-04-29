"use client";

import {
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  Table,
  TableBody,
} from "@mui/material";
import UserRow from "./UserRow";
import { useAdminUsersQuery } from "@/entities/admin/lib/use-users";

type AdminUserRow = { name: string; email: string; role: string };

export default function UsersPage() {
  const { data: users = [] } = useAdminUsersQuery<AdminUserRow[]>();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Имя</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Роль</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <UserRow key={index} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
