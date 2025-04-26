import React, { useState } from "react";
import axios from "axios";

const FilterSidebar = ({
  filters,
  selectedFilters,
  setSelectedFilters,
  onClose,
  setFilters,
  groupByColumns,
  applyFilters,
  disabled,
}) => {
  const [openSections, setOpenSections] = useState({});
  const [loadingSection, setLoadingSection] = useState(null);

  const toggleCheckbox = (column, value) => {
    const current = selectedFilters[column] || [];
    if (current.includes(value)) {
      setSelectedFilters({
        ...selectedFilters,
        [column]: current.filter((v) => v !== value),
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        [column]: [...current, value],
      });
    }
  };

  const toggleAccordion = async (column) => {
    setOpenSections((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));

    if (filters[column] && filters[column].length > 0) return;

    try {
      setLoadingSection(column);
      const res = await axios.get(`/cost-analysis/filters/${column}`);
      setFilters((prevFilters) => ({
        ...prevFilters,
        [column]: res.data || [],
      }));
    } catch (err) {
      console.error(`Failed to load filters for ${column}`, err);
    } finally {
      setLoadingSection(null);
    }
  };

  const handleApply = (column) => {
    applyFilters(column);
  };

  return (
    <aside
      style={{
        width: "300px",
        background: "#f9f9f9",
        border: "1px solid #ccc",
        padding: 20,
        height: 480,
        overflowY: "auto",
        boxShadow: "0 0 8px 5px rgba(0,0,0,0.1)",
      }}
    >
      <button onClick={onClose} style={{ float: "right", marginBottom: 10 }}>
        X
      </button>
      <h3>Filters</h3>
      {Object.entries(filters).map(([column, values]) => {
        const isOpen = openSections[column];
        const displayName = groupByColumns.find(
          (item) => item.value === column
        )?.label;
        return (
          <div key={column} style={{ marginBottom: 10 }}>
            <div
              onClick={() => toggleAccordion(column)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
                background: "#eee",
                padding: "8px 10px",
                borderRadius: 4,
              }}
            >
              <strong>
                {displayName || column}{" "}
                {selectedFilters[column]?.length > 0 &&
                  `(${selectedFilters[column].length})`}
              </strong>
              <span>{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
              <div
                style={{
                  maxHeight: 250,
                  overflowY: "auto",
                  overflowX: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {loadingSection === column ? (
                  <div>Loading...</div>
                ) : values.length === 0 ? (
                  <div>No options available</div>
                ) : (
                  values.map((value) => (
                    <div key={value}>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            selectedFilters[column]?.includes(value) || false
                          }
                          onChange={() => toggleCheckbox(column, value)}
                        />
                        {value}
                      </label>
                    </div>
                  ))
                )}
                <button
                  onClick={() => handleApply(column)}
                  style={{
                    marginTop: 10,
                    padding: "5px 10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                  disabled={disabled}
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
};

export default FilterSidebar;
