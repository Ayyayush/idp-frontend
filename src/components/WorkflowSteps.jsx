import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Upload, FileSearch, ScrollText, MessageSquare, Check } from "lucide-react";
import { DocumentContext, STAGES } from "../context/DocumentContext";

const STEPS = [
  {
    key: "upload",
    label: "Upload",
    path: "/upload",
    icon: Upload,
    isUnlocked: () => true,
  },
  {
    key: "extract",
    label: "Extract",
    path: "/extract",
    icon: FileSearch,
    isUnlocked: (stage) => stage !== STAGES.IDLE,
  },
  {
    key: "summary",
    label: "Summary",
    path: "/summary",
    icon: ScrollText,
    isUnlocked: (stage) =>
      stage === STAGES.EXTRACTED || stage === STAGES.CHAT_READY,
  },
  {
    key: "chat",
    label: "Chat",
    path: "/chat",
    icon: MessageSquare,
    isUnlocked: (stage) => stage === STAGES.CHAT_READY,
  },
];

/**
 * Guided workflow indicator: Upload -> Extract -> Summary -> Chat.
 * Steps unlock automatically as the current document progresses, so the
 * user always knows what they can (and should) do next.
 */
function WorkflowSteps() {
  const { stage } = useContext(DocumentContext);
  const location = useLocation();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 sm:p-4 overflow-x-auto">
      <div className="flex items-center min-w-max sm:min-w-0">
        {STEPS.map((step, index) => {
          const unlocked = step.isUnlocked(stage);
          const isActive = location.pathname === step.path;
          const Icon = step.icon;
          const isComplete =
            STEPS.findIndex((s) => s.path === location.pathname) > index &&
            unlocked;

          const content = (
            <div
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg transition-all
                ${isActive ? "bg-blue-600 text-white" : ""}
                ${
                  !isActive && unlocked
                    ? "text-slate-300 hover:bg-slate-800"
                    : ""
                }
                ${!unlocked ? "text-slate-600 cursor-not-allowed" : ""}
              `}
            >
              <div
                className={`
                  h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0
                  ${isActive ? "bg-white/20" : "bg-slate-800"}
                  ${isComplete && !isActive ? "bg-green-500/20" : ""}
                `}
              >
                {isComplete && !isActive ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <Icon size={14} />
                )}
              </div>
              <span className="text-sm font-medium whitespace-nowrap">
                {step.label}
              </span>
            </div>
          );

          return (
            <div key={step.key} className="flex items-center flex-shrink-0">
              {unlocked ? (
                <Link to={step.path}>{content}</Link>
              ) : (
                <div title="Complete the previous step first">{content}</div>
              )}
              {index < STEPS.length - 1 && (
                <div className="w-4 sm:w-8 h-px bg-slate-800 mx-1 flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WorkflowSteps;
