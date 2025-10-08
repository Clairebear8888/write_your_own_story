import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthWrapper } from "./Context/Authcontext.jsx";
createRoot(document.getElementById("root")).render(
  <Router>
    <StrictMode>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </StrictMode>
  </Router>
);
