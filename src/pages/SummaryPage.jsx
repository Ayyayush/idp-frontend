import { useContext } from "react";
import { DocumentContext } from "../context/DocumentContext";

function SummaryPage() {

  const { result } =
    useContext(DocumentContext);

  if (!result) {
    return (
      <div className="flex items-center justify-center h-[60vh]">

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">

          <h1 className="text-white text-xl">
            No summary available
          </h1>

          <p className="text-slate-400 mt-2">
            Upload and process a document first.
          </p>

        </div>

      </div>
    );
  }

  const copySummary = () => {
    navigator.clipboard.writeText(
      result.summary
    );
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-4xl font-bold text-white">
          AI Summary
        </h1>

        <p className="text-slate-400 mt-2">
          Generated using OCR + LLM Pipeline
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>

            <p className="text-slate-400 text-sm">
              Document Type
            </p>

            <h2 className="text-2xl font-bold text-white mt-2">
              {result.document_type}
            </h2>

          </div>

          <div className="px-4 py-2 rounded-full bg-green-500/20 text-green-400">
            Summary Generated
          </div>

        </div>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

        <div className="flex items-center justify-between border-b border-slate-800 p-5">

          <h2 className="text-xl font-semibold text-white">
            AI Generated Insights
          </h2>

          <button
            onClick={copySummary}
            className="
            bg-blue-600
            hover:bg-blue-700
            px-4
            py-2
            rounded-lg
            text-white
            transition-all
            "
          >
            Copy Summary
          </button>

        </div>

        <div className="p-6">

          <p className="text-slate-300 leading-8 whitespace-pre-wrap">
            {result.summary}
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

          <p className="text-slate-400 text-sm">
            OCR
          </p>

          <h3 className="text-green-400 text-xl font-bold mt-2">
            Complete
          </h3>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

          <p className="text-slate-400 text-sm">
            Classification
          </p>

          <h3 className="text-blue-400 text-xl font-bold mt-2">
            Complete
          </h3>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

          <p className="text-slate-400 text-sm">
            AI Summary
          </p>

          <h3 className="text-purple-400 text-xl font-bold mt-2">
            Generated
          </h3>

        </div>

      </div>

    </div>
  );
}

export default SummaryPage;