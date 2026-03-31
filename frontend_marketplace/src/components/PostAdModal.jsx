import { useState } from "react";

function PostAdModal({ isOpen, onClose }) {
  console.log("MODAL RECEIVED:", isOpen);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      
      {/* Modal Box */}
      <div className="bg-white w-[90%] max-w-lg rounded-2xl p-6 shadow-2xl relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Post Your Ad
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4">
          
          <input
            type="text"
            placeholder="Product Title"
            className="border p-2 rounded-md focus:outline-green-500"
          />

          <textarea
            placeholder="Description"
            className="border p-2 rounded-md focus:outline-green-500"
          />

          <input
            type="number"
            placeholder="Price (₹)"
            className="border p-2 rounded-md focus:outline-green-500"
          />

          <input
            type="file"
            className="border p-2 rounded-md"
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Submit Ad
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostAdModal;