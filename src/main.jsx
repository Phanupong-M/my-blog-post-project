import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authentication.jsx";
import { PostProvider } from "./contexts/PostContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PostProvider>
        <AuthProvider>
          <App />
          <Toaster />
        </AuthProvider>
      </PostProvider>
    </BrowserRouter>
  </StrictMode>
);
