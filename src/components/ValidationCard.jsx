function ValidationCard() {
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
        mb-4
        "
      >
        Validation Status
      </h2>

      <div
        className="
        flex
        items-center
        justify-between
        gap-3
        flex-wrap
        "
      >
        <span
          className="
          text-slate-400
          text-sm
          sm:text-base
          "
        >
          Status
        </span>

        <span
          className="
          px-3
          py-1
          rounded-full
          bg-green-500/10
          border
          border-green-500/20
          text-green-400
          text-sm
          sm:text-base
          font-semibold
          whitespace-nowrap
          "
        >
          ✓ Passed
        </span>
      </div>
    </div>
  );
}

export default ValidationCard;