// src/components/DateRangeSelector/DateRangeSelector.js
import React from "react";
import Select from "../DropDowns/Select/Select"; // adjust the path based on your structure

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const currentYear = new Date().getFullYear();
const years = [currentYear, currentYear - 1, currentYear - 2].map(String);

const DateSelector = ({
  startMonth,
  startYear,
  endMonth,
  endYear,
  setStartMonth,
  setStartYear,
  setEndMonth,
  setEndYear,
}) => {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <Select
        label="Start Month"
        options={months}
        value={startMonth}
        onChange={setStartMonth}
      />
      <Select
        label="Start Year"
        options={years}
        value={startYear}
        onChange={setStartYear}
      />
      <Select
        label="End Month"
        options={months}
        value={endMonth}
        onChange={setEndMonth}
      />
      <Select
        label="End Year"
        options={years}
        value={endYear}
        onChange={setEndYear}
      />
    </div>
  );
};

export default DateSelector;
