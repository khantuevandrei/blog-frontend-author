import { Box, Typography } from "@mui/material";

export default function Comment({ comment, isLast }) {
  return (
    <Box
      sx={{
        mb: 2,
        pb: 2,
        borderBottom: isLast ? "none" : "1px solid gray",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          @{comment.author.username}
        </Typography>
        <Typography variant="caption" sx={{ color: "gray" }}>
          {new Date(comment.created_at).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={{ whiteSpace: "pre-line", color: "#333" }}
      >
        {comment.body}
      </Typography>
    </Box>
  );
}
