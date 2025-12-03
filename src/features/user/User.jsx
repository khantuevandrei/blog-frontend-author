import Form from "../../components/Form";
import FormField from "../../components/FormField";
import PasswordField from "../../components/PasswordField";
import FormButton from "../../components/FormButton";
import AlertMessage from "../../components/AlertMessage";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";

export default function User() {
  const { user, token, login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setLoading(true);

    if (!form.username && !form.password) {
      setLoading(false);
      setError("Username or password must be provided to update");
      return;
    }

    try {
      console.log(user.id);
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setForm({
        username: "",
        password: "",
        confirmPassword: "",
      });
      setSuccess("Updated successfully");

      // Relog updated user
      login(token, data);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form width={400} name="Update credentials" onSubmit={handleSubmit}>
      <FormField
        label="New username"
        name="username"
        value={form.username}
        onChange={handleChange}
        required={false}
      />
      <PasswordField
        label="New password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required={false}
      />
      <PasswordField
        label="Confirm new password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        required={false}
      />
      <FormButton name="Update" disabled={loading} />
      {error && <AlertMessage type="error">{error}</AlertMessage>}
      {success && <AlertMessage type="success">{success}</AlertMessage>}
    </Form>
  );
}
