// src/components/Layout/Header.jsx
import React from 'react';
import { UserCircle, LogOut } from 'lucide-react';

const Header = ({ principal, onLogout }) => {
  return (
    <header className="bg-[#E15B56] text-white px-6 py-3 rounded-md flex items-center justify-between shadow-md">
      {/* Logo / Title */}
      <div className="text-sm text-center">
             Principal ID  :    {principal && (
          <span className="text-sm bg-white/10 rounded-full">
            {principal}
          </span>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        <button
          onClick={onLogout}
          className="hover:bg-red-600 p-2 rounded-full transition"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
