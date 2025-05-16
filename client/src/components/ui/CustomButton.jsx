import React from "react";

const CustomButton = ({ text, isPrimary, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full text-center transition duration-300 cursor-pointer
        ${isPrimary
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "border border-gray-400 text-black hover:bg-gray-100"}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;