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

const ShopList = ({ onShopClick, selectedShop, searchValue, setSearchValue }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ column: "today", direction: "desc" });

  const [shopsToday, setShopsToday] = useState([]);
  const [shopsCurrent7Days, setShopsCurrent7Days] = useState([]);
  const [shopsCurrent30Days, setShopsCurrent30Days] = useState([]);

  const [shopsPrevious7Days, setShopsPrevious7Days] = useState([]);
  const [shopsPrevious30Days, setShopsPrevious30Days] = useState([]);

  const fetchDataCurrent = async () => {
    try {
      const todayResponse = await axios.get('http://172.17.3.131/drf/today/?format=json');
      setShopsToday(todayResponse.data);
  
      const sevenDaysResponse = await axios.get('http://172.17.3.131/drf/current_seven/?format=json');
      setShopsCurrent7Days(sevenDaysResponse.data);
  
      const thirtyDaysResponse = await axios.get('http://172.17.3.131/drf/current_thirty/?format=json');
      setShopsCurrent30Days(thirtyDaysResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataPrevious = async () => {
    try {
      const sevenDaysResponse = await axios.get('http://172.17.3.131/drf/previous_seven/?format=json');
      setShopsPrevious7Days(sevenDaysResponse.data);
  
      const thirtyDaysResponse = await axios.get('http://172.17.3.131/drf/previous_thirty/?format=json');
      setShopsPrevious30Days(thirtyDaysResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataCurrent();
    fetchDataPrevious();

    const intervalId = setInterval(() => {
      fetchDataCurrent(); // Fetch data every 5 seconds.
    }, 5000);
    console.log("fetch");

    return () => clearInterval(intervalId);
  }, []);

  const handleSort = (column) => {
    setSortColumn((prev) => {
      if (prev.column === column) {
        return { column, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { column, direction: "desc" };
    });
  };

  // const groupedShops = shops.reduce((acc, shop) => {
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
  const groupedShopsCurrent7Days = groupShops(shopsCurrent7Days);
  const groupedShopsCurrent30Days = groupShops(shopsCurrent30Days);
  const groupedShopsPrevious7Days = groupShops(shopsPrevious7Days);
  const groupedShopsPrevious30Days = groupShops(shopsPrevious30Days);

  const shopCodes = [...new Set(Object.keys(groupedShopsToday).concat(Object.keys(groupedShopsCurrent7Days)).concat(Object.keys(groupedShopsCurrent30Days)))]
  const filteredShops = shopCodes.filter((shopId) =>
    searchValue.length > 0 ? shopId.toLowerCase().startsWith(searchValue.toLowerCase()) : true
  );

  const sortFn = useCallback((a, b) => {
    const shopA = a;
    const shopB = b;
    const direction = sortColumn.direction === "asc" ? 1 : -1;

    switch (sortColumn.column) {
      case "shop":
        return shopA.localeCompare(shopB) * direction;
      case "today":
        return (groupedShopsToday[shopA] - groupedShopsToday[shopB]) * direction;
      case "7days":
        return (groupedShopsCurrent7Days[shopA] - groupedShopsCurrent7Days[shopB]) * direction;
      case "31days":
        return (groupedShopsCurrent30Days[shopA] - groupedShopsCurrent30Days[shopB]) * direction;
      default:
        return 0;
    }
  }, [sortColumn, groupedShopsToday, groupedShopsCurrent7Days, groupedShopsCurrent30Days]);

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

  // DISPLAYED
  const displayedShops = sortedAndFilteredShops.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  return (
    <div className="w-1/2">
      <ListSearch searchValue={searchValue} onSearchChange={setSearchValue} />
      <h2 className="text-xl font-bold">
        <div className="flex justify-between items-center gap-0.5">
          <ShopListElement
            text={"Salon"}
            bgColor={sortColumn.column === "shop" ? "background-secondary" : "primary"}
            onClick={() => handleSort("shop")}
            roundedClass={"rounded-tl-2xl"}
          />
          <ShopListElement
            text={"Dzisiaj"}
            bgColor={sortColumn.column === "today" ? "background-secondary" : "primary"}
            onClick={() => handleSort("today")}
          />
          <ShopListElement
            text={"7 dni"}
            bgColor={sortColumn.column === "7days" ? "background-secondary" : "primary"}
            onClick={() => handleSort("7days")}
          />
          <ShopListElement
            text={"31 dni"}
            bgColor={sortColumn.column === "31days" ? "background-secondary" : "primary"}
            onClick={() => handleSort("31days")}
            roundedClass={"rounded-tr-2xl"}
          />
        </div>
      </h2>
      <ul className="pt-0.5 rounded-b-2xl shadow-lg">
      {displayedShops.map((shopId, index) => (
          <li
            key={shopId}
          >
            <div className="flex justify-between items-center gap-0.5">
              <ShopListElement text={shopId} bgColor={selectedShop === shopId ? "background-secondary" : "primary"} roundedClass={index === displayedShops.length - 1 ? "rounded-bl-2xl" : ""} onClick={() => {
                  const newDateRange = getDateRange(1);
                  onShopClick(shopId, {startDate: newDateRange[0], endDate: newDateRange[1]});
                }}  />
              <ShopListElement text={Math.ceil(groupedShopsToday[shopId] / 2) || '-'} bgColor={selectedShop === shopId ? "background-secondary" : "primary"} onClick={() => {
                  const newDateRange = getDateRange(1);
                  onShopClick(shopId, {startDate: newDateRange[0], endDate: newDateRange[1]});
                }} 
              />
              <ShopListElement text={Math.ceil(groupedShopsCurrent7Days[shopId] / 2) || '-'} bgColor={selectedShop === shopId ? "background-secondary" : "primary"} onClick={() => {
                  const newDateRange = getDateRange(7);
                  onShopClick(shopId, {startDate: newDateRange[0], endDate: newDateRange[1]});
                }} 
              />
              <ShopListElement text={Math.ceil(groupedShopsCurrent30Days[shopId] / 2) || '-'} bgColor={selectedShop === shopId ? "background-secondary" : "primary"} onClick={() => {
                  const newDateRange = getDateRange(31);
                  onShopClick(shopId, {startDate: newDateRange[0], endDate: newDateRange[1]});
                }} roundedClass={index === displayedShops.length - 1 ? "rounded-br-2xl" : ""}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4 shadow-lg rounded-2xl ">
        <PaginationButton
          isDisabled={currentPage === 1}
          onClick={handlePrev}
          text="Poprzedni"
          roundedClass={"rounded-l-2xl"}
        />
        <div className="text-lg font-light w-1/3 text-center text-light-text bg-faded py-2 select-none">
          {currentPage} / {totalPages}
        </div>
        <PaginationButton
          isDisabled={currentPage === totalPages}
          onClick={handleNext}
          text="Następny"
          roundedClass={"rounded-r-2xl"}
        />
      </div>
    </div>
  );
  
};

export default ShopList;
