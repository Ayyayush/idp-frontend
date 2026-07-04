import JsonView from "@uiw/react-json-view";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

function JsonViewer({ data }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      JSON.stringify(data, null, 2)
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

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
        flex
        flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-4
        p-4
        sm:p-5
        border-b
        border-slate-800
        "
      >
        <div className="min-w-0">
          <h2
            className="
            font-semibold
            text-white
            text-lg
            sm:text-xl
            "
          >
            Structured JSON
          </h2>

          <p
            className="
            text-slate-400
            text-sm
            mt-1
            break-words
            "
          >
            Extracted entities and structured output
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="
          w-full
          sm:w-auto
          flex
          items-center
          justify-center
          gap-2
          bg-blue-600
          hover:bg-blue-700
          transition-all
          px-4
          py-2.5
          rounded-lg
          text-white
          text-sm
          font-medium
          whitespace-nowrap
          "
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy JSON
            </>
          )}
        </button>
      </div>

      {/* JSON Viewer */}
      <div
        className="
        bg-slate-950
        p-3
        sm:p-5
        overflow-x-auto
        overflow-y-auto
        max-h-[70vh]
        "
      >
        <div className="min-w-[650px]">
          <JsonView
            value={data}
            displayDataTypes={false}
            displayObjectSize={true}
            enableClipboard={false}
            collapsed={1}
            style={{
              backgroundColor: "transparent",
              fontSize:
                window.innerWidth < 640 ? "12px" : "14px",
              fontFamily:
                "Consolas, Monaco, monospace",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default JsonViewer;