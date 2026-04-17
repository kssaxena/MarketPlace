import { useEffect, useRef, useState } from "react";
import { isDarkModeEnabled } from "../utility/theme.js";

function ChatModal({ isOpen, onClose, messages, setMessages, input, setInput }) {
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const [darkMode, setDarkMode] = useState(() => isDarkModeEnabled());

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

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
    setMessages((prev) => [...prev, { id: Date.now(), text: input, sender: "me" }]);
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`flex h-[500px] w-[400px] flex-col rounded-xl ${darkMode ? "bg-slate-900 shadow-2xl" : "bg-white shadow-xl"}`}>

        {/* Header */}
        <div className={`flex items-center justify-between border-b ${darkMode ? "border-slate-700 bg-slate-800" : ""} p-4`}>
          <h4 className={`font-semibold ${darkMode ? "text-slate-100" : ""}`}>Messages</h4>
          <button onClick={onClose} className={`${darkMode ? "text-slate-400 hover:text-slate-200" : ""}`}>✕</button>
        </div>

        {/* Messages */}
        <div className={`flex-1 space-y-2 overflow-y-auto p-3 ${darkMode ? "bg-slate-800" : ""}`}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                msg.sender === "me"
                  ? "ml-auto bg-teal-600 text-white"
                  : darkMode ? "bg-slate-700 text-slate-100" : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className={`flex gap-2 border-t ${darkMode ? "border-slate-700 bg-slate-800" : ""} p-3`}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className={`flex-1 rounded-lg border px-3 py-2 outline-none ${darkMode ? "bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" : "border-gray-300"}`}
          />
          <button
            onClick={sendMessage}
            className="rounded-lg bg-teal-600 px-4 text-white hover:bg-teal-700"
          >
            ➤
          </button>
        </div>

      </div>
    </div>
  );
}

export default ChatModal;