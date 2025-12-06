import { Outlet } from "react-router";
import { Suspense } from "react";
import { Container, Box, useTheme } from "@mui/material";
import LoadingOverlay from "./components/LoadingOverlay";
import Header from "./features/Header/Header";
import Footer from "./features/Footer/Footer";

function App() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: "100vw",
          background: theme.palette.background.image,
        }}
      >
        <Suspense fallback={<LoadingOverlay />}>
          <Container
            sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
          >
            <Outlet />
          </Container>
        </Suspense>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
