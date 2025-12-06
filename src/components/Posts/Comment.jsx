import { Box, Typography, useTheme } from "@mui/material";
import MetaLine from "./MetaLine";

export default function Comment({ comment, isLast }) {
  const theme = useTheme();

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
        <MetaLine value={comment.created_at} />
      </Box>
      <Typography
        variant="body1"
        sx={{ whiteSpace: "pre-line", color: theme.palette.text.primary }}
      >
        {comment.body}
      </Typography>
    </Box>
  );
}
