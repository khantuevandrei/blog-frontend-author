import { LinearProgress, Box } from "@mui/material";

export default function ProgressBar({ validations }) {
  const values = Object.values(validations);
  const total = values.length;
  const passed = values.filter(Boolean).length;
  const progress = (passed / total) * 100;

  return (
    <Box sx={{ mt: 1 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Box>
  );
}
