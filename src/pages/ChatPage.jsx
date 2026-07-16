import { useContext, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Send, Trash2, Bot, User } from "lucide-react";

import { DocumentContext } from "../context/DocumentContext";
import { askQuestion } from "../services/api";

const WELCOME_MESSAGE = {
  type: "ai",
  text: "Upload and process a document, then ask me anything about it.",
};

function ChatPage() {
  const { document } = useContext(DocumentContext);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleAsk = async () => {
    const userQuestion = question.trim();
    if (!userQuestion || loading) return;

    setMessages((prev) => [...prev, { type: "user", text: userQuestion }]);
    setQuestion("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      setLoading(true);
      const response = await askQuestion(userQuestion);
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: response.answer || "No answer was returned." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: error.message || "Unable to generate an answer right now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
    // Shift+Enter falls through to the textarea's default newline behavior.
  };

  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE]);
  };

  const handleTextareaInput = (e) => {
    setQuestion(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
  };

  const quickQuestions = [
    "What skills are mentioned?",
    "What projects are listed?",
    "What is the education background?",
    "Summarize this document",
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          AI Document Assistant
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Ask questions about your processed documents
        </p>
        {!document?.summary && (
          <p className="text-amber-400/90 text-xs sm:text-sm mt-2">
            Tip: extract and summarize a document first for the most relevant answers.
          </p>
        )}
      </div>

      {/* Chat Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
        {/* Quick Questions + Clear */}
        <div className="border-b border-slate-800 p-3 sm:p-4 flex items-center gap-2">
          <div className="flex gap-2 overflow-x-auto scrollbar-thin flex-1">
            {quickQuestions.map((item, index) => (
              <button
                key={index}
                onClick={() => setQuestion(item)}
                className="flex-shrink-0 px-3 py-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition text-xs sm:text-sm"
              >
                {item}
              </button>
            ))}
          </div>
          <button
            onClick={handleClearChat}
            title="Clear chat"
            className="flex-shrink-0 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-2 sm:gap-3 ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.type === "ai" && (
                <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-blue-400" />
                </div>
              )}

              <div
                className={`
                  max-w-[85%] sm:max-w-[75%] lg:max-w-2xl px-4 py-3 rounded-2xl break-words
                  ${message.type === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200"}
                `}
              >
                {message.type === "ai" ? (
                  <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-p:my-1 prose-p:leading-6">
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{message.text}</p>
                )}
              </div>

              {message.type === "user" && (
                <div className="h-8 w-8 rounded-full bg-blue-600/30 flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-blue-300" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 sm:gap-3 justify-start">
              <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-blue-400" />
              </div>
              <div className="bg-slate-800 text-slate-300 rounded-2xl px-4 py-3 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-800 p-3 sm:p-4">
          <div className="flex items-end gap-3">
            <textarea
              ref={textareaRef}
              rows={1}
              value={question}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your document... (Shift+Enter for a new line)"
              className="flex-1 resize-none bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm sm:text-base focus:outline-none focus:border-blue-500 max-h-40"
            />
            <button
              onClick={handleAsk}
              disabled={loading || !question.trim()}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send size={18} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
