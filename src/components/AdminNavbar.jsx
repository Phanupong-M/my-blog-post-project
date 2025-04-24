import React from 'react';
import { Plus } from 'lucide-react';

const AdminNavbar = ({ title, actions}) => {
  return (
    <div className="flex items-center justify-between px-8 py-4 border-b border-[#E5E3DD] bg-[#FAF9F7]">
      <h2 className="text-lg font-semibold text-[#222]">{title}</h2>
      <div className="flex gap-1">{actions}</div>
    </div>
  );
};

export default AdminNavbar;
