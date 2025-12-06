import { useTheme, Typography, Link } from "@mui/material";
import HeaderLink from "./HeaderLink";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function UserButton() {
  const { user } = useContext(AuthContext);

  const theme = useTheme();

  return (
    <Typography
      variant="body1"
      sx={{
        fontSize: 20,
        color: theme.palette.text.primary,
        display: "flex",
        alignItems: "center",
      }}
    >
      Hello,&nbsp;{" "}
      <Link
        sx={{
          textDecoration: "none",
          color: theme.palette.primary.main,
          fontWeight: 600,
        }}
      >
        {user.username}
      </Link>
    </Typography>
  );
}
