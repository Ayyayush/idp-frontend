import { useContext, useState } from "react";
import { DocumentContext } from "../context/DocumentContext";
import JsonViewer from "../components/JsonViewer";

function ExtractionPage() {
  const { result } =
    useContext(DocumentContext);

  const [activeTab, setActiveTab] =
    useState("summary");

  if (!result) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
          <h1 className="text-white text-xl">
            No document processed yet
          </h1>
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

      <div>
        <h1 className="text-4xl font-bold text-white">
          Extraction Results
        </h1>

        <p className="text-slate-400 mt-2">
          AI Document Intelligence Output
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>
            <p className="text-slate-400 text-sm">
              Document Type
            </p>

            <h2 className="text-2xl font-bold text-white mt-2">
              {result.document_type}
            </h2>
          </div>

          <div className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-medium">
            Successfully Processed
          </div>

        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400 text-sm">
            OCR Status
          </p>

          <h3 className="text-green-400 text-xl font-bold mt-2">
            ✓ Complete
          </h3>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400 text-sm">
            Classification
          </p>

          <h3 className="text-blue-400 text-xl font-bold mt-2">
            ✓ Complete
          </h3>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400 text-sm">
            Entity Extraction
          </p>

          <h3 className="text-purple-400 text-xl font-bold mt-2">
            ✓ Complete
          </h3>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400 text-sm">
            Summary
          </p>

          <h3 className="text-yellow-400 text-xl font-bold mt-2">
            ✓ Generated
          </h3>
        </div>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

        <div className="flex border-b border-slate-800">

          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id)
              }
              className={`
                px-6 py-4 transition-all
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

        <div className="p-6">

          {activeTab === "summary" && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">
                AI Generated Summary
              </h2>

              <p className="text-slate-300 leading-8 whitespace-pre-wrap">
                {result.summary}
              </p>
            </div>
          )}

          {activeTab === "json" && (
            <div>
              <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-semibold text-white">
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
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
                >
                  Copy JSON
                </button>

              </div>

              <JsonViewer
                data={
                  result.structured_data
                }
              />
            </div>
          )}

          {activeTab === "ocr" && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">
                OCR Extracted Text
              </h2>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 max-h-[600px] overflow-auto">
                <pre className="whitespace-pre-wrap text-slate-300 text-sm leading-7">
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