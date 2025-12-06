import { useTheme, Typography, Link as MuiLink } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router";

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
      <MuiLink
        component={Link}
        to="/me"
        sx={{
          textDecoration: "none",
          color: theme.palette.primary.main,
          fontWeight: 600,
        }}
      >
        {user.username}
      </MuiLink>
    </Typography>
  );
}
