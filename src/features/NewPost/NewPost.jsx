import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router";
import AlertMessage from "../../components/General/AlertMessage";
import Form from "../../components/Forms/Form";
import BackButton from "../../components/General/BackButton";
import FormField from "../../components/Forms/FormField";
import BodyField from "../../components/Forms/BodyField";
import FormButton from "../../components/Forms/FormButton";

export default function NewPost() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", body: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!form.title.trim() || !form.body.trim()) {
      setError("Both title and body are required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://blog-backend-production-16f8.up.railway.app/api/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Post creation failed");
        return;
      }

      navigate(`/${data.id}`);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form width={600} name="Create New Post" onSubmit={handleSubmit}>
      <BackButton nav="/" />
      <FormField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <BodyField value={form.body} onChange={handleChange} />
      <AlertMessage error={error}>{error}</AlertMessage>
      <FormButton name="Create" disabled={loading} />
    </Form>
  );
}
