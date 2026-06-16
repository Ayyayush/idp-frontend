import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { DocumentContext } from "../context/DocumentContext";
import { extractDocument } from "../services/extractService";

function UploadBox() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setResult } =
    useContext(DocumentContext);

  const navigate = useNavigate();

  const handleProcess = async () => {

    if (!file) {
      toast.error("Select a file");
      return;
    }

    try {

      setLoading(true);

      const data =
        await extractDocument(file);

      setResult(data);

      toast.success(
        "Document Processed Successfully"
      );

      navigate("/extract");

    } catch (error) {

      console.log(error);

      toast.error(
        "Processing Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="space-y-4">

      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
        className="
        block
        w-full
        text-sm
        text-slate-300
        border
        border-slate-700
        rounded-lg
        p-3
        bg-slate-900
        "
      />

      {file && (
        <div className="
        bg-slate-900
        border
        border-slate-800
        p-4
        rounded-lg
        ">
          <p className="text-white">
            {file.name}
          </p>

          <p className="text-sm text-slate-400">
            {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}

      <button
        onClick={handleProcess}
        disabled={loading}
        className="
        bg-blue-600
        hover:bg-blue-700
        transition-all
        px-5
        py-3
        rounded-lg
        text-white
        disabled:opacity-50
        "
      >
        {loading
          ? "Processing..."
          : "Process Document"}
      </button>

    </div>
  );
}

export default UploadBox;