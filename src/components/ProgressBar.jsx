import { LinearProgress, Box, useTheme } from "@mui/material";

export default function ProgressBar({ validations }) {
  const theme = useTheme();

  const values = Object.values(validations);
  const total = values.length;
  const passed = values.filter(Boolean).length;
  const progress = (passed / total) * 100;

  return (
    <Box sx={{ mt: 1 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : theme.palette.grey[300],
          "& .MuiLinearProgress-bar": {
            borderRadius: 5,
            backgroundColor: theme.palette.primary.main,
          },
        }}
      />
    </Box>
  );
}
