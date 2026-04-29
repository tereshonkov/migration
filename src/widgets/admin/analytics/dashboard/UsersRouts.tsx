"use client";

import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import PageviewIcon from "@mui/icons-material/Pageview";
import { useMemo } from "react";
import { usePageVisitsQuery } from "@/entities/admin/lib/use-analytics";

interface RoutesStats {
  page: string;
  views: number;
}

const HIDDEN_PAGES = new Set(["/admin", "/signin", "/admin/create"]);

export default function UsersRouts() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data: routes } = usePageVisitsQuery<RoutesStats[]>({
    enabled: Boolean(token),
  });

  const visibleRoutes = useMemo(
    () => (routes ?? []).filter((rout) => !HIDDEN_PAGES.has(rout.page)),
    [routes],
  );

  return (
    <Grid size={{ xs: 12, sm: 6, md: 8 }}>
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
            boxShadow: "0 12px 32px rgba(56, 29, 12, 0.18)",
          },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ mb: 2, fontWeight: 600, opacity: 0.8 }}
        >
          Наиболее посещаемые страницы
        </Typography>

        <TableContainer sx={{ maxHeight: 300 }}>
          <Table size="small">
            <TableBody>
              {visibleRoutes.map((rout) => (
                <TableRow key={rout.page} hover>
                  <TableCell sx={{ maxWidth: 500, overflow: "hidden" }}>
                    {rout.page}
                  </TableCell>
                  <TableCell align="right">{rout.views}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <PageviewIcon
          sx={{
            position: "absolute",
            bottom: -10,
            right: -10,
            fontSize: 80,
            color: (theme) => theme.palette.primary.main,
            opacity: 0.15,
            transform: "rotate(15deg)",
          }}
        />
      </Paper>
    </Grid>
  );
}
