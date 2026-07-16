import { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FileText, UploadCloud, CheckCircle2, ArrowRight, X } from "lucide-react";

import { DocumentContext } from "../context/DocumentContext";
import { uploadDocument } from "../services/api";
import WorkflowSteps from "../components/WorkflowSteps";

const ACCEPTED_TYPES = {
  "application/pdf": [".pdf"],
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
};

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedInfo, setUploadedInfo] = useState(null); // { originalFilename, documentId, message }

  const { registerUpload, document: activeDocument } = useContext(DocumentContext);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles?.length) {
      toast.error("Only PDF, PNG, and JPG/JPEG files up to 10 MB are supported.");
      return;
    }
    if (acceptedFiles?.length) {
      setFile(acceptedFiles[0]);
      setUploadedInfo(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const data = await uploadDocument(file, (progressEvent) => {
        if (progressEvent.total) {
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      });

      registerUpload({
        documentId: data.document_id,
        originalFilename: file.name,
        storedFilename: data.filename,
        message: data.message,
      });

      setUploadedInfo({
        originalFilename: file.name,
        documentId: data.document_id,
        message: data.message,
      });

      toast.success("Upload successful");
    } catch (error) {
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleStartOver = () => {
    setFile(null);
    setUploadedInfo(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          Upload a Document
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Start the AI document intelligence pipeline
        </p>
      </div>

      <WorkflowSteps />

      {/* Already have an active document warning */}
      {activeDocument && !uploadedInfo && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-300">
          You already have <strong>{activeDocument.originalFilename}</strong>{" "}
          in progress. Uploading a new file will replace it as the active document.
        </div>
      )}

      {!uploadedInfo && (
        <>
          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-2xl p-6 sm:p-8 lg:p-10 text-center transition-all cursor-pointer
              ${isDragActive ? "border-blue-500 bg-blue-500/5" : "border-slate-700 bg-slate-900 hover:border-blue-500"}
            `}
          >
            <input {...getInputProps()} />
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-2xl bg-slate-800 flex items-center justify-center">
                <UploadCloud size={26} className="text-blue-400" />
              </div>
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">
              {isDragActive ? "Drop your file here" : "Drag & Drop Document"}
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              or click to browse — PDF, PNG, JPG, JPEG (max 10 MB)
            </p>
          </div>

          {/* Selected File */}
          {file && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-medium break-all">{file.name}</h3>
                    <p className="text-slate-400 text-sm mt-1">{formatBytes(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={handleStartOver}
                  className="self-start sm:self-center p-2 rounded-lg hover:bg-slate-800 transition flex-shrink-0"
                  aria-label="Remove file"
                >
                  <X size={18} className="text-slate-400" />
                </button>
              </div>
            </div>
          )}

          {/* Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Uploading...</span>
                <span className="text-blue-400">{progress}%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Document"}
          </button>
        </>
      )}

      {/* Post-upload success panel */}
      {uploadedInfo && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={24} className="text-green-400" />
            </div>
            <div>
              <h2 className="text-white text-lg sm:text-xl font-semibold">
                Upload Successful
              </h2>
              <p className="text-slate-400 text-sm">
                Your document is ready for extraction.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 border border-slate-800 rounded-xl p-4">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wide">Filename</p>
              <p className="text-white mt-1 break-all text-sm sm:text-base">
                {uploadedInfo.originalFilename}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wide">Document ID</p>
              <p className="text-white mt-1 text-sm sm:text-base">
                #{uploadedInfo.documentId}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-slate-400 text-xs uppercase tracking-wide">Status</p>
              <span className="inline-flex items-center mt-1 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                Ready for Extraction
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/extract")}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl text-white font-medium"
            >
              Extract Information
              <ArrowRight size={18} />
            </button>
            <button
              onClick={handleStartOver}
              className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition font-medium"
            >
              Upload Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadPage;
