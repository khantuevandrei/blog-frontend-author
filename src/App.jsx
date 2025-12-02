import "./App.css";
import { Outlet } from "react-router";
import { Suspense } from "react";
import { Box } from "@mui/material";
import LoadingOverlay from "./components/LoadingOverlay";
import Header from "./features/header/Header";
import Footer from "./features/footer/Footer";

function App() {
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
          backgroundImage: `url('../../../public/bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
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
