import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FileStack } from "lucide-react";
import { DocumentContext } from "../context/DocumentContext";

const STATUS_STYLES = {
  completed: "bg-green-500/10 border-green-500/20 text-green-400",
  processing: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  failed: "bg-red-500/10 border-red-500/20 text-red-400",
};

function StatusPill({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.processing;
  const label =
    status === "completed" ? "Processed" : status === "failed" ? "Failed" : "Processing";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium ${style}`}
    >
      {label}
    </span>
  );
}

/**
 * Shows documents uploaded/processed in this browser session. The backend
 * has no document-listing endpoint, so this list is tracked client-side in
 * DocumentContext (persisted to localStorage) as the user works.
 */
function RecentDocuments() {
  const { recentDocuments, document, resetDocument } = useContext(DocumentContext);
  const navigate = useNavigate();

  const handleRowClick = (doc) => {
    // Only the currently-active document has its full data available in
    // context (the backend doesn't expose a "get document by id" endpoint),
    // so only that row is actionable.
    if (document && doc.documentId === document.documentId) {
      navigate(doc.processingStatus === "completed" ? "/summary" : "/extract");
    }
  };

  if (recentDocuments.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow w-full overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-800">
          <h2 className="font-semibold text-lg sm:text-xl text-white">
            Recent Documents
          </h2>
        </div>
        <div className="p-8 sm:p-10 flex flex-col items-center text-center">
          <FileStack size={32} className="text-slate-600 mb-3" />
          <p className="text-slate-400 text-sm sm:text-base">
            No documents yet. Upload one to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow w-full overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3">
        <h2 className="font-semibold text-lg sm:text-xl text-white">
          Recent Documents
        </h2>
        {document && (
          <button
            onClick={resetDocument}
            className="text-xs sm:text-sm text-slate-400 hover:text-white transition"
          >
            Start New Upload
          </button>
        )}
      </div>

      {/* Desktop & Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead className="bg-slate-950">
            <tr className="text-left text-slate-400 text-sm">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentDocuments.map((doc) => {
              const isActive = document && doc.documentId === document.documentId;
              return (
                <tr
                  key={doc.documentId}
                  onClick={() => handleRowClick(doc)}
                  className={`border-t border-slate-800 transition ${
                    isActive ? "cursor-pointer hover:bg-slate-800/40" : "opacity-70"
                  }`}
                >
                  <td className="px-5 py-4 text-white break-all">{doc.filename}</td>
                  <td className="px-5 py-4 text-slate-300">
                    {doc.documentType || "-"}
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill status={doc.processingStatus} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden p-4 space-y-4">
        {recentDocuments.map((doc) => {
          const isActive = document && doc.documentId === document.documentId;
          return (
            <div
              key={doc.documentId}
              onClick={() => handleRowClick(doc)}
              className={`bg-slate-800 border border-slate-700 rounded-xl p-4 ${
                isActive ? "" : "opacity-70"
              }`}
            >
              <h3 className="text-white font-medium break-words">{doc.filename}</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-slate-400">Type</span>
                  <span className="text-white">{doc.documentType || "-"}</span>
                </div>
                <div className="flex justify-between gap-3 items-center">
                  <span className="text-slate-400">Status</span>
                  <StatusPill status={doc.processingStatus} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentDocuments;
