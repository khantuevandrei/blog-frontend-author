import { Typography } from "@mui/material";

export default function MetaLine({ label, value }) {
  return (
    <Typography variant="body2" sx={{ color: "gray" }}>
      {label}:{" "}
      {new Date(value).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </Typography>
  );
}
