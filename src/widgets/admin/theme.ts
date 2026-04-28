import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const designTokens = {
  palette: {
    mode: "light" as const,
    primary: {
      main: "rgba(112, 64, 21, 1)",
    },
    secondary: {
      main: "rgba(247, 210, 173, 1)",
    },
    error: { main: red.A400 },
    background: {
      default: "rgba(255, 235, 214, 1)",
      paper: "rgba(254, 247, 240, 1)",
    },
    text: {
      primary: "rgba(66, 35, 19, 1)",
      secondary: "rgba(112, 64, 21, 0.7)",
    },
  },
  shape: { borderRadius: 16 },
};

export const adminTheme = createTheme(designTokens);
