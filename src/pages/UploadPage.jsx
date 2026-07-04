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
    <div
      className="
      w-full
      max-w-3xl
      mx-auto
      space-y-6
      "
    >
      {/* Upload Area */}
      <div
        onDragOver={(e) =>
          e.preventDefault()
        }
        onDrop={handleDrop}
        className="
        border-2
        border-dashed
        border-slate-700
        hover:border-blue-500
        bg-slate-900
        rounded-2xl
        p-6
        sm:p-8
        lg:p-10
        text-center
        transition-all
        "
      >
        <div className="text-4xl sm:text-5xl mb-4">
          📄
        </div>

        <h2
          className="
          text-lg
          sm:text-xl
          lg:text-2xl
          font-semibold
          text-white
          "
        >
          Drag & Drop Document
        </h2>

        <p
          className="
          text-slate-400
          mt-2
          text-sm
          sm:text-base
          "
        >
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
            inline-flex
            items-center
            justify-center
            w-full
            sm:w-auto
            bg-blue-600
            hover:bg-blue-700
            transition
            px-6
            py-3
            rounded-xl
            text-white
            cursor-pointer
            font-medium
            "
          >
            Browse Files
          </label>
        </div>
      </div>

      {/* Selected File */}
      {file && (
        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-xl
          p-4
          sm:p-5
          "
        >
          <div
            className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            "
          >
            <div className="min-w-0 flex-1">
              <h3
                className="
                text-white
                font-medium
                break-all
                "
              >
                {file.name}
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                {(file.size / 1024).toFixed(
                  2
                )}{" "}
                KB
              </p>
            </div>

            <div
              className="
              self-start
              sm:self-center
              text-green-400
              text-3xl
              "
            >
              ✓
            </div>
          </div>
        </div>
      )}

      {/* Progress */}
      {loading && (
        <div className="space-y-2">
          <div
            className="
            flex
            justify-between
            text-sm
            "
          >
            <span className="text-slate-400">
              Uploading...
            </span>

            <span className="text-blue-400">
              {progress}%
            </span>
          </div>

          <div
            className="
            h-3
            bg-slate-800
            rounded-full
            overflow-hidden
            "
          >
            <div
              className="
              h-full
              bg-blue-600
              transition-all
              duration-300
              "
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleProcess}
        disabled={loading}
        className="
        w-full
        bg-blue-600
        hover:bg-blue-700
        transition-all
        duration-200
        text-white
        py-3
        sm:py-4
        rounded-xl
        font-medium
        text-sm
        sm:text-base
        disabled:opacity-50
        disabled:cursor-not-allowed
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