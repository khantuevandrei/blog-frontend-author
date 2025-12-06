import Form from "../../components/Forms/Form";
import FormField from "../../components/Forms/FormField";
import PasswordField from "../../components/Forms/PasswordField";
import FormButton from "../../components/Forms/FormButton";
import BackButton from "../../components/General/BackButton";
import AlertMessage from "../../components/General/AlertMessage";
import ALertSuccess from "../../components/General/AlertSuccess";
import UsernameChecklist from "../../components/Auth/UsernameChecklist";
import PasswordChecklist from "../../components/Auth/PasswordChecklist";
import { validateUsername, validatePassword } from "../../utils/validations";

import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";
import { useTheme, Box } from "@mui/material";

export default function UpdateUser() {
  const theme = useTheme();
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

  const usernameValidations = validateUsername(form.username);
  const passwordValidations = validatePassword(
    form.password,
    form.confirmPassword
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
  }

  async function handleSubmitUsername(e) {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, username: true }));
    setError((prev) => ({ ...prev, username: null }));
    setSuccess((prev) => ({ ...prev, username: null }));

    if (Object.values(usernameValidations).some((v) => !v)) {
      setLoading(false);
      setError((prev) => ({
        ...prev,
        username: "Please fix username validation errors",
      }));
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

    if (Object.values(passwordValidations).some((v) => !v)) {
      setLoading(false);
      setError((prev) => ({
        ...prev,
        password: "Please fix password validation errors",
      }));
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
        flexGrow: 1,
        width: "100%",
        gap: 4,
        pt: 6,
        [theme.breakpoints.up("sm")]: {
          pt: 0,
        },
      }}
    >
      <Form
        width={400}
        name="Update username"
        onSubmit={handleSubmitUsername}
        mb={0}
      >
        <BackButton nav={"/"} />

        <FormField
          label="New username"
          name="username"
          value={form.username}
          onChange={handleChange}
          required={true}
        />

        <UsernameChecklist
          username={form.username}
          validations={usernameValidations}
        />

        <AlertMessage error={error.username}>{error.username}</AlertMessage>
        <ALertSuccess success={success.username}>
          {success.username}
        </ALertSuccess>
        <FormButton name="Update" disabled={loading.username} />
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

        <PasswordChecklist
          pass={form.password}
          confirmPass={form.confirmPassword}
          validations={passwordValidations}
        />
        <AlertMessage error={error.password}>{error.password}</AlertMessage>
        <ALertSuccess success={success.password}>
          {success.password}
        </ALertSuccess>
        <FormButton name="Update" disabled={loading.password} />
      </Form>
    </Box>
  );
}
