import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { DocumentContext } from "../context/DocumentContext";
import { extractDocument } from "../services/extractService";

function UploadBox() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setResult } = useContext(DocumentContext);

  const navigate = useNavigate();

  const handleProcess = async () => {
    if (!file) {
      toast.error("Select a file");
      return;
    }

    try {
      setLoading(true);

      const data = await extractDocument(file);

      setResult(data);

      toast.success("Document Processed Successfully");

      navigate("/extract");
    } catch (error) {
      console.log(error);

      toast.error("Processing Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      w-full
      max-w-2xl
      mx-auto
      space-y-5
      "
    >
      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={(e) => setFile(e.target.files[0])}
        className="
        block
        w-full
        text-sm
        text-slate-300
        border
        border-slate-700
        rounded-xl
        p-3
        sm:p-4
        bg-slate-900
        file:mr-4
        file:px-4
        file:py-2
        file:rounded-lg
        file:border-0
        file:bg-blue-600
        file:text-white
        file:cursor-pointer
        hover:file:bg-blue-700
        transition-all
        "
      />

      {file && (
        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-xl
          p-4
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-3
          "
        >
          <div className="min-w-0">
            <p
              className="
              text-white
              font-medium
              truncate
              "
            >
              {file.name}
            </p>

            <p className="text-sm text-slate-400">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>

          <span
            className="
            self-start
            sm:self-center
            px-3
            py-1
            rounded-full
            bg-green-500/10
            border
            border-green-500/20
            text-green-400
            text-xs
            "
          >
            Ready
          </span>
        </div>
      )}

      <button
        onClick={handleProcess}
        disabled={loading}
        className="
        w-full
        sm:w-auto
        min-w-[200px]
        bg-blue-600
        hover:bg-blue-700
        transition-all
        duration-200
        px-6
        py-3
        rounded-xl
        text-white
        font-medium
        disabled:opacity-50
        disabled:cursor-not-allowed
        "
      >
        {loading ? "Processing..." : "Process Document"}
      </button>
    </div>
  );
}

export default UploadBox;