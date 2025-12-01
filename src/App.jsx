import "./App.css";
import { Outlet } from "react-router";
import { Box } from "@mui/material";
import Header from "./features/header/Header";
import Footer from "./features/Footer/Footer";

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
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
