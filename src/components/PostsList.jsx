import {
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function PostsList({ posts }) {
  if (!posts?.length) {
    return <p>No posts found</p>;
  }

  return (
    <List sx={{ width: "100%", maxWidth: 600, mx: "auto" }}>
      {posts.map((post) => (
        <Box
          key={post.id}
          component={Link}
          to={`/posts/${post.id}`}
          sx={{
            display: "block",
            textDecoration: "none",
            mb: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: "background.paper",
            boxShadow: 1,
            transition: "0.3s",
            "&:hover": {
              boxShadow: 4,
              bgcolor: "grey.100",
            },
          }}
        >
          <ListItemText
            primary={post.title}
            secondary={`Created: ${
              post.created_at
                ? new Date(post.created_at).toLocaleDateString()
                : "Unknown Date"
            } • ${
              post.published
                ? `Published: ${new Date(
                    post.published_at
                  ).toLocaleDateString()}`
                : "Unpublished"
            } • ${`Comments: ${post.total_comments}`}
              `}
            sx={{ color: "black" }}
          />
        </Box>
      ))}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 6 }}>
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
    </List>
  );
}
