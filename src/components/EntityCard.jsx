function EntityCard({ title, value }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow p-4">
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h3 className="font-semibold text-lg mt-1">
        {value}
      </h3>
    </div>
  );
}

export default EntityCard;