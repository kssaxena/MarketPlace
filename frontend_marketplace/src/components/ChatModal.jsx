

import { useEffect, useRef } from "react";

function ChatModal({ isOpen, onClose, messages, setMessages, input, setInput }) {
  const bottomRef = useRef(null);

  if (!isOpen) return null;

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: "me" }]);
    setInput("");
  };

  // auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[400px] h-[500px] rounded-xl shadow-xl flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h4 className="font-semibold">Messages</h4>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
                msg.sender === "me"
                  ? "bg-green-500 text-white ml-auto"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2 p-3 border-t">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-3 py-2 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 text-white px-4 rounded-lg"
          >
            ➤
          </button>
        </div>

      </div>
    </div>
  );
}

export default ChatModal;