"use client";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchBar from "../SearchAdmin/Search";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../Header/Header.module.css";
import Link from "next/link";

export default function HeaderAdmin() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/login"); // Изменено на /login (страница входа NextAuth)
      router.refresh();
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };
  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        background: (theme) => 
          theme.palette.mode === "light"
            ? "linear-gradient(155deg, rgba(255, 244, 232, 0.97), rgba(247, 210, 173, 0.9))"
            : "linear-gradient(135deg, #2a1f18 0%, #1a1410 100%)",
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
        <SearchBar />

        {/* Spacer для выравнивания */}
        <Box sx={{ flexGrow: 1 }} />

        <Button 
          onClick={handleLogout} 
          variant="contained" 
          sx={{ 
            ml: 2,
            borderRadius: "999px",
            padding: "10px 24px",
            fontWeight: 600,
            background: "linear-gradient(135deg, rgba(112, 64, 21, 1), rgba(66, 35, 19, 1))",
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
