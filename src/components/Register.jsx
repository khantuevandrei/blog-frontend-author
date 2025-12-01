import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:"\\|,.<>\/?]).{8,}$/;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate password
    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must be at least 8 characters long and include lowercase, uppercase, number and symbol"
      );
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
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

      setSuccess("Account created. Redirecting to Login...");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError("Network error");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </>
  );
}
