import { Box, TextField, Typography, Paper } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router";
import FormButton from "../../components/FormButton";
import AlertMessage from "../../components/AlertMessage";

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
      <ArrowBack
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          color: "black",
          fontSize: 40,
          cursor: "pointer",
          transition: "color 0.2s",
          "&:hover": { color: "gray" },
        }}
      />
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" mb={2}>
          Create New Post
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Body"
            name="body"
            value={form.body}
            onChange={handleChange}
            fullWidth
            multiline
            rows={6}
            required
          />

          <FormButton name="Create" disabled={loading} />
        </Box>

        {error && <AlertMessage type="error">{error}</AlertMessage>}
      </Paper>
    </Box>
  );
}
