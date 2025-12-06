import { useTheme, Collapse, Alert } from "@mui/material";

export default function AlertMessage({ error, children }) {
  const theme = useTheme();

  return (
    <Collapse in={Boolean(error)} timeout={300}>
      <Alert
        severity={"error"}
        sx={{
          mt: 1,
          bgcolor: theme.palette.error.light,
          color: theme.palette.error.contrastText,
          fontSize: 14,
        }}
      >
        {children}
      </Alert>
    </Collapse>
  );
}
