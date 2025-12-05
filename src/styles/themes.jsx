import { createTheme } from "@mui/material";

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1e40af", // Tailwind Blue 500
      light: "#3b82f6",
      dark: "#173494ff",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f472b6", // Tailwind Pink 400
      light: "#f9a8d4",
      dark: "#be185d",
      contrastText: "#fff",
    },
    error: {
      main: "#ef4444", // Tailwind Red 500
      light: "#f87171",
      dark: "#b91c1c",
      contrastText: "#fff",
    },
    success: {
      main: "#22c55e", // Tailwind Green 500
      light: "#4ade80",
      dark: "#15803d",
      contrastText: "#fff",
    },
    info: {
      main: "#0ea5e9", // Tailwind Sky 500
      light: "#38bdf8",
      dark: "#0369a1",
      contrastText: "#fff",
    },
    background: {
      default: "#f9fafb", // Tailwind Gray 50
      paper: "#ffffff",
      image: `
        radial-gradient(circle at 20% 25%, #6091faff, transparent 80%),
        radial-gradient(circle at 60% 70%, #f88ec8ff, transparent 80%)
      `,
    },
    text: {
      primary: "#111827", // Tailwind Gray 900
      secondary: "#374151", // Tailwind Gray 700
    },
  },
  typography: {
    fontFamily: "'Poppins', Arial, sans-serif",
    button: { textTransform: "none", fontWeight: 500 },
  },
});

// Dark theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#60a5fa", // Tailwind Blue 400
      light: "#93c5fd",
      dark: "#3b82f6",
      contrastText: "#0b0f19",
    },
    secondary: {
      main: "#f9a8d4", // Tailwind Pink 300
      light: "#fbcfe8",
      dark: "#db2777",
      contrastText: "#000",
    },
    error: {
      main: "#f87171", // Tailwind Red 400
      light: "#fca5a5",
      dark: "#b91c1c",
      contrastText: "#000",
    },
    success: {
      main: "#4ade80", // Tailwind Green 400
      light: "#86efac",
      dark: "#15803d",
      contrastText: "#000",
    },
    info: {
      main: "#38bdf8", // Tailwind Sky 400
      light: "#7dd3fc",
      dark: "#0369a1",
      contrastText: "#000",
    },
    background: {
      default: "#111827", // Tailwind Gray 900
      paper: "#1f2937", // Tailwind Gray 800
      image: `
        radial-gradient(circle at 20% 25%, rgba(96,165,250,0.25), transparent 70%),
        radial-gradient(circle at 65% 75%, rgba(249,168,212,0.22), transparent 75%)
      `,
    },
    text: {
      primary: "#f9fafb", // Tailwind Gray 50
      secondary: "#d1d5db", // Tailwind Gray 300
    },
  },
  typography: {
    fontFamily: "'Poppins', Arial, sans-serif",
    button: { textTransform: "none", fontWeight: 500 },
  },
});
