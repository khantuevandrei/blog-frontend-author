import { Button, CircularProgress } from "@mui/material";

export default function FormButton({ name, disabled }) {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={disabled}
      fullWidth
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
