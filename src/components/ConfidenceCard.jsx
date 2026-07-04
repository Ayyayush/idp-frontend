function ConfidenceCard() {
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
        font-semibold
        text-white
        text-base
        sm:text-lg
        mb-3
        "
      >
        Confidence Score
      </h2>

      <div className="flex items-end justify-between">
        <h1
          className="
          text-3xl
          sm:text-4xl
          lg:text-5xl
          font-bold
          text-blue-500
          "
        >
          96%
        </h1>

        <div
          className="
          px-3
          py-1
          rounded-full
          bg-green-500/10
          border
          border-green-500/20
          text-green-400
          text-xs
          sm:text-sm
          font-medium
          "
        >
          High
        </div>
      </div>
    </div>
  );
}

export default ConfidenceCard;