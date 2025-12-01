import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Live validation
  const [validations, setValidations] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
    passwordsMatch: false,
  });

  const passwordRegex = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    number: /\d/,
    symbol: /[!@#$%^&*()_\-+=\[\]{};:"\\|,.<>\/?]/,
    length: /.{8,}/,
  };

  // Update live validation on password change
  useEffect(() => {
    const password = form.password;
    setValidations({
      length: passwordRegex.length.test(password),
      lowercase: passwordRegex.lowercase.test(password),
      uppercase: passwordRegex.uppercase.test(password),
      number: passwordRegex.number.test(password),
      symbol: passwordRegex.symbol.test(password),
      passwordsMatch: password && password === form.confirmPassword,
    });
  }, [form.password, form.confirmPassword]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  function toggleConfirmPassword() {
    setShowConfirmPassword((prev) => !prev);
  }

  function passwordStrength() {
    const vals = Object.values(validations);
    return vals.filter(Boolean).length / vals.length;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Final validation
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
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError("Network error");
    }
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8, px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" mb={2}>
          Create an account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            fullWidth
            margin="normal"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPassword} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* Password strength meter */}
          <Box sx={{ mt: 1 }}>
            <LinearProgress
              variant="determinate"
              value={passwordStrength() * 100}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
          {/* Live validation checklist */}
          <List dense sx={{ mt: 1 }}>
            {[
              { label: "At least 8 characters", key: "length" },
              { label: "Lowercase letter", key: "lowercase" },
              { label: "Uppercase letter", key: "uppercase" },
              { label: "Number", key: "number" },
              { label: "Symbol", key: "symbol" },
              { label: "Passwords match", key: "passwordsMatch" },
            ].map((item) => (
              <ListItem key={item.key}>
                <ListItemIcon>
                  {validations[item.key] ? (
                    <CheckCircle color="success" />
                  ) : (
                    <Cancel color="error" />
                  )}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}
      </Paper>
    </Box>
  );
}
