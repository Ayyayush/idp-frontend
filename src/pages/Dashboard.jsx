import ProcessingStatus from "../components/ProcessingStatus";
import RecentDocuments from "../components/RecentDocuments";

function Dashboard() {
  return (
    <div>

      <h1 className="text-4xl font-bold mb-8 text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow">
          <p className="text-slate-400">
            Total Documents
          </p>

          <h2 className="text-4xl font-bold mt-2 text-white">
            120
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow">
          <p className="text-slate-400">
            Processed
          </p>

          <h2 className="text-4xl font-bold mt-2 text-white">
            108
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow">
          <p className="text-slate-400">
            Success Rate
          </p>

          <h2 className="text-4xl font-bold mt-2 text-green-400">
            98%
          </h2>
        </div>

      </div>

      <div className="mb-8">
        <ProcessingStatus />
      </div>

      <RecentDocuments />

    </div>
  );
}

export default Dashboard;