import { Paper, Typography, Box, useTheme } from "@mui/material";

export default function Form({
  width,
  name,
  onSubmit,
  children,
  mt = 4,
  mb = 4,
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        mb: mb,
        mt: mt,
        width: "100%",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: { width },
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          position: "relative",
        }}
      >
        <Typography variant="h5" mb={2} sx={{ fontWeight: 500 }}>
          {name}
        </Typography>
        <Box component="form" onSubmit={onSubmit}>
          {children}
        </Box>
      </Paper>
    </Box>
  );
}
