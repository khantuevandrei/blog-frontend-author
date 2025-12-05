import { ArrowBack } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";

export default function BackButton({ onClick }) {
  const theme = useTheme();

  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: 16,
        left: 16,
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontSize: 40,
        "&:hover": {
          bgcolor: theme.palette.primary.light,
        },
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
        borderRadius: 100,
        p: 1.5,
      }}
    >
      <ArrowBack sx={{ fontSize: 20 }} />
    </IconButton>
  );
}
