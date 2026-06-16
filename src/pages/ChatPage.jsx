function ChatPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-white">
        Document Assistant
      </h1>

      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow h-[600px] flex flex-col">

        <div className="flex-1 p-5 overflow-auto space-y-4">

          <div className="flex justify-end">
            <div className="bg-blue-600 text-white p-3 rounded-xl max-w-md">
              What is the invoice amount?
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-slate-800 text-slate-200 p-3 rounded-xl max-w-md">
              The invoice amount is $1250.
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-600 text-white p-3 rounded-xl max-w-md">
              Who issued the invoice?
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-slate-800 text-slate-200 p-3 rounded-xl max-w-md">
              ABC Corporation issued this invoice.
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 p-4 flex gap-3">

          <input
            type="text"
            placeholder="Ask questions about your document..."
            className="
              flex-1
              bg-slate-950
              border
              border-slate-700
              text-white
              rounded-lg
              px-4
              py-3
              focus:outline-none
              focus:border-blue-500
            "
          />

          <button
            className="
              bg-blue-600
              hover:bg-blue-700
              transition-all
              text-white
              px-6
              py-3
              rounded-lg
            "
          >
            Send
          </button>

        </div>

      </div>
    </div>
  );
}

export default ChatPage;