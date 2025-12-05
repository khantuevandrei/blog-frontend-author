import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  Tooltip,
  IconButton,
} from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useThemeMode } from "../../context/ThemeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeMode();
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          component={Link}
          to="/"
          sx={{
            color: theme.palette.text.primary,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Blog API
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <IconButton
              onClick={toggleTheme}
              sx={{ color: theme.palette.text.primary }}
            >
              {isDarkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>
          {user ? (
            <>
              <Typography variant="body1" sx={{ fontSize: 20 }}>
                Hello,{" "}
                <Link
                  to={"/me"}
                  style={{
                    textDecoration: "none",
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                  }}
                >
                  {user.username}
                </Link>
              </Typography>
              <Button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                sx={{
                  ml: 2,
                  color: theme.palette.text.primary,
                  fontSize: 20,
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  ml: 2,
                  color: theme.palette.text.primary,
                  fontSize: 20,
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{
                  ml: 2,
                  color: theme.palette.text.primary,
                  fontSize: 20,
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
