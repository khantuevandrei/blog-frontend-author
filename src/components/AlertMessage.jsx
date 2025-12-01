// src/components/AlertMessage.jsx
import { Alert } from "@mui/material";

export default function AlertMessage({ type, children }) {
  return (
    <Alert severity={type} sx={{ mt: 2 }}>
      {children}
    </Alert>
  );
}
