import React, { useMemo, useState } from "react";
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
import SearchBar from "../SearchBar/SearchBar";

const MuiTable = ({ chartData, groupByKeyProp }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Process data for grouping by key and months
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
      const groupValue = item[groupByKey] || "Unknown";
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

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm || !processedData) return processedData;

    const { groupByKey, months, groupedRows } = processedData;

    const filteredRows = {};
    Object.entries(groupedRows).forEach(([groupValue, monthData]) => {
      if (groupValue.toLowerCase().includes(searchTerm.toLowerCase())) {
        filteredRows[groupValue] = monthData;
      } else {
        const filteredMonthData = Object.keys(monthData).reduce(
          (acc, month) => {
            if (
              monthData[month]
                .toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              acc[month] = monthData[month];
            }
            return acc;
          },
          {}
        );
        if (Object.keys(filteredMonthData).length > 0) {
          filteredRows[groupValue] = filteredMonthData;
        }
      }
    });

    return { groupByKey, months, groupedRows: filteredRows };
  }, [searchTerm, processedData]);

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

  const renderNoDataRow = () => (
    <TableRow>
      <TableCell colSpan={3} align="center">
        No data available
      </TableCell>
    </TableRow>
  );

  const renderTableRows = () => {
    const { groupByKey, months, groupedRows } = filteredData;

    return Object.entries(groupedRows).map(([groupValue, monthData], idx) => {
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
          <TableCell>{totalCost > 0 ? totalCost.toFixed(2) : "-"}</TableCell>
        </TableRow>
      );
    });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div style={{ overflowX: "auto", position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px 0",
        }}
      >
        <Button onClick={downloadExcel}>
          <img
            src={excel}
            alt="excel"
            style={{ height: 30, cursor: "pointer" }}
            title="Download excel for below table"
          />
        </Button>
        <SearchBar onSearch={handleSearch} />
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ border: "1px solid #e1e1e1" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }}>
                {processedData ? processedData.groupByKey : "Group"}
              </TableCell>
              {processedData
                ? processedData.months.map((month) => (
                    <TableCell key={month} sx={{ backgroundColor: "#f0f0f0" }}>
                      {month}
                    </TableCell>
                  ))
                : null}
              <TableCell sx={{ backgroundColor: "#f0f0f0" }}>
                Total Cost
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData && Object.entries(filteredData.groupedRows).length
              ? renderTableRows()
              : renderNoDataRow()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MuiTable;
