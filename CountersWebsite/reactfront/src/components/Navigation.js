import React from "react";
import logo from './../CDRL_logo.png'

const Navigation = () => {
  return (
    <div className="bg-white w-full text-dark text-3xl tracking-wider h-17 shadow-lg flex flex-row-reverse">
      <div className="w-40">
        <a href="https://cdrl.sharepoint.com">
          <img src={logo}></img>
        </a>
      </div>
    </div>
  );
};

export default Navigation;