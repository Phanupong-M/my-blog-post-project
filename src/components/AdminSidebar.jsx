import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Newspaper, Menu, User, Bell, Key, Globe, LogOut} from 'lucide-react';
import { useAuth } from "../contexts/authentication";

const AdminSidebar = () => {
  const location = useLocation();
  const {logout} = useAuth();

  const navItems = [
    {
      title: 'Article management',
      path: '/admin/article-management',
      icon: ( <Newspaper />)
    },
    {
      title: 'Category management',
      path: '/admin/category-management',
      icon: ( <Menu />)
    },
    {
      title: 'Profile',
      path: '/admin/profile',
      icon: ( <User />)
    },
    {
      title: 'Notification',
      path: '/admin/notification',
      icon: ( <Bell />)
    },
    {
      title: 'Reset password',
      path: '/admin/reset-password',
      icon: ( <Key />)
    }
  ];

  return (
    <div className="w-[1/3] min-h-screen bg-[#EFEEEB] border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-4 border-gray-200">
        <Link to="/admin/article-management" className="text-2xl font-bold">hh.</Link>
        <div className="text-sm text-gray-500">Admin panel</div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-gray-200 text-[#43403B]'
                    : 'text-gray-600 hover:bg-[#DAD6D1]'
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Website Link and Logout */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 text-[#43403B] hover:bg-[#DAD6D1] rounded-lg"
        >
        <Globe />
          <span className="text-sm">hh. website</span>
        </Link>
        <button
          onClick={() => {logout()}}
          className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-[#DAD6D1] rounded-lg w-full cursor-pointer"
        >
          <LogOut />
          <span className="text-sm">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
