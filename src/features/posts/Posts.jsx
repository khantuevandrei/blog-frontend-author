import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import PostsList from "../../components/PostsList";
import { Box, Typography } from "@mui/material";
import LoadingOverlay from "../../components/LoadingOverlay";
import AlertMessage from "../../components/AlertMessage";

export default function Posts() {
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

  return loading ? (
    <LoadingOverlay />
  ) : (
    <Box>
      <Typography
        variant="h5"
        sx={{
          width: "100%",
          maxWidth: 600,
          mx: "auto",
          my: 6,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Your Posts:
      </Typography>
      <PostsList posts={posts} />
      {error && <AlertMessage type="error">{error}</AlertMessage>}
    </Box>
  );
}
