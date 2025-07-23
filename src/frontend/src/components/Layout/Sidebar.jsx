import React, { useState } from 'react';
import {
  LayoutDashboard,
  UserPlus,
  Ambulance,
  FileBarChart2,
  Menu,
  ChevronsLeft,
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('Menu'); // Track active menu item
  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: <Ambulance />, label: 'Menu' },
    'divider',
    { icon: <FileBarChart2 />, label: 'Attendance' },
    'divider',
    { icon: <FileBarChart2 />, label: 'Events' },
    'divider',
    { icon: <FileBarChart2 />, label: 'Certificates' },
    'divider',
    { icon: <FileBarChart2 />, label: 'Validation' },
  ];

  return (
    <div
      className={`h-screen bg-[#E15B56] text-white flex flex-col justify-between transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } shadow-lg`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          {isOpen && <h1 className="text-lg font-semibold">BlockCert</h1>}
          {/* <button 
            onClick={toggleSidebar} 
            className="p-1 rounded-full hover:transparent "
            aria-label="Toggle sidebar"
          >
            {isOpen ? <ChevronsLeft size={20} /> : <Menu size={20} />}
          </button> */}
        </div>

        <div className="space-y-2 mt-4">
          {menuItems.map((item, idx) =>
            item === 'divider' ? (
              <hr key={idx} className="border-white/20 mx-4" />
            ) : (
              <div
                key={idx}
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all cursor-pointer ${
                  activeItem === item.label 
                    ? 'bg-white/20 font-medium' 
                    : 'hover:bg-white/10'
                }`}
                onClick={() => setActiveItem(item.label)}
              >
                {React.cloneElement(item.icon, {
                  className: "text-white w-5 h-5 flex-shrink-0"
                })}
                {isOpen && (
                  <span className="text-sm whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={`px-4 py-4 text-xs text-white/70 border-t border-white/20 ${
        isOpen ? 'text-center' : 'text-center'
      }`}>
        {isOpen ? '© 2023 BlockCert Attendance' : '©'}
      </div>
    </div>
  );
};

export default Sidebar;