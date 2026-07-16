/**
 * services/api.js
 *
 * Single centralized API layer for all backend communication.
 *
 * Backend contract (FastAPI, source of truth):
 *   POST /api/upload                -> { success, document_id, filename, message }
 *   POST /api/extract/{document_id} -> { document_id, filename, document_type, ocr_text, structured_data, summary, processing_status }
 *   POST /api/summary/{document_id} -> { document_id, filename, summary }   (generate-or-get)
 *   GET  /api/summary/{document_id} -> { document_id, filename, summary }   (read-only)
 *   POST /api/chat                  -> { question, answer }                (question: string)
 *   GET  /health                    -> { status, service }
 *
 * Every error response from the backend (see handlers.py) has the shape:
 *   { success: false, message, error_code, details }
 *
 * This module normalizes every failure into a plain Error whose `.message` is
 * always a friendly, user-safe string, and whose `.code` is the backend's
 * error_code (when available) so callers/UI can branch on it if needed.
 */

import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // OCR/LLM pipeline calls can legitimately take a while
});

/**
 * Friendly fallback messages keyed by HTTP status, used only when the backend
 * didn't provide its own `message` field (e.g. network failure, timeout).
 */
function fallbackMessageFor(error) {
  if (error.code === "ECONNABORTED") {
    return "The server is taking too long to respond. Please try again.";
  }
  if (!error.response) {
    return "Network error. Please check your connection and that the server is running.";
  }
  switch (error.response.status) {
    case 400:
      return "The request could not be processed. Please check your input.";
    case 404:
      return "The requested document could not be found.";
    case 422:
      return "The request payload was invalid.";
    case 500:
      return "Server unavailable. Please try again in a moment.";
    default:
      return "Something went wrong. Please try again.";
  }
}

/**
 * Normalizes any axios error into a plain Error with a safe, friendly
 * message and (when present) the backend's machine-readable error_code.
 * Never leaks raw tracebacks or internal details to the UI.
 */
function normalizeError(error) {
  const backendPayload = error?.response?.data;

  const friendly = new Error(
    (backendPayload && backendPayload.message) || fallbackMessageFor(error)
  );

  friendly.code = backendPayload?.error_code || null;
  friendly.status = error?.response?.status || null;
  friendly.details = backendPayload?.details ?? null;

  return friendly;
}

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeError(error))
);

// --------------------------------------------------
// Upload
// --------------------------------------------------

/**
 * Uploads a single file. Returns { success, document_id, filename, message }.
 * `filename` in the response is the secure/stored filename — callers should
 * keep the original File's `.name` around separately for display purposes.
 */
export const uploadDocument = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/api/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });

  return response.data;
};

// --------------------------------------------------
// Extraction
// --------------------------------------------------

/**
 * Runs the full OCR -> classification -> extraction -> summary -> embedding
 * pipeline for a previously uploaded document. No file/document_id body is
 * sent — document_id is resolved entirely server-side via the URL param.
 */
export const extractDocument = async (documentId) => {
  const response = await api.post(`/api/extract/${documentId}`);
  return response.data;
};

// --------------------------------------------------
// Summary
// --------------------------------------------------

/** Generates a summary if one doesn't exist yet, or returns the existing one. */
export const generateOrGetSummary = async (documentId) => {
  const response = await api.post(`/api/summary/${documentId}`);
  return response.data;
};

/** Retrieves a document's already-stored summary without generating one. */
export const getSummary = async (documentId) => {
  const response = await api.get(`/api/summary/${documentId}`);
  return response.data;
};

// --------------------------------------------------
// Chat (RAG)
// --------------------------------------------------

/**
 * Asks a natural-language question, answered via retrieval-augmented
 * generation over everything indexed in the vector store so far.
 */
export const askQuestion = async (question) => {
  const response = await api.post("/api/chat", { question });
  return response.data;
};

// --------------------------------------------------
// Health
// --------------------------------------------------

export const checkHealth = async () => {
  const response = await api.get("/health");
  return response.data;
};

export default api;
