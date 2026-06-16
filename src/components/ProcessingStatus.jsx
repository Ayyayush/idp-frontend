function ProcessingStatus() {
  const steps = [
    "Upload",
    "OCR",
    "Classification",
    "Entity Extraction",
    "Summary",
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">

      <h2 className="text-xl font-semibold mb-5 text-white">
        Processing Pipeline
      </h2>

      <div className="space-y-3">

        {steps.map((step, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-slate-800 pb-2"
          >
            <span className="text-slate-300">
              {step}
            </span>

            <span className="text-green-400">
              ✓
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}

export default ProcessingStatus;