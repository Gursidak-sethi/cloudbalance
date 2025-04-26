import React, { useState, useEffect } from "react";

const GroupBySelector = ({ groupByColumns = [], onSelect }) => {
  const [visibleButtons, setVisibleButtons] = useState([]);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (groupByColumns.length > 0) {
      const top5 = groupByColumns.slice(0, 5);
      const remaining = groupByColumns.slice(5);

      console.log(top5);
      console.log(remaining);
      setVisibleButtons(top5);
      setDropdownItems(remaining);
      setSelected(top5[0].value);
      onSelect(top5[0].value);
    }
  }, [groupByColumns]);

  const handleSwap = (newValue) => {
    const newItem = dropdownItems.find((item) => item.value === newValue);
    const oldItem = visibleButtons.find((btn) => btn.value === selected);

    const updatedVisible = visibleButtons.map((btn) =>
      btn.value === selected ? newItem : btn
    );
    const updatedDropdown = dropdownItems
      .filter((item) => item.value !== newValue)
      .concat(oldItem)
      .sort((a, b) => a.label.localeCompare(b.label));

    setVisibleButtons(updatedVisible);
    setDropdownItems(updatedDropdown);
    setSelected(newValue);
    onSelect(newValue);
  };

  return (
    <div style={{ display: "flex", gap: 8, margin: "10px 0" }}>
      {visibleButtons.map((col) => (
        <button
          key={col.value}
          onClick={() => {
            setSelected(col.value);
            onSelect(col.value);
          }}
          style={{
            backgroundColor: selected === col.value ? "#007bff" : "#eee",
            color: selected === col.value ? "#fff" : "#000",
            padding: "6px 12px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {col.label}
        </button>
      ))}
      {dropdownItems.length > 0 && (
        <select
          onChange={(e) => handleSwap(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: "5px",
          }}
          defaultValue=""
        >
          <option value="" disabled>
            More
          </option>
          {dropdownItems.map((col) => (
            <option key={col.value} value={col.value}>
              {col.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default GroupBySelector;
