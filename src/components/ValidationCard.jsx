function ValidationCard() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow p-5">
      <h2 className="font-semibold mb-3">
        Validation Status
      </h2>

      <div className="flex justify-between">
        <span>Status</span>

        <span className="text-green-600 font-semibold">
          Passed
        </span>
      </div>
    </div>
  );
}

export default ValidationCard;