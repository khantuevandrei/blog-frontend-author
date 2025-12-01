import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2,
        textAlign: "center",
        borderTop: "1px solid #e0e0e0",
        color: "#ffffff",
        bgcolor: "#1e1e1e",
      }}
    >
      <Typography variant="body2">
        Blog API for Authors. For demonstration purposes only.
      </Typography>
    </Box>
  );
}
