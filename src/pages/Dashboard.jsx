import ProcessingStatus from "../components/ProcessingStatus";
import RecentDocuments from "../components/RecentDocuments";
import { useContext } from "react";
import { DocumentContext } from "../context/DocumentContext";

function Dashboard() {
  const { result } = useContext(DocumentContext);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          IDP Dashboard
        </h1>

        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Intelligent Document Processing
        </p>
      </div>

      {/* Statistics */}
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
        sm:gap-5
        "
      >
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
          <p className="text-slate-400 text-sm">
            System Status
          </p>

          <h2 className="text-green-400 text-2xl sm:text-3xl font-bold mt-2">
            Online
          </h2>
        </div>

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
          <p className="text-slate-400 text-sm">
            Document Type
          </p>

          <h2
            className="
            text-white
            text-xl
            sm:text-2xl
            font-bold
            mt-2
            break-words
            "
          >
            {result?.document_type || "-"}
          </h2>
        </div>

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
          <p className="text-slate-400 text-sm">
            Extraction Status
          </p>

          <h2 className="text-blue-400 text-xl sm:text-2xl font-bold mt-2">
            {result ? "Completed" : "Waiting"}
          </h2>
        </div>

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
          <p className="text-slate-400 text-sm">
            AI Pipeline
          </p>

          <h2 className="text-purple-400 text-xl sm:text-2xl font-bold mt-2">
            Active
          </h2>
        </div>
      </div>

      {/* Latest Document */}
      {result && (
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
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-5">
            Latest Document
          </h2>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
            "
          >
            <div>
              <p className="text-slate-400 text-sm">
                Filename
              </p>

              <h3
                className="
                text-white
                mt-2
                break-all
                text-sm
                sm:text-base
                "
              >
                {result.filename}
              </h3>
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Document Type
              </p>

              <h3 className="text-blue-400 mt-2 text-sm sm:text-base">
                {result.document_type}
              </h3>
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Summary Available
              </p>

              <h3 className="text-green-400 mt-2 text-sm sm:text-base">
                Yes
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Pipeline */}
      <ProcessingStatus />

      {/* Recent Documents */}
      <RecentDocuments />
    </div>
  );
}

export default Dashboard;