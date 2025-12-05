import { Outlet } from "react-router";
import { Suspense } from "react";
import { Box, useTheme } from "@mui/material";
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
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          background: theme.palette.background.image,
        }}
      >
        <Suspense fallback={<LoadingOverlay />}>
          <Outlet />
        </Suspense>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
