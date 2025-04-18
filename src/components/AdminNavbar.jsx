import React from 'react';
import { Plus } from 'lucide-react';

const AdminNavbar = ({ title, buttonTitle, isPlus }) => {
  return (
    <div className="flex justify-between items-center px-16 py-6 border-b border-gray-200">
      <h1 className="text-xl font-semibold">{title}</h1>
      <button className="flex items-center gap-2 px-10 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
        {isPlus ? <Plus size={20} /> : null}
        <span>{buttonTitle}</span>
      </button>
    </div>
  );
};

export default AdminNavbar;
