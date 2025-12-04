import { Paper, Typography, Box } from "@mui/material";

export default function Form({
  width,
  name,
  onSubmit,
  children,
  mt = 4,
  mb = 4,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: mb,
        mt: mt,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: { width } }}>
        <Typography variant="h5" mb={2}>
          {name}
        </Typography>
        <Box component="form" onSubmit={onSubmit}>
          {children}
        </Box>
      </Paper>
    </Box>
  );
}
