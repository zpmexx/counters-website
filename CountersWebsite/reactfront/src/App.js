import { useState, useEffect, useRef, useCallback } from "react";

import ShopList from "./components/ShopList";
import ShopChart from "./components/ShopChart";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import axios from 'axios';
// import { generateShopData } from "./utils/dataGenerator";

const today = new Date();
const rangeStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const rangeEnd = new Date(rangeStart.getTime() + 24 * 60 * 60 * 1000 - 1);

function App() {
  const [selectedShop, setSelectedShop] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState({startDate: rangeStart, endDate: rangeEnd});

  const handleShopClick = (shopId, newDateRange) => {
    setSelectedShop(shopId);
    setSelectedDateRange(newDateRange);
  };

  const fetchInitShop = async () => {
    try {
      const todayResponse = await axios.get('http://172.17.3.131/drf/today/?format=json');
      const groupShops = (shops) => {
        return shops.reduce((acc, shop) => {
          acc[shop.salon] = shop.count;
          return acc;
        }, {});
      };
      const shopCodes = [...new Set(Object.keys(groupShops(todayResponse.data)))]
      const sortFn = ((a, b) => {
        return a.localeCompare(b) * -1;
      });
      const sortedAndFilteredShops = shopCodes.sort(sortFn);
      

      const ITEMS_PER_PAGE = 15;
      const startIndex = 0;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      const displayedShops = sortedAndFilteredShops.slice(startIndex, endIndex);
      setSelectedShop(displayedShops[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchInitShop();
  }, [])


  // const handleShopClickRef = useRef(handleShopClick);

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
