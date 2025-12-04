import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Form from "../../components/Form";
import FormField from "../../components/FormField";
import PasswordField from "../../components/PasswordField";
import ProgressBar from "../../components/ProgressBar";
import FieldsChecklist from "../../components/FieldsChecklist";
import FormButton from "../../components/FormButton";
import AlertMessage from "../../components/AlertMessage";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
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

  const passwordRegex = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    number: /\d/,
    symbol: /[!@#$%^&*()_\-+=[\]{};:"\\|,.<>/?]/,
    length: /.{8,}/,
  };

  const validations = {
    usernameLength: usernameRegex.length.test(form.username),
    validChars: usernameRegex.validChars.test(form.username),
    passLength: passwordRegex.length.test(form.password),
    lowercase: passwordRegex.lowercase.test(form.password),
    uppercase: passwordRegex.uppercase.test(form.password),
    number: passwordRegex.number.test(form.password),
    symbol: passwordRegex.symbol.test(form.password),
    passwordsMatch: form.password && form.password === form.confirmPassword,
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (Object.values(validations).some((v) => !v)) {
      setLoading(false);
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
        setLoading(false);
        return;
      }

      navigate("/login");
    } catch {
      setError("Network error");
    }
  };

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
        <ProgressBar validations={validations} />
        <FieldsChecklist validations={validations} />
        <FormButton name="Register" disabled={loading} />
        {error && <AlertMessage type="error">{error}</AlertMessage>}
      </Form>
    </Box>
  );
}
