import React from "react";

const ShopListElement = ({ text, bgColor, onClick, roundedClass }) => {
  const baseClasses = `text-xl font-light text-sm p-1 w-full text-center bg-${bgColor} ${roundedClass} transition-all select-none ${(bgColor === "faded" || bgColor === "background-secondary") ? 'text-light-text' : 'text-dark-text'}`;
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
