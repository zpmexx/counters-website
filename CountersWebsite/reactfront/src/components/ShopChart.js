import React from "react";
import { VictoryLine, VictoryChart, VictoryAxis } from "victory";

const ShopChart = ({ chartData }) => {
  if (!chartData) return null;

  const victoryData = chartData.labels.map((label, index) => ({
    x: label,
    y: chartData.datasets[0].data[index],
  }));

  return (
    <div className="w-2/3 flex justify-center items-center">
      <div className="square-chart-container">
        <VictoryChart>
          <VictoryAxis />
          <VictoryAxis dependentAxis />
          <VictoryLine
            data={victoryData}
            style={{
              data: {
                stroke: "rgb(75, 192, 192)",
                strokeWidth: 2,
              },
            }}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default ShopChart;