import { useState, useEffect, useRef, useCallback } from "react";

import ShopList from "./components/ShopList";
import ShopChart from "./components/ShopChart";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import { generateShopData } from "./utils/dataGenerator";

const today = new Date();
const rangeStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const rangeEnd = new Date(rangeStart.getTime() + 24 * 60 * 60 * 1000 - 1);

function App() {
  const [selectedShop, setSelectedShop] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState({startDate: today, endDate: today});

  const handleShopClick = (shopId, newDateRange) => {
    // console.log(newDateRange[0]);
    // const filteredData = shops.filter((shop) => {
    //   const entryDate = new Date(shop.date);
    //   return (
    //     shop.salon === shopId &&
    //     entryDate > newDateRange[0] &&
    //     entryDate <= newDateRange[1]
    //   );
    // });
    // const processedData = processChartData(filteredData, newDateRange);
    // setChartData(processedData);
    setSelectedShop(shopId);
    setSelectedDateRange(newDateRange);
  };
  

  const handleShopClickRef = useRef(handleShopClick);

  // const processChartData = (data, selectedDateRange) => {
  //   const rangeInDays = Math.floor(
  //     (selectedDateRange[1]-1 - selectedDateRange[0]) / (1000 * 60 * 60 * 24)
  //   ) + 1;
  
  //   const hourOrDayFormat = rangeInDays <= 1 ? "hour" : "day";
  
  //   const groupedData = data.reduce((acc, entry) => {
  //     const entryDate = new Date(`${entry.date}T${entry.time}`);
  //     let formattedDate;
  
  //     if (hourOrDayFormat === "hour") {
  //       formattedDate = new Date(
  //         entryDate.getFullYear(),
  //         entryDate.getMonth(),
  //         entryDate.getDate(),
  //         entryDate.getHours()
  //       );
  //     } else {
  //       formattedDate = new Date(
  //         entryDate.getFullYear(),
  //         entryDate.getMonth(),
  //         entryDate.getDate()
  //       );
  //     }
  
  //     acc[formattedDate] = (acc[formattedDate] || 0) + 1;
  //     return acc;
  //   }, {});

  //   console.log("Grouped");
  //   console.log(groupedData);
  
  //   const labels = [];
  //   const datasetData = [];
  
  //   for (let i = 0; i < rangeInDays; i++) {
      
  //     if (hourOrDayFormat === "hour") {
  //       const currentDate = new Date(selectedDateRange[1].getTime() + i * 24 * 60 * 60 * 1000);
  //       for (let j = 0; j < 24; j++) {
  //         const hourDate = new Date(currentDate);
  //         hourDate.setHours(j);
  //         hourDate.setMinutes(0);
  //         hourDate.setSeconds(0);
  //         hourDate.setMilliseconds(0);
  //         labels.push(hourDate);
  //         datasetData.push(groupedData[hourDate] || 0);
  //       }
  //     } else {
  //       const currentDate = new Date(selectedDateRange[0].getTime() + (i+1) * 24 * 60 * 60 * 1000);
  //       labels.push(currentDate);
  //       currentDate.setHours(0);
  //       currentDate.setMinutes(0);
  //       currentDate.setSeconds(0);
  //       currentDate.setMilliseconds(0);
  //       datasetData.push(groupedData[currentDate] || 0);
  //     }
  //   }
  
  //   return {
  //     labels,
  //     datasets: [
  //       {
  //         data: datasetData,
  //       },
  //     ],
  //   };
  // };

  // useEffect(() => {
  //   handleShopClickRef.current = handleShopClick;
  // }, [handleShopClick]);
  
  // useEffect(() => {
  //   const data = generateShopData();
  //   setShops(data);
  //   const topShopId = getTopShopId(data);
  //   setSelectedShop(topShopId);
  //   const topShopData = data.filter((shop) => shop.salon === topShopId);
  //   const initialChartData = processChartData(topShopData, selectedDateRange);
  //   setChartData(initialChartData);
  // }, []);


  // const getTopShopId = (data) => {
  //   const today = new Date();
  //   const todayISOString = today.toISOString().split("T")[0];

  //   // Filter data for today's date
  //   const todaysData = data.filter((entry) => entry.date === todayISOString);

  //   const groupedShops = todaysData.reduce((acc, shop) => {
  //     acc[shop.salon] = (acc[shop.salon] || 0) + 1;
  //     return acc;
  //   }, {});

  //   const sortedShops = Object.entries(groupedShops).sort((a, b) => b[1] - a[1]);

  //   return sortedShops[0][0];
  // };

  return (
  <div className="App">
    <Navigation />
    <div className="flex ml-0">
      <Sidebar />
      <div className="ml-72 flex w-full mx-8 gap-8 mt-8">
        <ShopList 
          onShopClick={handleShopClick} 
          selectedShop={selectedShop} 
          setSelectedDateRange={setSelectedDateRange}
          searchValue={searchValue} 
          setSearchValue={setSearchValue} />
        <ShopChart selectedDateRange={selectedDateRange} shopId={selectedShop} />

      </div>
    </div>
  </div>
  );
}

export default App;
