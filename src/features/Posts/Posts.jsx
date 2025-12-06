import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { Box } from "@mui/material";
import LoadingOverlay from "../../components/LoadingOverlay";
import PostsHeader from "../../components/PostsHeader";
import PostsList from "../../components/PostsList";
import GenericButton from "../../components/GenericButton";
import AlertMessage from "../../components/AlertMessage";

export default function Posts() {
  const navigate = useNavigate();
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
      <PostsHeader />
      <PostsList posts={posts} />
      <GenericButton name="New post" onClick={() => navigate("/new")} />
      <AlertMessage error={error}>{error}</AlertMessage>
    </Box>
  );
}
