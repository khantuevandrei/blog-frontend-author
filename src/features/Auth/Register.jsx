import { validateUsername, validatePassword } from "../../utils/validations";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Form from "../../components/Forms/Form";
import FormField from "../../components/Forms/FormField";
import UsernameChecklist from "../../components/Auth/UsernameChecklist";
import PasswordField from "../../components/Forms/PasswordField";
import PasswordChecklist from "../../components/Auth/PasswordChecklist";
import FormButton from "../../components/Forms/FormButton";
import AlertMessage from "../../components/General/AlertMessage";
import AuthInfo from "../../components/Auth/AuthInfo";

export default function Register() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (
      Object.values(usernameValidations).some((v) => !v) ||
      Object.values(passwordValidations).some((v) => !v)
    ) {
      setLoading(false);
      setError("Please fix validation errors");
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

      navigate("/login");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form width={400} name="Register" onSubmit={handleSubmit}>
      <FormField
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
      />
      <UsernameChecklist
        username={form.username}
        validations={usernameValidations}
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
      <PasswordChecklist
        pass={form.password}
        confirmPass={form.confirmPassword}
        validations={passwordValidations}
      />

      <AlertMessage error={error}>{error}</AlertMessage>
      <FormButton name="Register" disabled={loading} />

      <AuthInfo desc="Already have an account?" link="Login" nav="/login" />
    </Form>
  );
}
