import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Form from "../../components/Form";
import FormField from "../../components/FormField";
import PasswordField from "../../components/PasswordField";
import UsernameChecklist from "../../components/UsernameChecklist";
import PasswordChecklist from "../../components/PasswordChecklist";
import FormButton from "../../components/FormButton";
import AlertMessage from "../../components/AlertMessage";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState({ username: null, password: null });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const usernameRegex = {
    length: /^.{3,20}$/,
    validChars: /^[A-Za-z0-9_]+$/,
  };

  const usernameValidations = {
    length: usernameRegex.length.test(form.username),
    validChars: usernameRegex.validChars.test(form.username),
  };

  const passwordRegex = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    number: /\d/,
    symbol: /[!@#$%^&*()_\-+=[\]{};:"\\|,.<>/?]/,
    length: /.{8,}/,
  };

  const passwordValidations = {
    length: passwordRegex.length.test(form.password),
    lowercase: passwordRegex.lowercase.test(form.password),
    uppercase: passwordRegex.uppercase.test(form.password),
    number: passwordRegex.number.test(form.password),
    symbol: passwordRegex.symbol.test(form.password),
    passwordsMatch: form.password && form.password === form.confirmPassword,
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError({ username: null, password: null });
    setLoading(true);

    if (Object.values(usernameValidations).some((v) => !v)) {
      setLoading(false);
      setError((prev) => ({
        ...prev,
        username: "Please fix username validation errors",
      }));
      return;
    }

    if (Object.values(passwordValidations).some((v) => !v)) {
      setLoading(false);
      setError((prev) => ({
        ...prev,
        password: "Please fix password validation errors",
      }));
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
        setLoading(false);
        return;
      }

      navigate("/login");
    } catch {
      setError("Network error");
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      <Form width={400} name="Register" onSubmit={handleSubmit}>
        <FormField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <UsernameChecklist validations={usernameValidations} />
        {error.username && (
          <AlertMessage type="error">{error.username}</AlertMessage>
        )}
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
        <PasswordChecklist validations={passwordValidations} />
        <FormButton name="Register" disabled={loading} />
        {error.password && (
          <AlertMessage type="error">{error.password}</AlertMessage>
        )}
      </Form>
    </Box>
  );
}
