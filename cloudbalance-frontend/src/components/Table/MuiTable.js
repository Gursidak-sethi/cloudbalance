import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import * as XLSX from "xlsx";
import excel from "../../images/excel.png";

const MuiTable = ({ chartData, groupByKeyProp }) => {
  const processedData = useMemo(() => {
    if (!chartData || chartData.length === 0) return null;

    const firstItemKeys = Object.keys(chartData[0] || {});
    const groupByKey =
      groupByKeyProp ||
      firstItemKeys.find((key) => key !== "month" && key !== "cost");

    if (!groupByKey) return null;

    const monthSet = new Set();
    const groupedRows = {};

    chartData.forEach((item) => {
      const groupValue = item[groupByKey] || "N/A";
      const month = item.USAGE_DATE;
      const cost = item.TOTAL_USAGE_COST ?? 0;

      if (!month) return;
      monthSet.add(month);

      if (!groupedRows[groupValue]) {
        groupedRows[groupValue] = {};
      }

      groupedRows[groupValue][month] =
        (groupedRows[groupValue][month] || 0) + cost;
    });

    const months = Array.from(monthSet).sort();
    return { groupByKey, months, groupedRows };
  }, [chartData, groupByKeyProp]);

  const downloadExcel = () => {
    if (!processedData) return;

    const { groupByKey, months, groupedRows } = processedData;

    const worksheetData = [
      [groupByKey, ...months, "Total Cost"], // Header
    ];

    Object.entries(groupedRows).forEach(([groupValue, monthData]) => {
      const row = [groupValue];
      let total = 0;
      months.forEach((month) => {
        const cost = monthData[month] || 0;
        row.push(cost ? cost.toFixed(2) : "-");
        total += cost;
      });
      row.push(total ? total.toFixed(2) : "-");
      worksheetData.push(row);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cost Analysis");

    XLSX.writeFile(workbook, "cost_analysis.xlsx");
  };

  if (!processedData) {
    return <div>No data available</div>;
  }

  const { groupByKey, months, groupedRows } = processedData;

  return (
    <div style={{ overflowX: "auto", position: "relative" }}>
      {/* Download button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px 0",
        }}
      >
        <Button onClick={downloadExcel}>
          <img src={excel} alt="excel" style={{ height: 30 }} />
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ border: "1px solid #e1e1e1" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }}>
                {groupByKey}
              </TableCell>
              {months.map((month) => (
                <TableCell key={month} sx={{ backgroundColor: "#f0f0f0" }}>
                  {month}
                </TableCell>
              ))}
              <TableCell sx={{ backgroundColor: "#f0f0f0" }}>
                Total Cost
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(groupedRows).map(([groupValue, monthData], idx) => {
              const totalCost = months.reduce((sum, month) => {
                const val = monthData[month];
                return sum + (val !== undefined ? val : 0);
              }, 0);

              return (
                <TableRow key={idx}>
                  <TableCell>{groupValue}</TableCell>
                  {months.map((month) => (
                    <TableCell key={`${month}-${groupValue}`}>
                      {monthData[month] !== undefined
                        ? monthData[month].toFixed(2)
                        : "-"}
                    </TableCell>
                  ))}
                  <TableCell>
                    {totalCost > 0 ? totalCost.toFixed(2) : "-"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MuiTable;
