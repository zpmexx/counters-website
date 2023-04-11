// src/components/ShopList.js
import React, { useState, useEffect } from "react";
import ShopListElement from "./ShopListElement";
import ListSearch from "./ListSearch";

const ITEMS_PER_PAGE = 10;

const ShopList = ({ shops, onShopClick, selectedShop, searchValue, setSearchValue }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const groupedShops = shops.reduce((acc, shop) => {
    acc[shop.salon] = (acc[shop.salon] || 0) + 1;
    return acc;
  }, {});

  const sortedShops = Object.entries(groupedShops).sort((a, b) => b[1] - a[1]);

  const filteredShops = sortedShops.filter(([shopId]) =>
    searchValue.length > 0 ? shopId.toLowerCase().startsWith(searchValue.toLowerCase()) : true
  );

  const totalPages = Math.ceil(filteredShops.length / ITEMS_PER_PAGE) || 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const displayedShops = filteredShops.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  return (
    <div className="w-1/3">
      <ListSearch searchValue={searchValue} onSearchChange={setSearchValue} />
      <h2 className="text-xl font-bold p-2 bg-blue-200">
      <div className="flex justify-between items-center">
              <ShopListElement text={"Shop"} bgColor="blue-500" />
              <ShopListElement text={"Klienci"} bgColor="blue-500" />
            </div>
      </h2>
      <ul>
        {displayedShops.map(([shopId, entrances]) => (
          <li
            key={shopId}
            className={`cursor-pointer p-2 ${
              selectedShop === shopId ? "bg-green-200" : "hover:bg-gray-200"
            }`}
            onClick={() => onShopClick(shopId)}
          >
            <div className="flex justify-between items-center">
              <ShopListElement text={shopId} bgColor="blue-500" />
              <ShopListElement text={entrances} bgColor="blue-500" />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 px-2 flex justify-between items-center">
        <button
          className={`${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white w-32 py-2 rounded`}
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Poprzedni
        </button>
        <span className="text-lg font-semibold">
          {currentPage}/{totalPages}
        </span>
        <button
          className={`${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white w-32 py-2 rounded`}
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
