import React from 'react';

const Button = ({ text, isPrimary, href }) => {
  return (
    <a
      href={href}
      className={`px-6 py-2 rounded-full text-center transition duration-300 cursor-pointer
        ${isPrimary ? 'bg-gray-800 text-white hover:bg-gray-700' : 'border border-gray-400 text-black hover:bg-gray-100'}`}
    >
      {text}
    </a>
  );
};

export default Button;