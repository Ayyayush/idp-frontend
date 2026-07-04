function RecentDocuments() {
  const docs = [
    {
      name: "invoice_01.pdf",
      type: "Invoice",
      status: "Processed",
    },
    {
      name: "resume.pdf",
      type: "Resume",
      status: "Processed",
    },
    {
      name: "bank_statement.pdf",
      type: "Financial",
      status: "Processed",
    },
  ];

  return (
    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-xl
      shadow
      w-full
      overflow-hidden
      "
    >
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800">
        <h2
          className="
          font-semibold
          text-lg
          sm:text-xl
          text-white
          "
        >
          Recent Documents
        </h2>
      </div>

      {/* Desktop & Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead className="bg-slate-950">
            <tr className="text-left text-slate-400 text-sm">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {docs.map((doc, index) => (
              <tr
                key={index}
                className="
                border-t
                border-slate-800
                hover:bg-slate-800/40
                transition
                "
              >
                <td className="px-5 py-4 text-white">
                  {doc.name}
                </td>

                <td className="px-5 py-4 text-slate-300">
                  {doc.type}
                </td>

                <td className="px-5 py-4">
                  <span
                    className="
                    inline-flex
                    items-center
                    px-3
                    py-1
                    rounded-full
                    bg-green-500/10
                    border
                    border-green-500/20
                    text-green-400
                    text-sm
                    font-medium
                    "
                  >
                    {doc.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden p-4 space-y-4">
        {docs.map((doc, index) => (
          <div
            key={index}
            className="
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            p-4
            "
          >
            <h3
              className="
              text-white
              font-medium
              break-words
              "
            >
              {doc.name}
            </h3>

            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-slate-400">
                  Type
                </span>

                <span className="text-white">
                  {doc.type}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-slate-400">
                  Status
                </span>

                <span
                  className="
                  text-green-400
                  font-medium
                  "
                >
                  {doc.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentDocuments;