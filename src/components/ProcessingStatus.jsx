import {
  CheckCircle2,
  Upload,
  ScanText,
  Brain,
  Database,
  FileText,
} from "lucide-react";

function ProcessingStatus() {
  const steps = [
    {
      title: "Document Upload",
      icon: Upload,
      color: "text-blue-400",
    },
    {
      title: "OCR Extraction",
      icon: ScanText,
      color: "text-green-400",
    },
    {
      title: "Document Classification",
      icon: Brain,
      color: "text-purple-400",
    },
    {
      title: "Entity Extraction",
      icon: Database,
      color: "text-yellow-400",
    },
    {
      title: "Summary Generation",
      icon: FileText,
      color: "text-pink-400",
    },
  ];

  return (
    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-xl
      overflow-hidden
      w-full
      "
    >
      {/* Header */}
      <div
        className="
        p-4
        sm:p-5
        border-b
        border-slate-800
        "
      >
        <h2
          className="
          text-lg
          sm:text-xl
          font-semibold
          text-white
          "
        >
          AI Processing Pipeline
        </h2>

        <p
          className="
          text-slate-400
          text-sm
          mt-1
          "
        >
          End-to-end document intelligence workflow
        </p>
      </div>

      {/* Steps */}
      <div className="p-4 sm:p-5">
        <div className="space-y-4 sm:space-y-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="
                flex
                items-center
                justify-between
                gap-3
                "
              >
                <div
                  className="
                  flex
                  items-center
                  gap-3
                  min-w-0
                  flex-1
                  "
                >
                  <div
                    className="
                    h-10
                    w-10
                    sm:h-11
                    sm:w-11
                    rounded-xl
                    bg-slate-800
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                    "
                  >
                    <Icon
                      size={20}
                      className={step.color}
                    />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="
                      text-white
                      font-medium
                      text-sm
                      sm:text-base
                      break-words
                      "
                    >
                      {step.title}
                    </h3>

                    <p
                      className="
                      text-slate-500
                      text-xs
                      sm:text-sm
                      "
                    >
                      Completed
                    </p>
                  </div>
                </div>

                <CheckCircle2
                  size={22}
                  className="
                  text-green-400
                  flex-shrink-0
                  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProcessingStatus;