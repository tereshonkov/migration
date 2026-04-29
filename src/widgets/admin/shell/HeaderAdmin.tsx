"use client";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/widgets/header/Header.module.css";
import Link from "next/link";
import { useLogoutMutation } from "@/features/auth/lib/use-logout";
import { useQueryClient } from "@tanstack/react-query";

export default function HeaderAdmin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logoutMutation = useLogoutMutation({
    onSuccess: () => {
      queryClient.clear();
      router.push("/signin");
    },
    onError: (error) => console.error("Ошибка при выходе:", error),
  });
  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        background:
          "linear-gradient(155deg, rgba(255, 244, 232, 0.97), rgba(247, 210, 173, 0.9))",
        boxShadow: "0 4px 16px rgba(56, 29, 12, 0.1)",
        borderRadius: 3,
        border: "none",
        width: "100%",
        mb: 3,
        pb: 2,
        pt: 2,
        pl: 3,
        pr: 3,
      }}
    >
      <Toolbar disableGutters>
        <div className={styles.logoWrapper}>
          <Link href="/" className={styles.logo}>
            <Image src="/logo.png" alt="Logo" width={150} height={50} />
          </Link>
        </div>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          onClick={() => logoutMutation.mutate()}
          variant="contained"
          disabled={logoutMutation.isPending}
          sx={{
            ml: 2,
            borderRadius: "999px",
            padding: "10px 24px",
            fontWeight: 600,
            background:
              "linear-gradient(135deg, rgba(112, 64, 21, 1), rgba(66, 35, 19, 1))",
            color: "rgba(254, 247, 240, 1)",
            boxShadow: "0 4px 12px rgba(66, 35, 19, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(66, 35, 19, 0.4)",
            },
          }}
        >
          Выход
        </Button>
      </Toolbar>
    </AppBar>
  );
}
