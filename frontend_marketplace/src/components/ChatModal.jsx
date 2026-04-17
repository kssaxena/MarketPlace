import { useEffect, useRef } from "react";

function ChatModal({ isOpen, onClose, messages, setMessages, input, setInput }) {
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), text: input, sender: "me" }]);
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex h-[500px] w-[400px] flex-col rounded-xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h4 className="font-semibold">Messages</h4>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-2 overflow-y-auto p-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                msg.sender === "me"
                  ? "ml-auto bg-teal-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2 border-t p-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border px-3 py-2 outline-none"
          />
          <button
            onClick={sendMessage}
            className="rounded-lg bg-teal-600 px-4 text-white"
          >
            ➤
          </button>
        </div>

      </div>
    </div>
  );
}

export default ChatModal;