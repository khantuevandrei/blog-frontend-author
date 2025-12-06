import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useParams, useNavigate } from "react-router-dom";
import FormButton from "../../components/Forms/FormButton";
import BackButton from "../../components/General/BackButton";
import AlertMessage from "../../components/General/AlertMessage";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import Form from "../../components/Forms/Form";
import FormField from "../../components/Forms/FormField";
import BodyField from "../../components/Forms/BodyField";

export default function EditPost() {
  const { postId } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [form, setForm] = useState({ title: "", body: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState({ overlay: true, update: false });

  useEffect(() => {
    async function fetchPost() {
      setLoading((prev) => ({ ...prev, overlay: true }));

      try {
        const response = await fetch(
          `https://blog-backend-production-16f8.up.railway.app/api/posts/${postId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }

        setPost(data);
        setForm({ title: data.title, body: data.body });
      } catch {
        setError("Network error");
      } finally {
        setLoading((prev) => ({ ...prev, overlay: false }));
      }
    }

    fetchPost();
  }, [postId, token]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading((prev) => ({ ...prev, update: true }));

    if (!form.title.trim() || !form.body.trim()) {
      setError("Both title and body are required");
      return;
    }

    try {
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/posts/${postId}`,
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
        setError(data.message || "Post creation failed");
        return;
      }

      navigate(`/${post.id}`);
    } catch {
      setError("Network error");
    } finally {
      setLoading((prev) => ({ ...prev, update: false }));
    }
  }

  if (loading.overlay) return <LoadingOverlay />;

  return (
    <Form width={600} name="Update Post" onSubmit={handleSubmit}>
      <BackButton nav={`/${postId}`} />
      <FormField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <BodyField
        label="Body"
        name="body"
        value={form.body}
        onChange={handleChange}
      />
      <AlertMessage error={error}>{error}</AlertMessage>
      <FormButton name="Update" disabled={loading.update} />
    </Form>
  );
}
