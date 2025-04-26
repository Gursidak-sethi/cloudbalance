import React, { useEffect } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, Charts);

const LineChart = ({ chartData }) => {
  if (!chartData.data || chartData.data.length === 0)
    return <div>No data available</div>;

  const sample = chartData.data[0];
  console.log("chartData.data: ", chartData.data);
  console.log("sample: ", sample);
  const groupKey = Object.keys(sample).find(
    (key) => key !== "USAGE_DATE" && key !== "TOTAL_USAGE_COST"
  );

  if (!groupKey) return <div>Invalid data format</div>;

  // Group by date
  const groupByDate = chartData.data.reduce((acc, item) => {
    const date = item.USAGE_DATE ?? "Others"; // Handle missing dates too
    const group = item[groupKey] ?? "Others"; // Handle null group names
    if (!acc[date]) acc[date] = {};
    acc[date][group] = item.TOTAL_USAGE_COST;
    return acc;
  }, {});

  const allDates = Object.keys(groupByDate);
  const allGroups = Array.from(
    new Set(chartData.data.map((item) => item[groupKey] ?? "Others"))
  );

  const categories = [
    {
      category: allDates.map((date) => ({ label: date })),
    },
  ];

  const dataset = allGroups.map((group) => ({
    seriesname: group,
    data: allDates.map((date) => ({
      value: groupByDate[date][group]?.toFixed(2) || "0",
    })),
  }));

  const chartConfigs = {
    type: "msline",
    width: "100%",
    height: "500",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "AWS Daily Usage Cost",
        xAxisName: "Date",
        yAxisName: "Cost (USD)",
        numberPrefix: "$",
        theme: "fusion",
        bgColor: "#f4f4f4",
        canvasBgColor: "#ffffff",
        canvasBorderAlpha: "0",
        paletteColors: "#308833, #4f90ff, #ffa726, #f44336, #00acc1",
        toolTip: {
          enabled: false,
        },
      },
      categories,
      dataset,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default LineChart;
