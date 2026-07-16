import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Dashboard from "../pages/Dashboard";
import UploadPage from "../pages/UploadPage";
import ExtractionPage from "../pages/ExtractionPage";
import SummaryPage from "../pages/SummaryPage";
import ChatPage from "../pages/ChatPage";

function AppRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/extract" element={<ExtractionPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
