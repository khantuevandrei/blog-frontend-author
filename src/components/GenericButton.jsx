import { Button, CircularProgress } from "@mui/material";

export default function GenericButton({ name, disabled, onClick }) {
  return (
    <Button
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      sx={{
        mt: 2,
        bgcolor: "#1e1e1e",
        color: "#fff",
        textTransform: "none",
        fontWeight: 500,
        "&:hover": { bgcolor: "#333" },
        "&:disabled": { bgcolor: "#2a2a2a", color: "#888" },
        transition: "background 0.3s",
      }}
    >
      {disabled ? <CircularProgress size={20} color="inherit" /> : name}
    </Button>
  );
}
