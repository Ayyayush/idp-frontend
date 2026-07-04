import { useContext, useState } from "react";
import { DocumentContext } from "../context/DocumentContext";
import JsonViewer from "../components/JsonViewer";

function ExtractionPage() {
  const { result } = useContext(DocumentContext);

  const [activeTab, setActiveTab] =
    useState("summary");

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-xl
          p-6
          sm:p-8
          w-full
          max-w-md
          text-center
          "
        >
          <h1 className="text-white text-lg sm:text-xl font-semibold">
            No document processed yet
          </h1>

          <p className="text-slate-400 mt-2 text-sm">
            Upload a document to view extraction results.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: "summary",
      label: "Summary",
    },
    {
      id: "json",
      label: "JSON",
    },
    {
      id: "ocr",
      label: "OCR Text",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          Extraction Results
        </h1>

        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          AI Document Intelligence Output
        </p>
      </div>

      {/* Document Info */}
      <div
        className="
        bg-slate-900
        border
        border-slate-800
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
            Successfully Processed
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
        "
      >
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400 text-sm">
            OCR Status
          </p>

          <h3 className="text-green-400 text-lg sm:text-xl font-bold mt-2">
            ✓ Complete
          </h3>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400 text-sm">
            Classification
          </p>

          <h3 className="text-blue-400 text-lg sm:text-xl font-bold mt-2">
            ✓ Complete
          </h3>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400 text-sm">
            Entity Extraction
          </p>

          <h3 className="text-purple-400 text-lg sm:text-xl font-bold mt-2">
            ✓ Complete
          </h3>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400 text-sm">
            Summary
          </p>

          <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mt-2">
            ✓ Generated
          </h3>
        </div>
      </div>

      {/* Tabs */}
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
          overflow-x-auto
          border-b
          border-slate-800
          "
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id)
              }
              className={`
                flex-shrink-0
                px-5
                sm:px-6
                py-4
                text-sm
                sm:text-base
                transition-all

                ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6">
          {/* Summary */}
          {activeTab === "summary" && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">
                AI Generated Summary
              </h2>

              <p
                className="
                text-slate-300
                text-sm
                sm:text-base
                leading-7
                whitespace-pre-wrap
                break-words
                "
              >
                {result.summary}
              </p>
            </div>
          )}

          {/* JSON */}
          {activeTab === "json" && (
            <div>
              <div
                className="
                flex
                flex-col
                sm:flex-row
                sm:justify-between
                sm:items-center
                gap-4
                mb-4
                "
              >
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  Structured JSON
                </h2>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      JSON.stringify(
                        result.structured_data,
                        null,
                        2
                      )
                    )
                  }
                  className="
                  w-full
                  sm:w-auto
                  bg-blue-600
                  hover:bg-blue-700
                  px-4
                  py-2
                  rounded-lg
                  text-white
                  "
                >
                  Copy JSON
                </button>
              </div>

              <JsonViewer
                data={result.structured_data}
              />
            </div>
          )}

          {/* OCR */}
          {activeTab === "ocr" && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">
                OCR Extracted Text
              </h2>

              <div
                className="
                bg-slate-950
                border
                border-slate-800
                rounded-lg
                p-4
                sm:p-5
                max-h-[65vh]
                overflow-auto
                "
              >
                <pre
                  className="
                  whitespace-pre-wrap
                  break-words
                  text-slate-300
                  text-xs
                  sm:text-sm
                  leading-7
                  "
                >
                  {result.ocr_text}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExtractionPage;