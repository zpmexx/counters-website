// src/components/ShopChart.js
import React from "react";
import { VictoryLine, VictoryChart, VictoryAxis } from "victory";

const ShopChart = ({ chartData, shopId }) => {
  if (!chartData) return null;

  const victoryData = chartData.labels.map((label, index) => ({
    x: label,
    y: chartData.datasets[0].data[index],
  }));

  const totalEntrances = chartData.datasets[0].data.reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className="text-2xl mb-4">
        {shopId} | Klientów: {totalEntrances}
      </div>
      <VictoryChart height={500} width={500}>
        <VictoryAxis tickCount={6} />
        <VictoryAxis dependentAxis />
        <VictoryLine
          data={victoryData}
          style={{
            data: {
              stroke: "rgb(75, 192, 192)",
              strokeWidth: 2,
            },
          }}
          interpolation="natural"
        />
      </VictoryChart>
    </div>
  );
};

export default ShopChart;
