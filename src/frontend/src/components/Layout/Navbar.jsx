import React from "react";

const Navbar = ({ principal }) => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      {/* <h1 className="text- font-bold">Proof of Attendance Dashboard</h1> */}
      {principal && (
        <span className="text-sm bg-gray-200 px-3 py-1 rounded">
          {principal}
        </span>
      )}
    </header>
  );
};

export default Navbar;
