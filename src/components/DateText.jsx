import { Typography, useTheme } from "@mui/material";

export default function DateText({ label, date }) {
  const theme = useTheme();
  return (
    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
      {label}:{" "}
      {new Date(date).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </Typography>
  );
}
