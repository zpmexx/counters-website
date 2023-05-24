import React, { useState, useEffect } from "react";
import { VictoryArea, VictoryBar, VictoryChart, VictoryAxis, VictoryScatter, VictoryTooltip } from "victory";
import ChartInfoBox from "./ChartInfoBox";
import axios from 'axios';

function countDaysBetweenDates(dateRange) {
  var diffMilliseconds = Math.abs(dateRange.endDate - dateRange.startDate);
  var diffDays = Math.ceil(diffMilliseconds / (1000 * 60 * 60 * 24));
  return diffDays;
}

function dayOfTheWeekName(number) {
  switch (number) {
    case 0:
      return "Niedziela"
    case 1:
      return "Poniedziałek";
    case 2:
      return "Wtorek";
    case 3:
      return "Środa"
    case 4:
      return "Czwartek"
    case 5:
      return "Piątek"
    case 6:
      return "Sobota"
    case 7:
      return "Niedziela"
  }
}

const ShopChart = ({ selectedDateRange, shopId }) => {
  const [dataAndGrouping, setDataAndGrouping] = useState({
    chartData: [],
    groupBy: 'hour'
  });

  useEffect(() => {

    const fetchData = async () => {
      if (!shopId) return;

      let url;
      let groupby;
      switch (countDaysBetweenDates(selectedDateRange)) {
        case 1:
          url = `http://172.17.3.131/drf/grouped_by_hour/${shopId}/`;
          groupby = 'hour';
          break;
        case 7:
          url = `http://172.17.3.131/drf/grouped_by_seven/${shopId}/`
          groupby = 'day';
          break;
        case 31:
          url = `http://172.17.3.131/drf/grouped_by_thirty/${shopId}/`
          groupby = 'day';
          break;
      }

      try {
        const response = await axios.get(url);
        setDataAndGrouping({
          chartData: response.data,
          groupBy: groupby
        })
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    // Call fetchData once immediately, then every 5 seconds
    fetchData();
    const interval = setInterval(fetchData, 5000);

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, [shopId, selectedDateRange]);

  // if (!shopId) return null;

  // const filteredData = chartData.labels
  //   .map((label, index) => ({
  //     x: label,
  //     y: chartData.datasets[0].data[index],
  //   }))
  //   .filter((entry) => {
  //     if (!selectedDateRange.rangeStart || !selectedDateRange.rangeEnd) {
  //       return true;
  //     }
  //     const entryDate = new Date(entry.x);
  //     return entryDate >= selectedDateRange.rangeStart && entryDate <= selectedDateRange.rangeEnd;
  //   });

  const processData = (data) => {
    let result;
    if (dataAndGrouping.groupBy === 'hour') {
      result = new Array(24).fill(0).map((_, index) => {
        const foundEntry = data.find(entry => entry.hour === index);
    
        return {
          x: index,
          y: foundEntry ? foundEntry.count : 0,
        };
      }).filter(e => e.x >= 6 && e.x <= 22);
    }
    if (dataAndGrouping.groupBy === 'day') {
      result = new Array(countDaysBetweenDates(selectedDateRange)).fill().map((_, index) => {
        // Create a new Date object for the current day
        let currentDate = new Date(selectedDateRange.startDate.getTime());
        currentDate.setDate(selectedDateRange.startDate.getDate() + 1 + index);
    
        // Format the current date as a string for easier comparison
        let currentDateString = currentDate.toISOString().split('T')[0];
    
        // Find the corresponding entry in the data array
        let foundEntry = data.find(entry => entry.date === currentDateString);
    
        return {
          x: `${currentDateString}\n${dayOfTheWeekName(currentDate.getDay())}`,
          y: foundEntry ? foundEntry.count : 0,
        };
      });
    }
  
    return result;
  };
  
  const victoryData = processData(dataAndGrouping.chartData);

  const scatterData = victoryData.filter((data) => data.y !== 0)

  const getDateRangeLabel = () => {
    const rangeInDays = countDaysBetweenDates(selectedDateRange)
    if (rangeInDays === 1) {
      return "Dzisiaj";
    } else if (rangeInDays === 7) {
      return "7 dni";
    } else if (rangeInDays === 31) {
      return "31 dni";
    } else {
      return "Dzisiaj";
    }
  };

  const getTickCount = () => {
    switch (countDaysBetweenDates(selectedDateRange)) {
      case 1:
        return 7;
      case 7:
        return 3;
      case 30:
        return 3;
      default:
        return 2; // Default tickCount if dateRangeLabel doesn't match any of the cases
    }
  };

  const getTickFormat = (t) => {
    // const dateRangeLabel = getDateRangeLabel();
    // if (typeof t === 'number') return ''

    // console.log(countDaysBetweenDates(selectedDateRange));

    switch (countDaysBetweenDates(selectedDateRange)) {
      case 1:
        return `${t}:00` //.slice(-9, -3);
      default:
        return t;
    }
  }

  function totalEntrances() {
    return victoryData.reduce((total, item) => total + item.y, 0);
  }

  return (
    <div className="flex flex-col w-1/2 items-center">
      <div className="text-xl mb-4 flex justify-center gap-3 w-full mb-4">
        <ChartInfoBox label="Salon" value={shopId}/>
        <ChartInfoBox label="Przejść" value={totalEntrances()} />
        <ChartInfoBox label="Okres" value={getDateRangeLabel()} />
      </div>
      <div className="w-2/3 bg-background-color w-full rounded-2xl shadow-lg">
        <div className="flex justify-center h-500">
          <VictoryChart height={500} minDomain={{ y: 0 }} >
            <VictoryAxis tickCount={getTickCount()} tickFormat={getTickFormat} style={{
                grid: { stroke: '#335145', strokeWidth: 0.5 },
                axis: { stroke: '#335145' },
                tickLabels: { fill: '#111' },
              }} />
            <VictoryAxis dependentAxis tickFormat={(t) => Math.round(t)}
              style={{
                grid: { stroke: '#335145', strokeWidth: 0.5 },
                axis: { stroke: '#335145' },
                tickLabels: { fill: '#111' },
              }} />
            <VictoryArea
              data={victoryData}
              style={{
                data: {
                  stroke: "#1E352F",
                  strokeWidth: 3,
                  fill: "#335145"
                },
              }}
              interpolation="monotoneX"
            />
            <VictoryScatter
              data={scatterData}
              size={4}
              style={{ data: { fill: "#1E352F" } }}
              labels={({ datum }) => `${datum.x}\nPrzejść: ${datum.y}`}
              labelComponent={
                <VictoryTooltip
                  cornerRadius={10}
                  flyoutStyle={{ fill: "#A6C36F", stroke: "black", strokeWidth: 1 }}
                  flyoutPadding={15}
                />
              }
            />
            
          </VictoryChart>
        </div>
      </div>
    </div>
  );
};

export default ShopChart;
