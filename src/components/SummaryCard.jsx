function SummaryCard() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        AI Generated Summary
      </h2>

      <p className="text-gray-700 leading-7">
        This invoice was issued by ABC Corporation on
        2025-06-01 for a total amount of $1250 USD.
        The document has been successfully classified,
        validated, and transformed into structured JSON
        format for downstream processing.
      </p>
    </div>
  );
}

export default SummaryCard;