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
        fontSize: 15,
        height: 38,
        "&:hover": { bgcolor: "#2a2a2a" },
        transition: "background 0.3s",
      }}
    >
      {disabled ? <CircularProgress size={25} color="inherit" /> : name}
    </Button>
  );
}
