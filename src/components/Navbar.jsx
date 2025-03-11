import Logo from '../assets/icons/logo.svg'; 
import HamburgerMenu from '../assets/icons/hamburger-menu.svg'; 
import Button from '../components/shares/Button'; 
import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
<header>
    <nav className="py-3 px-6 w-full flex justify-between items-center border-b  border-gray-300 relative">
          <img src={Logo} alt="Logo"/>

        <div className="hidden md:flex gap-2">
          <Button text="Log in" />
          <Button text="Sign up" isPrimary={true} />
        </div>

      <div className= "md:hidden" >
      <button className="group" onClick={toggleMenu}>
          <img src={HamburgerMenu} alt="hamburger-menu" />
      </button>
        <div className={`absolute left-0 right-0 top-[101%] w-full h-[200px] px-[24px] bg-white shadow-lg rounded-[12px] text-center flex flex-col justify-center gap-6 ${isOpen ? '' : 'hidden'}`}>
          <Button text="Log in" />
          <Button text="Sign up" isPrimary={true} />
        </div>
      </div>
    </nav>
  </header>
  )
}

export default Navbar