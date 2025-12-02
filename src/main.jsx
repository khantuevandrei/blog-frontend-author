import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RootRoutes from "./routes/RootRoutes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <RootRoutes />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
