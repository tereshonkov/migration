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
import { useState, useEffect } from "react";
import { getUsers } from "@/api/users";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
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
          {users.map(
            (
              user: { name: string; email: string; role: string },
              index,
            ) => (
              <UserRow key={index} user={user} />
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
