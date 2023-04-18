import React, { useEffect } from "react";
import { VictoryArea, VictoryChart, VictoryAxis, VictoryScatter, VictoryTooltip } from "victory";
import ChartInfoBox from "./ChartInfoBox";


const ShopChart = ({ selectedDateRange, chartData, shopId }) => {
  if (!chartData) return null;

  const filteredData = chartData.labels
    .map((label, index) => ({
      x: label,
      y: chartData.datasets[0].data[index],
    }))
    .filter((entry) => {
      if (!selectedDateRange.rangeStart || !selectedDateRange.rangeEnd) {
        return true;
      }
      const entryDate = new Date(entry.x);
      return entryDate >= selectedDateRange.rangeStart && entryDate <= selectedDateRange.rangeEnd;
    });

  const victoryData = filteredData.map((entry) => ({
    x: new Date(entry.x).toLocaleString(),
    y: entry.y,
  }));

  const scatterData = victoryData.filter((data) => data.y !== 0)

  const getDateRangeLabel = () => {
    const rangeInDays = (selectedDateRange[1] - selectedDateRange[0]) / (1000 * 60 * 60 * 24);
    if (rangeInDays === 1) {
      return "Dzisiaj";
    } else if (rangeInDays === 7) {
      return "Ostatnie 7 dni";
    } else if (rangeInDays === 30) {
      return "Ostatnie 30 dni";
    } else {
      return "Dzisiaj";
    }
  };

  const getTickCount = () => {
    const dateRangeLabel = getDateRangeLabel();
  
    switch (dateRangeLabel) {
      case "Dzisiaj":
        return 7;
      case "Ostatnie 7 dni":
        return 2;
      case "Ostatnie 30 dni":
        return 4;
      default:
        return 2; // Default tickCount if dateRangeLabel doesn't match any of the cases
    }
  };

  const getTickFormat = (t) => {
    const dateRangeLabel = getDateRangeLabel();
    if (typeof t === 'number') return ''

    switch (dateRangeLabel) {
      case "Dzisiaj":
        return t.slice(-9, -3);
      case "Ostatnie 7 dni":
        return t.slice(0, 10).replace(',', '');
      case "Ostatnie 30 dni":
        return t.slice(0, 10).replace(',', '');;
      default:
        return t;
    }
  }

  const totalEntrances = chartData.datasets[0].data.reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col items-center w-2/3 bg-faded ml-6 rounded-md">
      <div className="text-2xl mb-4 flex justify-center gap-3 w-full bg-primary py-2 rounded-t-md">
        <ChartInfoBox label="Sklep" value={shopId}/>
        <ChartInfoBox label="Klientów" value={totalEntrances} />
        <ChartInfoBox label="Okres" value={getDateRangeLabel()} />
      </div>
      <div className="w-2/3 max-w-xl">
        <VictoryChart height={500} minDomain={{ y: 0 }}>
          <VictoryArea
              data={victoryData}
              style={{
                data: {
                  stroke: "#2d6a4f",
                  strokeWidth: 3,
                  fill: "rgb(82, 183, 136)"
                },
              }}
              interpolation="monotoneX"
          />
          <VictoryAxis tickCount={getTickCount()} tickFormat={getTickFormat}/>
          <VictoryAxis dependentAxis tickFormat={(t) => Math.round(t)} />
          <VictoryScatter
            data={scatterData}
            size={4}
            style={{ data: { fill: "#2d6a4f" } }}
            labels={({ datum }) => `${datum.x}\n${datum.y}`}
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{ fill: "white", stroke: "lightgray", strokeWidth: 1 }}
                flyoutPadding={15}
              />
            }
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default ShopChart;
