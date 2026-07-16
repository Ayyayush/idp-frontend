import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Upload } from "lucide-react";

import ProcessingStatus from "../components/ProcessingStatus";
import RecentDocuments from "../components/RecentDocuments";
import WorkflowSteps from "../components/WorkflowSteps";
import { DocumentContext, STAGES } from "../context/DocumentContext";

const NEXT_ACTION_BY_STAGE = {
  [STAGES.IDLE]: { label: "Upload a Document", path: "/upload" },
  [STAGES.UPLOADED]: { label: "Extract Information", path: "/extract" },
  [STAGES.EXTRACTED]: { label: "View Summary", path: "/summary" },
  [STAGES.CHAT_READY]: { label: "Chat With Document", path: "/chat" },
};

function Dashboard() {
  const { document, stage } = useContext(DocumentContext);
  const navigate = useNavigate();

  const nextAction = NEXT_ACTION_BY_STAGE[stage];

  // Map our context's document processing status to ProcessingStatus's
  // "idle | processing | completed | failed" prop, with a step index that
  // reflects extraction (index 4) vs. summary already present (also 4,
  // since summary is generated as part of the extraction pipeline).
  const pipelineStatus = !document
    ? "idle"
    : document.processingStatus === "completed"
    ? "completed"
    : document.processingStatus === "failed"
    ? "failed"
    : "processing";

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          IDP Dashboard
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Intelligent Document Processing
        </p>
      </div>

      <WorkflowSteps />

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6">
          <p className="text-slate-400 text-sm">System Status</p>
          <h2 className="text-green-400 text-2xl sm:text-3xl font-bold mt-2">Online</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6">
          <p className="text-slate-400 text-sm">Document Type</p>
          <h2 className="text-white text-xl sm:text-2xl font-bold mt-2 break-words">
            {document?.documentType || "-"}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6">
          <p className="text-slate-400 text-sm">Extraction Status</p>
          <h2 className="text-blue-400 text-xl sm:text-2xl font-bold mt-2 capitalize">
            {document ? document.processingStatus : "Waiting"}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6">
          <p className="text-slate-400 text-sm">AI Pipeline</p>
          <h2 className="text-purple-400 text-xl sm:text-2xl font-bold mt-2">Active</h2>
        </div>
      </div>

      {/* Latest Document + Next Action */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              {document ? "Latest Document" : "Get Started"}
            </h2>

            {document ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Filename</p>
                  <h3 className="text-white mt-1 break-all text-sm sm:text-base">
                    {document.originalFilename}
                  </h3>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Document Type</p>
                  <h3 className="text-blue-400 mt-1 text-sm sm:text-base">
                    {document.documentType || "Pending"}
                  </h3>
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-sm sm:text-base flex items-center gap-2">
                <Upload size={16} />
                Upload a document to begin.
              </p>
            )}
          </div>

          {nextAction && (
            <button
              onClick={() => navigate(nextAction.path)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl text-white font-medium flex-shrink-0"
            >
              {nextAction.label}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Pipeline */}
      <ProcessingStatus status={pipelineStatus} currentStepIndex={4} />

      {/* Recent Documents */}
      <RecentDocuments />
    </div>
  );
}

export default Dashboard;
