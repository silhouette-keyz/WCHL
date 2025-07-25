// src/context/LayoutContext.js
import React, { useState, useContext, createContext } from "react";

const LayoutContext = createContext();

function LayoutProvider({ children }) {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);

  const toggleSidebar = () => {
    console.log('isSidebarOpened', isSidebarOpened)
    setIsSidebarOpened(prev => !prev);
  };

  

  return (
    <LayoutContext.Provider value={{ isSidebarOpened, toggleSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
}

// Custom Hook
function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}

export { LayoutProvider, useLayout };
