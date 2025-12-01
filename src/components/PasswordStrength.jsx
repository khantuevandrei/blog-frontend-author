import { LinearProgress, Box } from "@mui/material";

export default function PasswordStrength({ validations }) {
  const strength =
    Object.values(validations).filter(Boolean).length /
    Object.values(validations).length;

  return (
    <Box sx={{ mt: 1 }}>
      <LinearProgress
        variant="determinate"
        value={strength * 100}
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Box>
  );
}
