import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GenericButton from "../../components/GenericButton";

export default function ErrorPage({ code = 404, message = "Page not found" }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{ fontSize: 100, fontWeight: "bold" }}
      >
        {code}
      </Typography>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {message}
      </Typography>
      <GenericButton name="Home" onClick={() => navigate("/")} />
    </Box>
  );
}
