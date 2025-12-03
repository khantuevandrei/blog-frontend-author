import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e1e1e" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "inherit", textDecoration: "none", fontWeight: 600 }}
        >
          Blog API
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              <Typography variant="body1">
                Hello,{" "}
                <Link
                  to={"/me"}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: 700,
                  }}
                >
                  {user.username}
                </Link>
              </Typography>
              <Button color="inherit" onClick={logout} sx={{ ml: 2 }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ ml: 2 }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={{ ml: 2 }}
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
