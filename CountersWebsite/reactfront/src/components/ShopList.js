// src/components/ShopList.js
import React, { useState, useEffect, useCallback } from "react";
import ShopListElement from "./ShopListElement";
import ListSearch from "./ListSearch";
import PaginationButton from "./PaginationButton";
import axios from 'axios';

const ITEMS_PER_PAGE = 15;

const getDateRange = (days) => {
  const today = new Date();
  const rangeStart = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
  return [rangeStart, today];
};

const filterDataByDateRange = (data, rangeStart, rangeEnd) => {
  return data.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate >= rangeStart && entryDate <= rangeEnd;
  });
};

const ShopList = ({ shops, onShopClick, selectedShop, setSelectedDateRange, searchValue, setSearchValue }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ column: "today", direction: "desc" });

  const [shopsToday, setShopsToday] = useState([]);
  const [shopsLast7Days, setShopsLast7Days] = useState([]);
  const [shopsLast30Days, setShopsLast30Days] = useState([]);

  const fetchData = async () => {
    try {
      const todayResponse = await axios.get('http://172.17.3.131/today/?format=json');
      setShopsToday(todayResponse.data);
  
      const sevenDaysResponse = await axios.get('http://172.17.3.131/current_seven/?format=json');
      setShopsLast7Days(sevenDaysResponse.data);
  
      const thirtyDaysResponse = await axios.get('http://172.17.3.131/current_thirty/?format=json');
      setShopsLast30Days(thirtyDaysResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = (column) => {
    setSortColumn((prev) => {
      if (prev.column === column) {
        return { column, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { column, direction: "desc" };
    });
  };

  const groupedShops = shops.reduce((acc, shop) => {
    acc[shop.salon] = (acc[shop.salon] || 0) + 1;
    return acc;
  }, {});

  // const todayRange = getDateRange(1);
  // const last7DaysRange = getDateRange(7);
  // const last30DaysRange = getDateRange(30);

  // const groupedShopsToday = filterDataByDateRange(shops, ...todayRange).reduce((acc, shop) => {
  //   acc[shop.salon] = (acc[shop.salon] || 0) + 1;
  //   return acc;
  // }, {});

  // const groupedShopsLast7Days = filterDataByDateRange(shops, ...last7DaysRange).reduce((acc, shop) => {
  //   acc[shop.salon] = (acc[shop.salon] || 0) + 1;
  //   return acc;
  // }, {});

  // const groupedShopsLast30Days = filterDataByDateRange(shops, ...last30DaysRange).reduce((acc, shop) => {
  //   acc[shop.salon] = (acc[shop.salon] || 0) + 1;
  //   return acc;
  // }, {});

  const groupShops = (shops) => {
    return shops.reduce((acc, shop) => {
      acc[shop.salon] = shop.count;
      return acc;
    }, {});
  };

  const groupedShopsToday = groupShops(shopsToday);
  const groupedShopsLast7Days = groupShops(shopsLast7Days);
  const groupedShopsLast30Days = groupShops(shopsLast30Days);

  const sortedShops = Object.entries(groupedShops).sort((a, b) => b[1] - a[1]);

  const filteredShops = sortedShops.filter(([shopId]) =>
    searchValue.length > 0 ? shopId.toLowerCase().startsWith(searchValue.toLowerCase()) : true
  );

  const sortFn = useCallback((a, b) => {
    const [shopA, countA] = a;
    const [shopB, countB] = b;
    const direction = sortColumn.direction === "asc" ? 1 : -1;

    switch (sortColumn.column) {
      case "shop":
        return shopA.localeCompare(shopB) * direction;
      case "today":
        return (groupedShopsToday[shopA] - groupedShopsToday[shopB]) * direction;
      case "7days":
        return (groupedShopsLast7Days[shopA] - groupedShopsLast7Days[shopB]) * direction;
      case "30days":
        return (groupedShopsLast30Days[shopA] - groupedShopsLast30Days[shopB]) * direction;
      default:
        return 0;
    }
  }, [sortColumn, groupedShopsToday, groupedShopsLast7Days, groupedShopsLast30Days]);

  const sortedAndFilteredShops = filteredShops.sort(sortFn);

  const totalPages = Math.ceil(filteredShops.length / ITEMS_PER_PAGE) || 1;

  // Update the sorting based on the sortColumn state
  useEffect(() => {
    filteredShops.sort(sortFn);
  }, [sortColumn, filteredShops, sortFn]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const displayedShops = sortedAndFilteredShops.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  return (
    <div className="w-1/3">
      <ListSearch searchValue={searchValue} onSearchChange={setSearchValue} />
      <h2 className="text-xl font-bold">
        <div className="flex justify-between items-center gap-1 bg-secondary rounded-md">
          <ShopListElement
            text={"Shop"}
            bgColor={sortColumn.column === "shop" ? "secondary" : "primary"}
            onClick={() => handleSort("shop")}
            roundedClass={"rounded-tl-md"}
          />
          <ShopListElement
            text={"Dzisiaj"}
            bgColor={sortColumn.column === "today" ? "secondary" : "primary"}
            onClick={() => handleSort("today")}
          />
          <ShopListElement
            text={"7 dni"}
            bgColor={sortColumn.column === "7days" ? "secondary" : "primary"}
            onClick={() => handleSort("7days")}
          />
          <ShopListElement
            text={"30 dni"}
            bgColor={sortColumn.column === "30days" ? "secondary" : "primary"}
            onClick={() => handleSort("30days")}
            roundedClass={"rounded-tr-md"}
          />
        </div>
      </h2>
      <ul className="bg-secondary pt-1 rounded-b-md">
      {displayedShops.map(([shopId, entrances], index) => (
          <li
            key={shopId}
          >
            <div className="flex justify-between items-center gap-1">
              <ShopListElement text={shopId} bgColor={selectedShop === shopId ? "faded" : "primary"} roundedClass={index === displayedShops.length - 1 ? "rounded-bl-md" : ""}  />
              <ShopListElement text={groupedShopsToday[shopId] || 0} bgColor={selectedShop === shopId ? "faded" : "primary"} onClick={() => {
                  const newDateRange = getDateRange(1);
                  onShopClick(shopId, newDateRange);
                }} 
              />
              <ShopListElement text={groupedShopsLast7Days[shopId] || 0} bgColor={selectedShop === shopId ? "faded" : "primary"} onClick={() => {
                  const newDateRange = getDateRange(7);
                  onShopClick(shopId, newDateRange);
                }} 
              />
              <ShopListElement text={groupedShopsLast30Days[shopId] || 0} bgColor={selectedShop === shopId ? "faded" : "primary"} onClick={() => {
                  const newDateRange = getDateRange(30);
                  onShopClick(shopId, newDateRange);
                }} roundedClass={index === displayedShops.length - 1 ? "rounded-br-md" : ""}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-2">
        <PaginationButton
          isDisabled={currentPage === 1}
          onClick={handlePrev}
          text="Poprzedni"
          roundedClass={"rounded-l-md"}
        />
        <div className="text-lg font-semibold w-1/3 text-center text-white bg-faded py-2 select-none">
          {currentPage} / {totalPages}
        </div>
        <PaginationButton
          isDisabled={currentPage === totalPages}
          onClick={handleNext}
          text="Następny"
          roundedClass={"rounded-r-md"}
        />
      </div>
    </div>
  );
  
};

export default ShopList;
