import React from "react";
import { IoClose } from "react-icons/io5";

function ContactModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-[100]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl relative"
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-black text-2xl"
        >
          <IoClose />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Contact Us
        </h2>

        <div className="space-y-5">

          {/* EMAIL */}
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-800">dash31759@gmail.com</p>
          </div>

          {/* PHONE */}
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium text-gray-800">9348220687</p>
          </div>

          {/* ADDRESS */}
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium text-gray-800">
              DASH BHAVAN , Baleswar – 756043, Odisha
            </p>
          </div>

          {/* SUPPORT HOURS */}
          <div>
            <p className="text-sm text-gray-500">Support Hours</p>
            <p className="font-medium text-gray-800">
              Monday – Saturday: 9 AM – 7 PM
            </p>
            <p className="font-medium text-gray-800">Sunday: Closed</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ContactModal;