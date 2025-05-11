import Logo from '../assets/icons/logo.jpg';
import HamburgerMenu from '../assets/icons/hamburger-menu.svg';
import Button from './ui/CustomButton';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDropdown } from "./UserMenu";
import { useAuth } from "../contexts/authentication";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className="py-3 px-6 md:px-32 w-full flex justify-between items-center border-b border-gray-300 relative">
        <button className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <img src={Logo} alt="Logo" className="w-[60px] h-[60px]"/>
          <p className="text-xl font-bold">Time To Adventure</p>
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex gap-2">
          {isAuthenticated  ? (
            <UserDropdown />
          ) : (
            <>
              <Button text="Log in" isPrimary={false} onClick={() => navigate("/login")} />
              <Button text="Sign up" isPrimary={true} onClick={() => navigate("/signup")}/>
            </>
          )}
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden">
          <button className="group cursor-pointer" onClick={toggleMenu}>
            <img src={HamburgerMenu} alt="hamburger-menu" />
          </button>
          
          {/* Mobile menu */}
          <div className={`absolute left-0 right-0 top-[101%] w-full bg-white shadow-lg rounded-b-lg z-50 ${isOpen ? 'block' : 'hidden'}`}>
            {isAuthenticated  ? (
              <UserDropdown />
            ) : (
              <div className="flex flex-col gap-3 p-4">
                <Button text="Log in" isPrimary={false} onClick={() => navigate("/login")} />
                <Button text="Sign up" isPrimary={true} onClick={() => navigate("/signup")}/>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
