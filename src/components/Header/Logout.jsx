import { useTheme, Typography, Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const theme = useTheme();

  return (
    <Button
      onClick={() => {
        logout();
      }}
      sx={{
        color: theme.palette.text.primary,
        fontSize: 20,
      }}
    >
      Logout
    </Button>
  );
}
