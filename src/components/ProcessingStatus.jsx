import {
  CheckCircle2,
  Circle,
  XCircle,
  Loader2,
  Upload,
  ScanText,
  Brain,
  Database,
  FileText,
} from "lucide-react";

const PIPELINE_STEPS = [
  { title: "Document Upload", icon: Upload, color: "text-blue-400" },
  { title: "Running OCR", icon: ScanText, color: "text-green-400" },
  { title: "Document Classification", icon: Brain, color: "text-purple-400" },
  { title: "Entity Extraction", icon: Database, color: "text-yellow-400" },
  { title: "Summary Generation", icon: FileText, color: "text-pink-400" },
];

/**
 * Renders the AI processing pipeline with real state:
 *  - status "idle"       -> every step pending
 *  - status "processing" -> steps before currentStepIndex complete, current step spinning
 *  - status "completed"  -> every step complete
 *  - status "failed"     -> steps before currentStepIndex complete, current step failed
 */
function ProcessingStatus({ status = "idle", currentStepIndex = -1 }) {
  const getStepState = (index) => {
    if (status === "completed") return "complete";
    if (status === "idle") return "pending";
    if (status === "failed") {
      if (index < currentStepIndex) return "complete";
      if (index === currentStepIndex) return "failed";
      return "pending";
    }
    // processing
    if (index < currentStepIndex) return "complete";
    if (index === currentStepIndex) return "active";
    return "pending";
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden w-full">
      <div className="p-4 sm:p-5 border-b border-slate-800">
        <h2 className="text-lg sm:text-xl font-semibold text-white">
          AI Processing Pipeline
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          End-to-end document intelligence workflow
        </p>
      </div>

      <div className="p-4 sm:p-5">
        <div className="space-y-4 sm:space-y-5">
          {PIPELINE_STEPS.map((step, index) => {
            const Icon = step.icon;
            const state = getStepState(index);

            return (
              <div key={index} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <Icon
                      size={20}
                      className={state === "pending" ? "text-slate-600" : step.color}
                    />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className={`font-medium text-sm sm:text-base break-words ${
                        state === "pending" ? "text-slate-500" : "text-white"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm">
                      {state === "complete" && "Completed"}
                      {state === "active" && "In progress..."}
                      {state === "failed" && "Failed"}
                      {state === "pending" && "Waiting"}
                    </p>
                  </div>
                </div>

                {state === "complete" && (
                  <CheckCircle2 size={22} className="text-green-400 flex-shrink-0" />
                )}
                {state === "active" && (
                  <Loader2 size={22} className="text-blue-400 flex-shrink-0 animate-spin" />
                )}
                {state === "failed" && (
                  <XCircle size={22} className="text-red-400 flex-shrink-0" />
                )}
                {state === "pending" && (
                  <Circle size={22} className="text-slate-700 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProcessingStatus;
