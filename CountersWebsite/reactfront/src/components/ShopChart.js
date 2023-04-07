import React from "react";
import Chart from 'chart.js/auto';
import { Chart as ChartJS2 } from "react-chartjs-2";

const ShopChart = ({ chartData }) => {
  if (!chartData) return null;

  return (
    <div className="w-2/3">
      <ChartJS2 type="line" data={chartData} options={{}} />
    </div>
  );
};

export default ShopChart;