import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white fixed top-0 left-0 z-40 h-screen bg-gray-100 shadow-lg flex flex-col justify-between">
      <div className="p-4 text-dark text-3xl tracking-wider text-center">
        Liczniki CDRL
      </div>
      <div className="p-4 text-dark text-xl text-center mb-4">
        Copyright IT CDRL
      </div>
    </div>
  );
};

export default Sidebar;
