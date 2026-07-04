import { useState, useRef, useEffect } from "react";
import { askQuestion } from "../services/api";

function ChatPage() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Upload and process a document, then ask me anything about it.",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");

    try {
      setLoading(true);

      const response = await askQuestion(userQuestion);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: response.answer || response,
        },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "Unable to generate answer.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "What skills are mentioned?",
    "What projects are listed?",
    "What is the education background?",
    "Summarize this resume",
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          AI Document Assistant
        </h1>

        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Ask questions about your uploaded document
        </p>
      </div>

      {/* Chat Container */}
      <div
        className="
        bg-slate-900
        border
        border-slate-800
        rounded-xl
        overflow-hidden
        flex
        flex-col
        h-[calc(100vh-180px)]
        min-h-[550px]
        "
      >
        {/* Quick Questions */}
        <div
          className="
          border-b
          border-slate-800
          p-3
          sm:p-4
          flex
          gap-2
          overflow-x-auto
          scrollbar-thin
          "
        >
          {quickQuestions.map((item, index) => (
            <button
              key={index}
              onClick={() => setQuestion(item)}
              className="
              flex-shrink-0
              px-3
              py-2
              rounded-full
              bg-slate-800
              text-slate-300
              hover:bg-slate-700
              transition
              text-xs
              sm:text-sm
              "
            >
              {item}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div
          className="
          flex-1
          overflow-y-auto
          p-4
          sm:p-5
          space-y-4
          "
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`
                max-w-[90%]
                sm:max-w-[80%]
                lg:max-w-2xl
                p-3
                sm:p-4
                rounded-2xl
                break-words
                whitespace-pre-wrap

                ${
                  message.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-200"
                }
                `}
              >
                {message.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div
                className="
                bg-slate-800
                text-slate-300
                rounded-2xl
                p-3
                sm:p-4
                "
              >
                Thinking...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          className="
          border-t
          border-slate-800
          p-3
          sm:p-4
          "
        >
          <div
            className="
            flex
            flex-col
            sm:flex-row
            gap-3
            "
          >
            <input
              type="text"
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                handleAsk()
              }
              placeholder="Ask about your document..."
              className="
              flex-1
              bg-slate-950
              border
              border-slate-700
              rounded-lg
              px-4
              py-3
              text-white
              text-sm
              sm:text-base
              focus:outline-none
              focus:border-blue-500
              "
            />

            <button
              onClick={handleAsk}
              disabled={loading}
              className="
              w-full
              sm:w-auto
              bg-blue-600
              hover:bg-blue-700
              transition
              px-6
              py-3
              rounded-lg
              text-white
              font-medium
              disabled:opacity-50
              disabled:cursor-not-allowed
              "
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;