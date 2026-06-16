import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import { DocumentProvider } from "./context/DocumentContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DocumentProvider>

      <Toaster position="top-right" />

      <App />

    </DocumentProvider>
  </BrowserRouter>
);