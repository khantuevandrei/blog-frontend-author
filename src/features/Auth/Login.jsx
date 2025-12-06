import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Form from "../../components/Forms/Form";
import FormField from "../../components/Forms/FormField";
import PasswordField from "../../components/Forms/PasswordField";
import FormButton from "../../components/Forms/FormButton";
import AlertMessage from "../../components/General/AlertMessage";
import AuthInfo from "../../components/Auth/AuthInfo";

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
      <AlertMessage error={error}>{error}</AlertMessage>
      <FormButton name="Login" disabled={loading} />
      <AuthInfo desc="Dont'have an account?" link="Register" nav="/register" />
    </Form>
  );
}
