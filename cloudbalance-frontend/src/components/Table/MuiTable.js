import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const MuiTable = ({ chartData }) => {
  if (!chartData || chartData.length === 0) {
    return <div>No data available</div>;
  }

  const firstItem = chartData[0];
  const groupByKey = Object.keys(firstItem).find(
    (key) => key !== "USAGE_DATE" && key !== "TOTAL_USAGE_COST"
  );

  const months = chartData[0]?.USAGE_DATE
    ? Object.keys(chartData[0].USAGE_DATE)
    : [];

  return (
    <div style={{ overflowX: "auto" }}>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>{groupByKey}</TableCell>
              {months.map((month) => (
                <TableCell key={month}>{month}</TableCell>
              ))}
              <TableCell>Total Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chartData.map((row, index) => {
              const monthValues = months.map((month) => {
                const value = row.USAGE_DATE?.[month];
                return typeof value === "number" && !isNaN(value) ? value : 0;
              });

              const totalCost = monthValues.reduce((sum, val) => sum + val, 0);

              return (
                <TableRow key={index}>
                  <TableCell>{row[groupByKey]}</TableCell>
                  {months.map((month) => {
                    const value = row.USAGE_DATE?.[month];
                    return (
                      <TableCell key={month}>
                        {typeof value === "number" && !isNaN(value)
                          ? value.toFixed(2)
                          : "N/A"}
                      </TableCell>
                    );
                  })}
                  <TableCell>{totalCost.toFixed(2)}</TableCell>
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
