import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Copy, Check, ArrowRight, UploadCloud, FileSearch, Loader2 } from "lucide-react";

import { DocumentContext } from "../context/DocumentContext";
import { generateOrGetSummary } from "../services/api";
import WorkflowSteps from "../components/WorkflowSteps";

function SummaryPage() {
  const { document, registerSummary } = useContext(DocumentContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    if (!document || document.processingStatus !== "completed") return;
    if (document.summary || hasRequestedRef.current) return;

    hasRequestedRef.current = true;
    setLoading(true);

    generateOrGetSummary(document.documentId)
      .then((data) => {
        registerSummary(data);
      })
      .catch((error) => {
        toast.error(error.message || "Summary generation failed");
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document?.documentId, document?.processingStatus]);

  const copySummary = () => {
    if (!document?.summary) return;
    navigator.clipboard.writeText(document.summary);
    setCopied(true);
    toast.success("Summary copied");
    setTimeout(() => setCopied(false), 2000);
  };

  // --------------------------------------------------
  // Empty states
  // --------------------------------------------------
  if (!document) {
    return (
      <div className="space-y-6">
        <WorkflowSteps />
        <div className="flex items-center justify-center min-h-[50vh] px-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 text-center">
            <UploadCloud size={32} className="text-slate-600 mx-auto mb-3" />
            <h1 className="text-white text-xl font-semibold">No Summary Available</h1>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Upload and process a document first.
            </p>
            <button
              onClick={() => navigate("/upload")}
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 transition px-5 py-2.5 rounded-lg text-white font-medium"
            >
              Go to Upload
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (document.processingStatus !== "completed") {
    return (
      <div className="space-y-6">
        <WorkflowSteps />
        <div className="flex items-center justify-center min-h-[50vh] px-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 text-center">
            <FileSearch size={32} className="text-slate-600 mx-auto mb-3" />
            <h1 className="text-white text-xl font-semibold">Extraction Needed</h1>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              This document hasn't been extracted yet, so there's no text to summarize.
            </p>
            <button
              onClick={() => navigate("/extract")}
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 transition px-5 py-2.5 rounded-lg text-white font-medium"
            >
              Extract Information
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          AI Summary
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Generated using OCR + LLM Pipeline
        </p>
      </div>

      <WorkflowSteps />

      {/* Hero Card */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-slate-400 text-sm">Document Type</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-2 break-words">
              {document.documentType}
            </h2>
          </div>
          <div className="self-start md:self-auto px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
            {loading ? "Generating..." : "Summary Ready"}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 p-4 sm:p-5">
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            AI Generated Insights
          </h2>
          <button
            onClick={copySummary}
            disabled={loading || !document.summary}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all px-5 py-2.5 rounded-lg text-white font-medium disabled:opacity-50"
          >
            {copied ? (
              <>
                <Check size={16} /> Copied
              </>
            ) : (
              <>
                <Copy size={16} /> Copy Summary
              </>
            )}
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {loading ? (
            <div className="flex items-center gap-3 text-slate-400">
              <Loader2 size={18} className="animate-spin" />
              Generating summary...
            </div>
          ) : (
            <p className="text-slate-300 text-sm sm:text-base leading-7 sm:leading-8 whitespace-pre-wrap break-words">
              {document.summary}
            </p>
          )}
        </div>
      </div>

      {document.summary && (
        <button
          onClick={() => navigate("/chat")}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl text-white font-medium"
        >
          Chat With This Document
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}

export default SummaryPage;
