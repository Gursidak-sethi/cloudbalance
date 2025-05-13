// src/components/DateRangeSelector/DateRangeSelector.js
import React from "react";
import Input from "../Input/Input";

const DateSelector = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
      <Input
        label={"Start Date"}
        type={"month"}
        name={"date"}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        height={20}
        width={100}
        styleName={"dates"}
      />
      <Input
        label={"End Date"}
        type={"month"}
        name={"date"}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        height={20}
        width={100}
        styleName={"dates"}
      />
    </div>
  );
};

export default DateSelector;
