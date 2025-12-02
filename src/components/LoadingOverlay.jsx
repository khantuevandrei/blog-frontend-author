import { Box, CircularProgress } from "@mui/material";

export default function LoadingOverlay() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
      }}
    >
      <CircularProgress size={60} color="#1e1e1e" />
    </Box>
  );
}
