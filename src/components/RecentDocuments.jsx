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
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow p-5">
      <h2 className="font-semibold mb-4">
        Recent Documents
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {docs.map((doc, index) => (
            <tr key={index} className="border-t">
              <td className="py-3">{doc.name}</td>
              <td>{doc.type}</td>
              <td className="text-green-600">
                {doc.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentDocuments;