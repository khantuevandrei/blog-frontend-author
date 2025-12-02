import { LinearProgress, Box } from "@mui/material";

export default function ProgressBar({ validations }) {
  const keys = [
    "usernameLength",
    "validChars",
    "passLength",
    "lowercase",
    "uppercase",
    "number",
    "symbol",
    "passwordsMatch",
  ];

  const values = keys.map((key) => validations[key]);
  const strength = values.filter(Boolean).length / keys.length;

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
