import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { Box } from "@mui/material";
import Form from "../../components/Form";
import FormField from "../../components/FormField";
import PasswordField from "../../components/PasswordField";
import FormButton from "../../components/FormButton";
import AlertMessage from "../../components/AlertMessage";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

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
        setLoading(false);
        return;
      }

      // Save token to localStorage
      login(data.token, data.user);

      navigate("/");
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
      <Form width={400} name="Login" onSubmit={handleSubmit}>
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
        <FormButton name="Login" disabled={loading} />
        {error && <AlertMessage type="error">{error}</AlertMessage>}
      </Form>
    </Box>
  );
}
