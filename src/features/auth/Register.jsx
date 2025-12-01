import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Button } from "@mui/material";
import UsernameField from "../../components/UsernameField";
import PasswordField from "../../components/PasswordField";
import PasswordStrength from "../../components/PasswordStrength";
import PasswordChecklist from "../../components/PasswordChecklist";
import AlertMessage from "../../components/AlertMessage";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const passwordRegex = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    number: /\d/,
    symbol: /[!@#$%^&*()_\-+=[\]{};:"\\|,.<>/?]/,
    length: /.{8,}/,
  };

  const validations = {
    length: passwordRegex.length.test(form.password),
    lowercase: passwordRegex.lowercase.test(form.password),
    uppercase: passwordRegex.uppercase.test(form.password),
    number: passwordRegex.number.test(form.password),
    symbol: passwordRegex.symbol.test(form.password),
    passwordsMatch: form.password && form.password === form.confirmPassword,
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (Object.values(validations).some((v) => !v)) {
      setError("Please fix the validation errors.");
      return;
    }

    try {
      const response = await fetch(
        "https://blog-backend-production-16f8.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess("Account created. Redirecting...");
      setTimeout(() => navigate("/login"), 3000);
    } catch {
      setError("Network error");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8, px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" mb={2}>
          Create an account
        </Typography>

        <form onSubmit={handleSubmit}>
          <UsernameField value={form.username} onChange={handleChange} />
          <PasswordField
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <PasswordStrength validations={validations} />
          <PasswordChecklist validations={validations} />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>

        {error && <AlertMessage type="error">{error}</AlertMessage>}
        {success && <AlertMessage type="success">{success}</AlertMessage>}
      </Paper>
    </Box>
  );
}
