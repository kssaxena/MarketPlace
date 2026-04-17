import { useEffect, useRef, useState } from "react";
import { isDarkModeEnabled } from "../utility/theme.js";

function ChatModal({ isOpen, onClose, messages, setMessages, input, setInput }) {
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const [darkMode, setDarkMode] = useState(() => isDarkModeEnabled());

  // auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // auto focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Listen for dark mode changes
  useEffect(() => {
    const onThemeChange = (event) => {
      setDarkMode(Boolean(event.detail?.darkMode));
    };

    window.addEventListener("themechange", onThemeChange);
    return () => window.removeEventListener("themechange", onThemeChange);
  }, []);

  if (!isOpen) return null;

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input, sender: "me" },
    ]);

    setInput("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className={`${darkMode ? "bg-slate-900" : "bg-white"} w-[400px] h-[500px] rounded-xl shadow-xl flex flex-col transition-colors`}>
        
        {/* Header */}
        <div className={`flex justify-between items-center p-4 border-b ${darkMode ? "border-slate-700" : "border-gray-200"}`}>
          <h4 className={`font-semibold ${darkMode ? "text-slate-100" : "text-gray-900"}`}>Messages</h4>
          <button onClick={onClose} className={darkMode ? "text-slate-400 hover:text-slate-200" : "text-gray-600 hover:text-gray-900"}>✕</button>
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto p-3 space-y-2 ${darkMode ? "bg-slate-800" : "bg-white"}`}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
                msg.sender === "me"
                  ? "bg-teal-600 text-white ml-auto"
                  : darkMode ? "bg-slate-700 text-slate-100" : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className={`flex gap-2 p-3 border-t ${darkMode ? "border-slate-700 bg-slate-900" : "border-gray-200 bg-white"}`}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            className={`flex-1 rounded-lg px-3 py-2 outline-none transition ${
              darkMode 
                ? "bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-500" 
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            } border`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-teal-600 text-white px-4 rounded-lg hover:bg-teal-700 transition"
          >
            ➤
          </button>
        </div>

      </div>
    </div>
  );
}

export default ChatModal;
