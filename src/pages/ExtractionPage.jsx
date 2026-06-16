import { useContext } from "react";

import { DocumentContext } from "../context/DocumentContext";

import JsonViewer from "../components/JsonViewer";

function ExtractionPage() {

  const { result } =
    useContext(DocumentContext);

  if (!result) {
    return (
      <h1 className="text-white">
        No document processed yet.
      </h1>
    );
  }

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Extraction Results
      </h1>

      <div className="
      bg-slate-900
      border
      border-slate-800
      p-5
      rounded-xl
      mb-6
      ">
        <h2 className="font-semibold">
          Document Type
        </h2>

        <p className="text-blue-400 mt-2">
          {result.document_type}
        </p>
      </div>

      <div className="
      bg-slate-900
      border
      border-slate-800
      p-5
      rounded-xl
      mb-6
      ">
        <h2 className="font-semibold mb-4">
          OCR Text
        </h2>

        <p className="text-slate-300 whitespace-pre-wrap">
          {result.ocr_text}
        </p>
      </div>

      <JsonViewer
        data={result.structured_data}
      />

    </div>
  );
}

export default ExtractionPage;