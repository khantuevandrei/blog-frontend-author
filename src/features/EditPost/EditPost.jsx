import { Box, TextField, Typography, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useParams, useNavigate } from "react-router-dom";
import FormButton from "../../components/FormButton";
import BackButton from "../../components/BackButton";
import AlertMessage from "../../components/AlertMessage";
import LoadingOverlay from "../../components/LoadingOverlay";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        minHeight: "100%",
        p: 2,
        position: "relative",
      }}
    >
      <BackButton onClick={() => navigate(`/${postId}`)} />
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" mb={2} sx={{ fontWeight: 500 }}>
          Update Post
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            margin="normal"
            value={form.title}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Body"
            name="body"
            margin="normal"
            value={form.body}
            onChange={handleChange}
            fullWidth
            multiline
            rows={6}
            required
          />

          <FormButton name="Update" disabled={loading.update} />
        </Box>

        {error && <AlertMessage type="error">{error}</AlertMessage>}
      </Paper>
    </Box>
  );
}
