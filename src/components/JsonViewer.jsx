import JsonView from "@uiw/react-json-view";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

function JsonViewer({ data }) {

  const [copied, setCopied] =
    useState(false);

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
      "
    >

      <div
        className="
        flex
        justify-between
        items-center
        p-5
        border-b
        border-slate-800
        "
      >

        <div>

          <h2 className="font-semibold text-white text-lg">
            Structured JSON
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Extracted entities and structured output
          </p>

        </div>

        <button
          onClick={handleCopy}
          className="
          flex
          items-center
          gap-2
          bg-blue-600
          hover:bg-blue-700
          px-4
          py-2
          rounded-lg
          text-white
          transition-all
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

      <div
        className="
        bg-slate-950
        p-5
        overflow-auto
        max-h-[700px]
        "
      >

        <JsonView
          value={data}
          displayDataTypes={false}
          displayObjectSize={true}
          enableClipboard={false}
          collapsed={1}
          style={{
            backgroundColor:
              "transparent",
            fontSize: "14px",
          }}
        />

      </div>

    </div>
  );
}

export default JsonViewer;