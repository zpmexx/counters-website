// src/components/ShopList.js
import React, { useState } from "react";

const ITEMS_PER_PAGE = 10;

const ShopList = ({ shops, onShopClick }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const groupedShops = shops.reduce((acc, shop) => {
    acc[shop.salon] = (acc[shop.salon] || 0) + 1;
    return acc;
  }, {});

  const sortedShops = Object.entries(groupedShops).sort((a, b) => b[1] - a[1]);

  const totalPages = Math.ceil(sortedShops.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const displayedShops = sortedShops.slice(startIndex, endIndex);

  return (
    <div className="w-1/3">
      <h2 className="text-xl font-bold mb-4">Shop | Entrances from last 24h</h2>
      <ul>
        {displayedShops.map(([shopId, entrances]) => (
          <li
            key={shopId}
            className="cursor-pointer hover:bg-gray-200 p-2"
            onClick={() => onShopClick(shopId)}
          >
            {shopId} | {entrances}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between items-center">
        <button
          className="bg-blue-500 text-white w-32 py-2 rounded"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Poprzedni
        </button>
        <span className="text-lg font-semibold">
          {currentPage}/{totalPages}
        </span>
        <button
          className="bg-blue-500 text-white w-32 py-2 rounded"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Następny
        </button>
      </div>
    </div>
  );
  
};

export default ShopList;
