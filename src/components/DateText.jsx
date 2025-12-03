import { Typography } from "@mui/material";

export default function DateText({ label, date }) {
  return (
    <Typography variant="body2" sx={{ color: "gray" }}>
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
