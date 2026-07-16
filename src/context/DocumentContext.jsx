/**
 * context/DocumentContext.jsx
 *
 * Owns the entire "current document" workflow state so pages never talk to
 * localStorage or juggle document_id themselves:
 *
 *   registerUpload()     -> stores document_id + original filename
 *   registerExtraction() -> fills document_type/ocr_text/structured_data/summary
 *   registerSummary()    -> fills summary (generate-or-get / read-only calls)
 *
 * The backend has no "list documents" endpoint, so the recent-documents list
 * is maintained here and persisted to localStorage as documents are
 * uploaded/processed in this browser.
 */

import { createContext, useCallback, useEffect, useMemo, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const DocumentContext = createContext(null);

const CURRENT_DOCUMENT_KEY = "idp_current_document";
const RECENT_DOCUMENTS_KEY = "idp_recent_documents";
const MAX_RECENT_DOCUMENTS = 10;

function readFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Workflow stages, in order. Used to drive "next action" UI (enabling /
 * disabling buttons, empty states, etc.) across the app.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const STAGES = {
  IDLE: "idle",
  UPLOADED: "uploaded",
  EXTRACTED: "extracted",
  CHAT_READY: "chat_ready",
};

function deriveStage(document) {
  if (!document) return STAGES.IDLE;
  if (document.processingStatus === "completed" && document.summary) {
    return STAGES.CHAT_READY;
  }
  if (document.processingStatus === "completed") {
    return STAGES.EXTRACTED;
  }
  return STAGES.UPLOADED;
}

export const DocumentProvider = ({ children }) => {
  const [document, setDocument] = useState(() =>
    readFromStorage(CURRENT_DOCUMENT_KEY, null)
  );

  const [recentDocuments, setRecentDocuments] = useState(() =>
    readFromStorage(RECENT_DOCUMENTS_KEY, [])
  );

  useEffect(() => {
    if (document) {
      localStorage.setItem(CURRENT_DOCUMENT_KEY, JSON.stringify(document));
    } else {
      localStorage.removeItem(CURRENT_DOCUMENT_KEY);
    }
  }, [document]);

  useEffect(() => {
    localStorage.setItem(
      RECENT_DOCUMENTS_KEY,
      JSON.stringify(recentDocuments)
    );
  }, [recentDocuments]);

  const upsertRecent = useCallback((entry) => {
    setRecentDocuments((prev) => {
      const withoutExisting = prev.filter(
        (item) => item.documentId !== entry.documentId
      );
      return [entry, ...withoutExisting].slice(0, MAX_RECENT_DOCUMENTS);
    });
  }, []);

  /** Called right after a successful POST /api/upload. */
  const registerUpload = useCallback(
    ({ documentId, originalFilename, storedFilename, message }) => {
      const next = {
        documentId,
        originalFilename,
        storedFilename,
        documentType: null,
        ocrText: null,
        structuredData: null,
        summary: null,
        processingStatus: "processing",
        uploadMessage: message,
        uploadedAt: new Date().toISOString(),
      };
      setDocument(next);
      upsertRecent({
        documentId,
        filename: originalFilename,
        documentType: null,
        processingStatus: "processing",
        uploadedAt: next.uploadedAt,
      });
      return next;
    },
    [upsertRecent]
  );

  /** Called right after a successful POST /api/extract/{document_id}. */
  const registerExtraction = useCallback(
    (data) => {
      setDocument((prev) => ({
        ...(prev || {}),
        documentId: data.document_id,
        // The extraction response's `filename` is the ORIGINAL filename
        // (see backend schemas.ExtractionResponse) — trust it over what was
        // cached at upload time.
        originalFilename: data.filename || prev?.originalFilename,
        documentType: data.document_type,
        ocrText: data.ocr_text,
        structuredData: data.structured_data,
        summary: data.summary,
        processingStatus: data.processing_status,
      }));

      upsertRecent({
        documentId: data.document_id,
        filename: data.filename,
        documentType: data.document_type,
        processingStatus: data.processing_status,
        uploadedAt: new Date().toISOString(),
      });
    },
    [upsertRecent]
  );

  /** Called after generate-or-get / read-only summary calls. */
  const registerSummary = useCallback((data) => {
    setDocument((prev) => (prev ? { ...prev, summary: data.summary } : prev));
  }, []);

  /** Clears the active document so the user can start a fresh upload. */
  const resetDocument = useCallback(() => {
    setDocument(null);
  }, []);

  const stage = useMemo(() => deriveStage(document), [document]);

  const value = useMemo(
    () => ({
      document,
      recentDocuments,
      stage,
      registerUpload,
      registerExtraction,
      registerSummary,
      resetDocument,
    }),
    [
      document,
      recentDocuments,
      stage,
      registerUpload,
      registerExtraction,
      registerSummary,
      resetDocument,
    ]
  );

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};
