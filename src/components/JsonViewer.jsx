import JsonView from "@uiw/react-json-view";

function JsonViewer({ data }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow p-4">
      <h2 className="font-semibold mb-4">
        Structured JSON
      </h2>

      <JsonView value={data} />
    </div>
  );
}

export default JsonViewer;