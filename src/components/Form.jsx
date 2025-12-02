import { Paper, Typography, Box } from "@mui/material";

export default function Form({ width, name, onSubmit, children }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        my: 4,
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
