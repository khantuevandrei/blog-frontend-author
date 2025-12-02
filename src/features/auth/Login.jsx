import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import UsernameField from "../../components/UsernameField";
import PasswordField from "../../components/PasswordField";
import AlertMessage from "../../components/AlertMessage";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "https://blog-backend-production-16f8.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save token to localStorage
      login(data.token, data.user);

      navigate("/");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8, px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <UsernameField value={form.username} onChange={handleChange} />
          <PasswordField
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : "Login"}
          </Button>
        </form>
        {error && <AlertMessage type="error">{error}</AlertMessage>}
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Dont't have an account?
          <br />
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "blue" }}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
