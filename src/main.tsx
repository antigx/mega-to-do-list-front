import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="1010103517588-jb076cjaa49qd0fns927uvn1ijbumk81.apps.googleusercontent.com">
    <StrictMode>
      <BrowserRouter basename="/mega-to-do-list-front/">
        <App />
      </BrowserRouter>
    </StrictMode>
  </GoogleOAuthProvider>
);
