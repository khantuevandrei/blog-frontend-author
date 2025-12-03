import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import LoadingOverlay from "../../components/LoadingOverlay";
import GenericButton from "../../components/GenericButton";
import AlertMessage from "../../components/AlertMessage";
import { Paper, Typography, Box } from "@mui/material";

export default function Post() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { token } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [post, setPost] = useState();
  const [loading, setLoading] = useState({
    overlay: true,
    edit: false,
    publish: false,
    delete: false,
  });

  // Fetch post
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
          setLoading((prev) => ({ ...prev, overlay: false }));
          setError(data.message);
          return;
        }
        setPost(data);
      } catch {
        setError("Network error");
      } finally {
        setLoading((prev) => ({ ...prev, overlay: false }));
      }
    }
    fetchPost();
  }, [postId, token]);

  // Edit post
  function handleEdit() {
    navigate(`/${postId}/edit`);
  }

  // Publish post
  async function handlePublish() {
    setError(null);
    setLoading((prev) => ({ ...prev, publish: true }));

    try {
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/posts/${postId}/publish`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setLoading((prev) => ({ ...prev, publish: false }));
        setError(data.message) || "Publishing failed";
        return;
      }
      window.location.reload();
    } catch {
      setError("Network error");
    } finally {
      setLoading((prev) => ({ ...prev, publish: false }));
    }
  }

  // Delete post
  async function handleDelete() {
    setError(null);
    setLoading((prev) => ({ ...prev, delete: true }));

    try {
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setLoading((prev) => ({ ...prev, delete: false }));
        setError(data.message) || "Deletion failed";
        return;
      }
      navigate("/");
    } catch {
      setError("Network Error");
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  }

  return loading.overlay ? (
    <LoadingOverlay />
  ) : (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 3,
          margin: 10,
          width: 600,
        }}
      >
        <Typography variant="h4" fontWeight={600} mb={2}>
          {post.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "gray", mb: 1 }}>
          By <strong>@{post.author.username}</strong>
        </Typography>
        <Typography variant="body2" sx={{ color: "gray" }}>
          Created:{" "}
          {new Date(post.created_at).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
        {post.updated_at !== post.created_at ? (
          <Typography variant="body2" sx={{ color: "gray" }}>
            Updated:{" "}
            {new Date(post.updated_at).toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        ) : (
          ""
        )}
        {post.published ? (
          <Typography variant="body2" sx={{ color: "gray" }}>
            Published:{" "}
            {new Date(post.published_at).toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ color: "gray" }}>
            Not published
          </Typography>
        )}
        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-line", mt: 4, mb: 4 }}
        >
          {post.body}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <GenericButton name="Edit" onClick={handleEdit} />
          {post.published ? (
            ""
          ) : (
            <GenericButton
              name="Publish"
              disabled={loading.publish}
              onClick={handlePublish}
            />
          )}
          <GenericButton
            name="Delete"
            disabled={loading.delete}
            onClick={handleDelete}
          />
        </Box>
        {error && <AlertMessage type="error">{error}</AlertMessage>}
      </Paper>
    </Box>
  );
}
