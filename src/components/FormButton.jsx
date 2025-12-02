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
        "&:hover": { bgcolor: "#4d4d4dff" },
      }}
    >
      {disabled ? <CircularProgress size={20} color="inherit" /> : name}
    </Button>
  );
}
