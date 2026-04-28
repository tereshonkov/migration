import { TableCell, TableRow } from "@mui/material";

export default function UserRow({
  user,
}: {
  user: { name: string; email: string; role: string };
}) {
  return (
    <TableRow
      sx={{
        backgroundColor: "rgba(106, 209, 223, 0.2)",
        cursor: "pointer",
      }}
    >
      <TableCell />
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell align="right">{user.role}</TableCell>
    </TableRow>
  );
}
