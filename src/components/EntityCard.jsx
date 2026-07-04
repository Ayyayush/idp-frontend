function EntityCard({ title, value }) {
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
      w-full
      transition-all
      hover:border-blue-500/30
      "
    >
      <p
        className="
        text-slate-400
        text-xs
        sm:text-sm
        uppercase
        tracking-wide
        break-words
        "
      >
        {title}
      </p>

      <h3
        className="
        mt-2
        text-base
        sm:text-lg
        lg:text-xl
        font-semibold
        text-white
        break-words
        whitespace-pre-wrap
        leading-6
        "
      >
        {value || "-"}
      </h3>
    </div>
  );
}

export default EntityCard;