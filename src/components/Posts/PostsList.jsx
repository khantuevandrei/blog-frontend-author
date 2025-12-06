import { List, ListItem, Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import PostCard from "./PostCard";

export default function PostsList({ posts }) {
  const theme = useTheme();

  if (!posts?.length) {
    return (
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          display: "block",
          textDecoration: "none",
          mb: 2,
          p: 2,
          borderRadius: 2,
          bgcolor: theme.palette.background.paper,
          boxShadow: 1,
        }}
      >
        <Typography>No posts found</Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: "100%", maxWidth: 600 }}>
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </List>
  );
}
