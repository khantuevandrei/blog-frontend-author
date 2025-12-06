import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, Typography, Box, useTheme } from "@mui/material";
import { AuthContext } from "../../context/AuthProvider";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import GenericButton from "../../components/General/GenericButton";
import BackButton from "../../components/General/BackButton";
import AlertMessage from "../../components/General/AlertMessage";
import MetaLine from "../../components/Posts/MetaLine";
import Comment from "../../components/Posts/Comment";
import ErrorPage from "../ErrorPage/ErrorPage";

export default function Post() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { postId } = useParams();
  const { token } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [post, setPost] = useState();
  const [loading, setLoading] = useState({
    overlay: true,
    edit: false,
    publish: false,
    delete: false,
    next: false,
    nextAll: false,
  });

  // Comments state for pagination
  const [comments, setComments] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMoreComments, setHasMoreComments] = useState(true);

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
          setError(data.message);
          return;
        }

        setPost(data);
        setComments(data.comments);

        if (data.total_comments < 5) {
          setHasMoreComments(false);
        }

        if (data.total_comments > 5) {
          setHasMoreComments(true);
          setOffset(5);
        }
      } catch {
        setError("Network error");
      } finally {
        setLoading((prev) => ({ ...prev, overlay: false }));
      }
    }

    fetchPost();
  }, [postId, token]);

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
        setError(data.message) || "Publishing failed";
        return;
      }

      setPost(data);
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

  // Fetch comments
  async function loadNextComments(limit) {
    // Which button was pressed
    limit > 5
      ? setLoading((prev) => ({ ...prev, nextAll: true }))
      : setLoading((prev) => ({ ...prev, next: true }));
    try {
      if (!hasMoreComments) return;

      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/posts/${postId}/comments?limit=${limit}&offset=${offset}`
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to get comments");
        return;
      }

      setComments((prev) => {
        const newComments = [...prev, ...data.comments];

        // Still has comments
        if (post.total_comments > newComments.length) {
          setHasMoreComments(true);
          setOffset(newComments.length);
        }

        // No comments left
        if (post.total_comments === newComments.length) {
          setHasMoreComments(false);
        }

        return newComments;
      });
    } catch {
      setError("Network error");
    } finally {
      setLoading((prev) => ({ ...prev, next: false }));
      setLoading((prev) => ({ ...prev, nextAll: false }));
    }
  }

  if (loading.overlay) return <LoadingOverlay />;

  if (error) return <ErrorPage message={error} />;

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Post */}
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 600,
          mt: 10,
          position: "relative",
          [theme.breakpoints.up("sm")]: {
            mt: 6,
          },
        }}
      >
        <BackButton nav={"/"} />
        <Typography variant="h5" fontWeight={600} mb={2}>
          {post.title}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{ color: theme.palette.text.secondary, mb: 1 }}
        >
          by <strong>@{post.author.username}</strong>
        </Typography>

        <MetaLine label="Created" value={post.created_at} />

        {post.updated_at !== post.created_at && (
          <MetaLine label="Updated" value={post.updated_at} />
        )}

        <MetaLine
          label={post.published ? "Published" : "Not published"}
          value={post.published_at}
        />

        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-line", mt: 4, mb: 2 }}
        >
          {post.body}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          <GenericButton
            name="Edit"
            onClick={() => navigate(`/${postId}/edit`)}
          />
          <GenericButton
            name={post.published ? "Unpublish" : "Publish"}
            disabled={loading.publish}
            onClick={handlePublish}
          />
          <GenericButton
            name="Delete"
            disabled={loading.delete}
            onClick={handleDelete}
          />
        </Box>

        <AlertMessage error={error}>{error}</AlertMessage>
      </Paper>

      {/* Comments */}
      {comments.length > 0 && (
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 3,
            my: 6,
            width: "100%",
            maxWidth: 600,
          }}
        >
          <Typography variant="h5" fontWeight={600} mb={2}>
            Comments:
          </Typography>

          {comments.map((comment, index) => (
            <Comment
              key={comment.id}
              comment={comment}
              isLast={index === comments.length - 1}
            />
          ))}

          {/* Next comments buttons */}
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            {hasMoreComments && (
              <GenericButton
                name="Next 5"
                disabled={loading.next}
                onClick={() => loadNextComments(5)}
              />
            )}

            {hasMoreComments && (
              <GenericButton
                name="Load all"
                disabled={loading.nextAll}
                onClick={() => loadNextComments(post.total_comments)}
              />
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
}
