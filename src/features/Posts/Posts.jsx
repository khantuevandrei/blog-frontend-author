import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { Box, Typography, useTheme } from "@mui/material";
import PostsList from "../../components/PostsList";
import LoadingOverlay from "../../components/LoadingOverlay";
import AlertMessage from "../../components/AlertMessage";
import GenericButton from "../../components/GenericButton";

export default function Posts() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts(user) {
      try {
        const response = await fetch(
          `https://blog-backend-production-16f8.up.railway.app/api/users/${user.id}/posts`,
          {
            method: "GET",
            headers: { Authorization: `bearer ${token}` },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Error fetching posts");
          return;
        }
        setPosts(data);
      } catch {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts(user);
  }, [user, token]);

  if (loading) return <LoadingOverlay />;

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        my: 6,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          width: "100%",
          maxWidth: 600,
          mx: "auto",
          my: 4,
          fontWeight: 700,
          textAlign: "center",
          color: theme.palette.text.primary,
        }}
      >
        Your Posts:
      </Typography>
      <PostsList posts={posts} />
      <Box display="flex" justifyContent="center">
        <GenericButton name="New post" onClick={() => navigate("/new")} />
      </Box>
      {error && <AlertMessage type="error">{error}</AlertMessage>}
    </Box>
  );
}
