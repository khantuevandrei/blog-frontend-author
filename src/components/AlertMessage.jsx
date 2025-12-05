// src/components/AlertMessage.jsx
import { Alert, useTheme } from "@mui/material";

export default function AlertMessage({ type, children }) {
  const theme = useTheme();

  return (
    <Alert
      severity={type}
      sx={{
        mt: 2,
        bgcolor:
          type === "error"
            ? theme.palette.error.light
            : type === "warning"
            ? theme.palette.warning.light
            : type === "success"
            ? theme.palette.success.light
            : theme.palette.info.light,
        color:
          type === "error"
            ? theme.palette.error.contrastText
            : type === "warning"
            ? theme.palette.warning.contrastText
            : type === "success"
            ? theme.palette.success.contrastText
            : theme.palette.info.contrastText,
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
      }}
    >
      {children}
    </Alert>
  );
}
