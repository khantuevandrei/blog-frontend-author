import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { Box, Typography, Button } from "@mui/material";
import PostsList from "../../components/PostsList";
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
          my: 4,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Your Posts:
      </Typography>
      <PostsList posts={posts} />
      <Box width="100%" display="flex" justifyContent="center" mt={2} mb={6}>
        <Button
          component={Link}
          to="/new"
          variant="contained"
          sx={{
            bgcolor: "#1e1e1e",
            color: "white",
            "&:hover": { bgcolor: "#4d4d4d" },
          }}
        >
          New post
        </Button>
      </Box>
      {error && <AlertMessage type="error">{error}</AlertMessage>}
    </Box>
  );
}
