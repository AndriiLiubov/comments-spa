import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/app.css";
import "./styles/form.css";
import "./styles/comments.css";
import "./styles/captcha.css";

import App from "./App.jsx";

import "react-photo-view/dist/react-photo-view.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
