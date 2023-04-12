import { useState, useEffect, useRef } from "react";

import ShopList from "./components/ShopList";
import ShopChart from "./components/ShopChart";
import { generateShopData } from "./utils/dataGenerator";

function App() {
  const [shops, setShops] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const processChartData = (data) => {
    const groupedByHour = data.reduce((acc, item) => {
      const hour = item.time.split(":")[0];
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});
  
    const labels = Object.keys(groupedByHour).sort((a, b) => a - b);
    const values = labels.map((label) => groupedByHour[label]);
  
    return {
      labels,
      datasets: [
        {
          label: "Entrances",
          data: values,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    };
  };

  const handleShopClick = (shopId) => {
    const filteredData = shops.filter((shop) => shop.salon === shopId);
    const processedData = processChartData(filteredData);
    setChartData(processedData);
    setSelectedShop(shopId);
  };

  const handleShopClickRef = useRef(handleShopClick);


  useEffect(() => {
    handleShopClickRef.current = handleShopClick;
  }, [handleShopClick]);

  useEffect(() => {
    const data = generateShopData();
    setShops(data);
    const topShopId = getTopShopId(data);
    setSelectedShop(topShopId);
    const topShopData = data.filter((shop) => shop.salon === topShopId);
    const initialChartData = processChartData(topShopData);
    setChartData(initialChartData);
  }, []);

  const getTopShopId = (data) => {
    const today = new Date();
    const todayISOString = today.toISOString().split("T")[0];

    // Filter data for today's date
    const todaysData = data.filter((entry) => entry.date === todayISOString);

    const groupedShops = todaysData.reduce((acc, shop) => {
      acc[shop.salon] = (acc[shop.salon] || 0) + 1;
      return acc;
    }, {});

    const sortedShops = Object.entries(groupedShops).sort((a, b) => b[1] - a[1]);

    return sortedShops[0][0];
  };

  return (
  <div className="App">
    <div className="flex m-5">
      <ShopList shops={shops} onShopClick={handleShopClick} selectedShop={selectedShop} searchValue={searchValue} setSearchValue={setSearchValue} />
      <ShopChart chartData={chartData} shopId={selectedShop} />
    </div>
  </div>
  );
}

export default App;
