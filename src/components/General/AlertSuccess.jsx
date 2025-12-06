import { useTheme, Collapse, Alert } from "@mui/material";

export default function ALertSuccess({ success, children }) {
  const theme = useTheme();

  return (
    <Collapse in={Boolean(success)} timeout={300}>
      <Alert
        severity={"success"}
        sx={{
          mt: 1,
          bgcolor: theme.palette.success.dark,
          color: theme.palette.success.contrastText,
          fontSize: 14,
        }}
      >
        {children}
      </Alert>
    </Collapse>
  );
}
