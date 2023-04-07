import { useState, useEffect } from "react";

import ShopList from "./components/ShopList";
import ShopChart from "./components/ShopChart";
import { generateShopData } from "./utils/dataGenerator";

function App() {
  const [shops, setShops] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const data = generateShopData();
    setShops(data);
  }, []);

  const handleShopClick = (shopId) => {
    const filteredData = shops.filter((shop) => shop.salon === shopId);
    const processedData = processChartData(filteredData);
    setChartData(processedData);
  };

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

  return (
    <div className="App">
      <div className="flex">
        <ShopList shops={shops} onShopClick={handleShopClick} />
        <ShopChart chartData={chartData} />
      </div>
    </div>
  );
}

export default App;
