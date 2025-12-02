import { List, ListItem, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function PostsList({ posts }) {
  if (!posts?.length) {
    return (
      <Box
        sx={{
          width: "fit-content",
          maxWidth: 600,
          mx: "auto",
          display: "block",
          textDecoration: "none",
          mb: 2,
          p: 2,
          borderRadius: 2,
          bgcolor: "background.paper",
          boxShadow: 1,
        }}
      >
        <Typography>No posts found</Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: "100%", maxWidth: 600, mx: "auto" }}>
      {posts.map((post) => (
        <ListItem
          key={post.id}
          sx={{
            display: "block",
            mb: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: "background.paper",
            boxShadow: 1,
            "&:hover": { boxShadow: 4, bgcolor: "grey.100" },
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            to={`${post.id}`}
            sx={{ textDecoration: "none", color: "#0068bdff", fontWeight: 500 }}
          >
            {post.title}
          </Typography>

          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mb: 1,
            }}
          >
            {post.body}
          </Typography>

          <Typography variant="caption" color="text.secondary" display="block">
            Created: {new Date(post.created_at).toLocaleDateString()}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            {post.published
              ? `Published: ${new Date(post.published_at).toLocaleDateString()}`
              : "Not published"}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            {post.published ? `Comments: ${post.total_comments}` : ""}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}
