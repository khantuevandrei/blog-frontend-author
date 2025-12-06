import { useTheme, Typography } from "@mui/material";

export default function PostsHeader() {
  const theme = useTheme();

  return (
    <Typography
      variant="h4"
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        mb: 4,
        fontWeight: 600,
        textAlign: "center",
        color: theme.palette.text.primary,
      }}
    >
      Your Posts:
    </Typography>
  );
}
