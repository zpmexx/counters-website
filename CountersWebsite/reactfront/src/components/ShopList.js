import React from "react";

const ShopList = ({ shops, onShopClick }) => {
  const groupedShops = shops.reduce((acc, shop) => {
    acc[shop.salon] = (acc[shop.salon] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="w-1/3">
      <h2 className="text-xl font-bold mb-4">Shop Entrances from last 24h</h2>
      <ul>
        {Object.entries(groupedShops).map(([shopId, entrances]) => (
          <li
            key={shopId}
            className="cursor-pointer hover:bg-gray-200 p-2"
            onClick={() => onShopClick(shopId)}
          >
            {shopId} {entrances}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopList;
