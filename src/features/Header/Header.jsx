import { Box, useTheme } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Logo from "../../components/Header/Logo";
import ThemeButton from "../../components/Header/ThemeButton";
import UserButton from "../../components/Header/UserButton";
import Logout from "../../components/Header/Logout";
import HeaderLink from "../../components/Header/HeaderLink";

export default function Header() {
  const theme = useTheme();
  const { user } = useContext(AuthContext);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.up("sm")]: { justifyContent: "space-between" },
        flexWrap: "wrap",
        width: "100%",
        mx: "auto",
        maxWidth: "md",
        gap: 2,
      }}
    >
      <Logo />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <ThemeButton />
        {user ? (
          <>
            <UserButton />
            <Logout />
          </>
        ) : (
          <>
            <HeaderLink title="Login" nav="/login" />
            <HeaderLink title="Register" nav="/register" />
          </>
        )}
      </Box>
    </Box>
  );
}
