import {
  useState,
  useContext,
} from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { DocumentContext } from "../context/DocumentContext";

import { extractDocument } from "../services/api";

function UploadBox() {

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const { setResult } =
    useContext(DocumentContext);

  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFile =
      e.dataTransfer.files[0];

    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleProcess = async () => {

    if (!file) {
      toast.error(
        "Please select a file"
      );
      return;
    }

    try {

      setLoading(true);

      const data =
        await extractDocument(
          file,
          (progressEvent) => {

            const percent =
              Math.round(
                (progressEvent.loaded * 100) /
                progressEvent.total
              );

            setProgress(percent);
          }
        );

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

      setProgress(0);

    }
  };

  return (
    <div className="space-y-6">

      <div
        onDragOver={(e) =>
          e.preventDefault()
        }
        onDrop={handleDrop}
        className="
        border-2
        border-dashed
        border-slate-700
        bg-slate-900
        rounded-2xl
        p-10
        text-center
        hover:border-blue-500
        transition-all
        "
      >

        <div className="text-5xl mb-4">
          📄
        </div>

        <h2 className="text-xl font-semibold text-white">
          Drag & Drop Document
        </h2>

        <p className="text-slate-400 mt-2">
          PDF, PNG, JPG, JPEG
        </p>

        <div className="mt-6">

          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            id="fileInput"
            className="hidden"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
          />

          <label
            htmlFor="fileInput"
            className="
            bg-blue-600
            hover:bg-blue-700
            px-5
            py-3
            rounded-lg
            text-white
            cursor-pointer
            inline-block
            "
          >
            Browse Files
          </label>

        </div>

      </div>

      {file && (

        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-xl
          p-5
          "
        >

          <div className="flex justify-between items-center">

            <div>

              <h3 className="text-white font-medium">
                {file.name}
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                {(file.size / 1024).toFixed(2)} KB
              </p>

            </div>

            <div className="text-green-400 text-2xl">
              ✓
            </div>

          </div>

        </div>

      )}

      {loading && (

        <div className="space-y-2">

          <div className="flex justify-between text-sm">

            <span className="text-slate-400">
              Uploading...
            </span>

            <span className="text-blue-400">
              {progress}%
            </span>

          </div>

          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">

            <div
              className="
              h-full
              bg-blue-600
              transition-all
              "
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      )}

      <button
        onClick={handleProcess}
        disabled={loading}
        className="
        w-full
        bg-blue-600
        hover:bg-blue-700
        text-white
        py-4
        rounded-xl
        font-medium
        transition-all
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