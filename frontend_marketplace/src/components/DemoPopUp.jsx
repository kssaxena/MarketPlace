import React from "react";
import { IoMdClose } from "react-icons/io";

const DemoPopUp = ({ onClose }) => {
  return (
    <div className="bg-black/90 h-full w-full text-white flex justify-center items-center ">
      <button onClick={onClose}>
        <IoMdClose className="text-red-600 text-3xl" />
      </button>
      <h1>Hello world</h1>
    </div>
  );
};

export default DemoPopUp;
