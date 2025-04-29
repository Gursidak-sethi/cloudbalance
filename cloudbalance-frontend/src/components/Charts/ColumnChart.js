import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const ColumnChart = ({ chartData, groupKey }) => {
  if (!groupKey) return <div>Invalid group key</div>;

  const hasData = chartData && chartData.length > 0;

  if (!hasData) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          color: "#f00",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        No data available
      </div>
    );
  }

  const uniqueDates = Array.from(
    new Set(chartData.map((item) => item.USAGE_DATE))
  );
  const uniqueGroups = Array.from(
    new Set(chartData.map((item) => item[groupKey] ?? "Unknown"))
  );

  const categories = [
    {
      category: uniqueDates.map((date) => ({ label: date })),
    },
  ];

  const dataset = uniqueGroups.map((group) => {
    return {
      seriesname: group,
      data: uniqueDates.map((date) => {
        const match = chartData.find(
          (item) => item[groupKey] === group && item.USAGE_DATE === date
        );
        return {
          value: match ? match.TOTAL_USAGE_COST.toFixed(2) : "0",
        };
      }),
    };
  });

  const chartConfigs = {
    type: "mscolumn2d",
    width: "100%",
    height: "500",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "AWS Daily Usage Cost",
        xAxisName: "Date",
        yAxisName: "Cost (USD)",
        numberPrefix: "$",
        theme: "candy",
        showvalues: "1",
        // drawcrossline: "1",
        bgColor: "#f4f4f4",
        canvasBgColor: "#ffffff",
        canvasBorderAlpha: "0",
        paletteColors: "#308833, #4f90ff, #ffa726, #f44336, #00acc1",
        toolTip: {
          enabled: false,
        },
        emptyMessage: !hasData ? "No data available" : "",
        emptyMessageStyle: {
          fontSize: "24px",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: "bold",
          color: "#f00",
        },
      },
      categories,
      dataset,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default ColumnChart;
