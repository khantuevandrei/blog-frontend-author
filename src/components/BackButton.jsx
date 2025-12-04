import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function BackButton({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: 16,
        left: 16,
        bgcolor: "#1e1e1e",
        color: "#fff",
        fontSize: 40,
        "&:hover": {
          bgcolor: "#333",
          color: "#fff",
        },
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
        borderRadius: 100,
        p: 1.5,
      }}
    >
      <ArrowBack sx={{ fontSize: 25 }} />
    </IconButton>
  );
}
