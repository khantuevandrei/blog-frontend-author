import Form from "../../components/Form";
import FormField from "../../components/FormField";
import PasswordField from "../../components/PasswordField";
import FormButton from "../../components/FormButton";
import AlertMessage from "../../components/AlertMessage";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";
import { Box } from "@mui/material";

export default function User() {
  const { user, token, login } = useContext(AuthContext);
  const [error, setError] = useState({
    username: null,
    password: null,
  });
  const [success, setSuccess] = useState({
    username: null,
    password: null,
  });
  const [loading, setLoading] = useState({
    username: false,
    password: false,
  });
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
  }

  async function handleSubmitUsername(e) {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, username: true }));
    setError((prev) => ({ ...prev, username: null }));
    setSuccess((prev) => ({ ...prev, username: null }));

    if (!form.username) {
      setError((prev) => ({ ...prev, username: "Username cannot be empty" }));
      return;
    }

    try {
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({ username: form.username }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError((prev) => ({ ...prev, username: data.message }));
        return;
      }

      setForm((prev) => ({ ...prev, username: "" }));

      setSuccess((prev) => ({ ...prev, username: "Username updated" }));

      login(token, data);
    } catch {
      setError((prev) => ({ ...prev, username: "Network error" }));
    } finally {
      setLoading((prev) => ({ ...prev, username: false }));
    }
  }

  async function handleSubmitPassword(e) {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, password: true }));
    setError((prev) => ({ ...prev, password: null }));
    setSuccess((prev) => ({ ...prev, password: null }));

    if (!form.password) {
      setError((prev) => ({ ...prev, password: "Password cannot be empty" }));
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError((prev) => ({ ...prev, password: "Passwords do not match" }));
      return;
    }

    try {
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({ password: form.password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError((prev) => ({ ...prev, password: data.message }));
        return;
      }

      setForm((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));

      setSuccess((prev) => ({ ...prev, password: "Password updated" }));
    } catch {
      setError((prev) => ({ ...prev, password: "Network error" }));
    } finally {
      setLoading((prev) => ({ ...prev, password: false }));
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexGrow: 1,
        gap: 4,
      }}
    >
      <Form
        width={400}
        name="Update username"
        onSubmit={handleSubmitUsername}
        mb={0}
      >
        <FormField
          label="New username"
          name="username"
          value={form.username}
          onChange={handleChange}
          required={true}
        />
        <FormButton name="Update" disabled={loading.username} />
        {error.username && (
          <AlertMessage type="error">{error.username}</AlertMessage>
        )}
        {success.username && (
          <AlertMessage type="success">{success.username}</AlertMessage>
        )}
      </Form>
      <Form
        width={400}
        name="Update password"
        onSubmit={handleSubmitPassword}
        mt={0}
      >
        <PasswordField
          label="New password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required={true}
        />
        <PasswordField
          label="Confirm new password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required={true}
        />
        <FormButton name="Update" disabled={loading.password} />
        {error.password && (
          <AlertMessage type="error">{error.password}</AlertMessage>
        )}
        {success.password && (
          <AlertMessage type="success">{success.password}</AlertMessage>
        )}
      </Form>
    </Box>
  );
}
