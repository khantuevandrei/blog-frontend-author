import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import AlertMessage from "../../components/AlertMessage";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router";

export default function NewPost() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", body: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
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

      setSuccess("Post created. Redirecting...");
      setTimeout(() => navigate("/"), 2000);
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
      }}
    >
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

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{
              mt: 3,
              bgcolor: "#1e1e1e",
              "&:hover": { bgcolor: "#4d4d4dff" },
            }}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Create"
            )}
          </Button>
        </Box>

        {error && <AlertMessage type="error">{error}</AlertMessage>}
        {success && <AlertMessage type="success">{success}</AlertMessage>}
      </Paper>
    </Box>
  );
}
