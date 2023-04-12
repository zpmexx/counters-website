import React from "react";

const ShopListElement = ({ text, bgColor, onClick }) => {
  const baseClasses = `text-white text-lg text-sm p-1 w-full text-center bg-${bgColor} transition-all`;
  const hoverClass = onClick ? 'hover:bg-hoverbg hover:text-hovertext' : '';

  return (
    <div
      className={`${baseClasses} ${hoverClass}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {text}
    </div>
  );
};

export default ShopListElement;
