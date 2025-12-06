import { Box, CircularProgress, useTheme } from "@mui/material";

export default function LoadingOverlay() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.1)" // light overlay for dark mode
            : "rgba(0,0,0,0.3)", // dark overlay for light mode
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
      }}
    >
      <CircularProgress
        size={60}
        sx={{
          color:
            theme.palette.mode === "dark"
              ? theme.palette.primary.light
              : theme.palette.primary.dark,
        }}
      />
    </Box>
  );
}
