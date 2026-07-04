import { useContext } from "react";
import { DocumentContext } from "../context/DocumentContext";

function SummaryPage() {
  const { result } = useContext(DocumentContext);

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div
          className="
          w-full
          max-w-md
          bg-slate-900
          border
          border-slate-800
          rounded-xl
          p-6
          sm:p-8
          text-center
          "
        >
          <h1 className="text-white text-xl font-semibold">
            No Summary Available
          </h1>

          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Upload and process a document first.
          </p>
        </div>
      </div>
    );
  }

  const copySummary = () => {
    navigator.clipboard.writeText(result.summary);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          AI Summary
        </h1>

        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Generated using OCR + LLM Pipeline
        </p>
      </div>

      {/* Hero Card */}
      <div
        className="
        bg-gradient-to-r
        from-blue-600/20
        to-purple-600/20
        border
        border-blue-500/30
        rounded-xl
        p-5
        sm:p-6
        "
      >
        <div
          className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          "
        >
          <div>
            <p className="text-slate-400 text-sm">
              Document Type
            </p>

            <h2
              className="
              text-xl
              sm:text-2xl
              font-bold
              text-white
              mt-2
              break-words
              "
            >
              {result.document_type}
            </h2>
          </div>

          <div
            className="
            self-start
            md:self-auto
            px-4
            py-2
            rounded-full
            bg-green-500/20
            text-green-400
            text-sm
            font-medium
            "
          >
            Summary Generated
          </div>
        </div>
      </div>

      {/* Summary */}
      <div
        className="
        bg-slate-900
        border
        border-slate-800
        rounded-xl
        overflow-hidden
        "
      >
        <div
          className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
          border-b
          border-slate-800
          p-4
          sm:p-5
          "
        >
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            AI Generated Insights
          </h2>

          <button
            onClick={copySummary}
            className="
            w-full
            sm:w-auto
            bg-blue-600
            hover:bg-blue-700
            transition-all
            px-5
            py-2.5
            rounded-lg
            text-white
            font-medium
            "
          >
            Copy Summary
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <p
            className="
            text-slate-300
            text-sm
            sm:text-base
            leading-7
            sm:leading-8
            whitespace-pre-wrap
            break-words
            "
          >
            {result.summary}
          </p>
        </div>
      </div>

      {/* Status Cards */}
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-4
        sm:gap-5
        "
      >
        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-xl
          p-5
          "
        >
          <p className="text-slate-400 text-sm">
            OCR
          </p>

          <h3 className="text-green-400 text-lg sm:text-xl font-bold mt-2">
            Complete
          </h3>
        </div>

        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-xl
          p-5
          "
        >
          <p className="text-slate-400 text-sm">
            Classification
          </p>

          <h3 className="text-blue-400 text-lg sm:text-xl font-bold mt-2">
            Complete
          </h3>
        </div>

        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-xl
          p-5
          "
        >
          <p className="text-slate-400 text-sm">
            AI Summary
          </p>

          <h3 className="text-purple-400 text-lg sm:text-xl font-bold mt-2">
            Generated
          </h3>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;