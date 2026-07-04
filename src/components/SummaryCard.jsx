function SummaryCard() {
  return (
    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-xl
      shadow
      p-4
      sm:p-5
      lg:p-6
      w-full
      "
    >
      <h2
        className="
        text-lg
        sm:text-xl
        font-semibold
        mb-4
        text-white
        "
      >
        AI Generated Summary
      </h2>

      <p
        className="
        text-slate-300
        text-sm
        sm:text-base
        leading-6
        sm:leading-7
        break-words
        whitespace-pre-wrap
        "
      >
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