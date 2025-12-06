import { useTheme, Typography } from "@mui/material";
import { Link } from "react-router";

export default function Logo() {
  const theme = useTheme();

  return (
    <Typography
      variant="h4"
      component={Link}
      to="/"
      sx={{
        color: theme.palette.text.primary,
        textDecoration: "none",
        fontWeight: 600,
      }}
    >
      Blog API
    </Typography>
  );
}
