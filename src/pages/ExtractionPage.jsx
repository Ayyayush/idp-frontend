import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, RotateCcw, UploadCloud } from "lucide-react";

import { DocumentContext } from "../context/DocumentContext";
import { extractDocument } from "../services/api";
import WorkflowSteps from "../components/WorkflowSteps";
import ProcessingStatus from "../components/ProcessingStatus";
import StructuredDataCards from "../components/StructuredDataCards";
import JsonViewer from "../components/JsonViewer";

// Rough timings so the pipeline visualization advances even though the
// backend performs OCR -> classification -> extraction -> summary as a
// single blocking call. This keeps the user informed instead of staring at
// a static spinner for however long OCR takes.
const STEP_LABELS = [
  "Uploading...",
  "Running OCR...",
  "Classifying document...",
  "Extracting information...",
  "Generating summary...",
];

function ExtractionPage() {
  const { document, registerExtraction } = useContext(DocumentContext);
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [pipelineStatus, setPipelineStatus] = useState("idle"); // idle | processing | completed | failed
  const [activeTab, setActiveTab] = useState("structured");
  const [errorMessage, setErrorMessage] = useState(null);

  const hasStartedRef = useRef(false);
  const stepTimerRef = useRef(null);

  const runExtraction = async (documentId) => {
    setIsProcessing(true);
    setPipelineStatus("processing");
    setErrorMessage(null);
    setCurrentStepIndex(1);

    // Advance the visual pipeline every ~1.4s while we wait for the single
    // blocking backend call to resolve, capping at the second-to-last step.
    stepTimerRef.current = setInterval(() => {
      setCurrentStepIndex((prev) => Math.min(prev + 1, STEP_LABELS.length - 1));
    }, 1400);

    try {
      const data = await extractDocument(documentId);
      registerExtraction(data);
      setCurrentStepIndex(STEP_LABELS.length - 1);
      setPipelineStatus("completed");
      toast.success("Extraction completed");
    } catch (error) {
      setPipelineStatus("failed");
      setErrorMessage(error.message || "Extraction failed");
      toast.error(error.message || "Extraction failed");
    } finally {
      clearInterval(stepTimerRef.current);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (!document) return;

    // Auto-run extraction exactly once for a freshly-uploaded document.
    if (document.processingStatus !== "completed" && !hasStartedRef.current) {
      hasStartedRef.current = true;
      runExtraction(document.documentId);
    }

    return () => clearInterval(stepTimerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document?.documentId]);

  const handleRetry = () => {
    hasStartedRef.current = true;
    runExtraction(document.documentId);
  };

  // --------------------------------------------------
  // Empty state — no document uploaded yet
  // --------------------------------------------------
  if (!document) {
    return (
      <div className="space-y-6">
        <WorkflowSteps />
        <div className="flex items-center justify-center min-h-[50vh] px-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 w-full max-w-md text-center">
            <UploadCloud size={32} className="text-slate-600 mx-auto mb-3" />
            <h1 className="text-white text-lg sm:text-xl font-semibold">
              Upload a document to begin.
            </h1>
            <p className="text-slate-400 mt-2 text-sm">
              Extraction results will appear here once you upload a file.
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

  const tabs = [
    { id: "structured", label: "Structured Data" },
    { id: "json", label: "Raw JSON" },
    { id: "ocr", label: "OCR Text" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          Extraction Results
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base break-all">
          {document.originalFilename}
        </p>
      </div>

      <WorkflowSteps />

      {/* Processing pipeline (shown while running, or after a failure) */}
      {(pipelineStatus === "processing" || pipelineStatus === "failed") && (
        <>
          {pipelineStatus === "processing" && (
            <p className="text-blue-400 text-sm sm:text-base font-medium">
              {STEP_LABELS[currentStepIndex]}
            </p>
          )}
          <ProcessingStatus status={pipelineStatus} currentStepIndex={currentStepIndex} />
        </>
      )}

      {pipelineStatus === "failed" && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-red-300 text-sm sm:text-base">
            {errorMessage || "Processing failed. Please try again."}
          </p>
          <button
            onClick={handleRetry}
            disabled={isProcessing}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg text-white text-sm font-medium disabled:opacity-50 flex-shrink-0"
          >
            <RotateCcw size={16} />
            Retry Extraction
          </button>
        </div>
      )}

      {/* Results */}
      {pipelineStatus === "completed" && document.processingStatus === "completed" && (
        <>
          {/* Document Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-slate-400 text-sm">Document Type</p>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-2 break-words">
                  {document.documentType}
                </h2>
              </div>
              <div className="self-start md:self-auto px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                Extraction Completed
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="flex overflow-x-auto border-b border-slate-800">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-5 sm:px-6 py-4 text-sm sm:text-base transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6">
              {activeTab === "structured" && (
                <StructuredDataCards data={document.structuredData} />
              )}

              {activeTab === "json" && (
                <JsonViewer data={document.structuredData} />
              )}

              {activeTab === "ocr" && (
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">
                    OCR Extracted Text
                  </h2>
                  <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 sm:p-5 max-h-[65vh] overflow-auto">
                    <pre className="whitespace-pre-wrap break-words text-slate-300 text-xs sm:text-sm leading-7">
                      {document.ocrText || "No text extracted."}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => navigate("/summary")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl text-white font-medium"
          >
            View Summary
            <ArrowRight size={18} />
          </button>
        </>
      )}
    </div>
  );
}

export default ExtractionPage;
