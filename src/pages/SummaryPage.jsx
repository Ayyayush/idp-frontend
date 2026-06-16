import { useContext } from "react";

import { DocumentContext } from "../context/DocumentContext";

function SummaryPage() {

  const { result } =
    useContext(DocumentContext);

  if (!result) {
    return (
      <h1 className="text-white">
        No summary available.
      </h1>
    );
  }

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Document Summary
      </h1>

      <div className="
      bg-slate-900
      border
      border-slate-800
      p-6
      rounded-xl
      ">
        {result.summary}
      </div>

    </div>
  );
}

export default SummaryPage;