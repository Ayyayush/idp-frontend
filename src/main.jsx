import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { DocumentProvider } from "./context/DocumentContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <DocumentProvider>
        <Toaster position="top-right" />
        <App />
      </DocumentProvider>
    </AuthProvider>
  </BrowserRouter>
);
