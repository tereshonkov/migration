import Link from "next/link";
import Footer from "@/widgets/footer/Footer";
import { FC } from "react";

const NotFound: FC = () => (
  <div className="container">
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontSize: "5rem", margin: 0, color: "#e53935" }}>404</h1>
      <h2 style={{ margin: "1rem 0", color: "var(--foreground)" }}>
        Сторінку не знайдено
      </h2>
      <p style={{ marginBottom: "2rem", color: "var(--muted-foreground)" }}>
        Вибачте, такої сторінки не існує або вона була переміщена.
      </p>
      <Link
        href="/"
        style={{
          background: "var(--text-color-secondary)",
          color: "#fff",
          padding: "0.75rem 2rem",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        }}
      >
        На головну
      </Link>
    </main>
    <Footer />
  </div>
);

export default NotFound;
