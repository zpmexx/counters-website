import React from "react";

const ShopListElement = ({ text, bgColor }) => {
  return (
    <div
      className={`bg-${bgColor} w-36 text-center text-white px-2 py-1 rounded mr-2`}
    >
      {text}
    </div>
  );
};

export default ShopListElement;
