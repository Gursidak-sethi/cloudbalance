import React, { useEffect, useState, useCallback } from "react";
import styles from "./CostExplorerScreen.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import ColumnChart from "../../../components/Charts/ColumnChart";
import LineChart from "../../../components/Charts/LineChart";
import GroupBy from "../../../components/GroupBy/GroupBy";
import FilterSidebar from "../../../components/FilterSidebar/FilterSidebar";
import DateSelector from "../../../components/DateSelector/DateSelector";
import Select from "../../../components/DropDowns/Select/Select";
import MuiTable from "../../../components/Table/MuiTable";
import TimelineIcon from "@mui/icons-material/Timeline";

const CostExplorerScreen = () => {
  const [loading, setLoading] = useState(false);
  const [groupByColumns, setGroupByColumns] = useState([]);
  const [selectedGroupBy, setSelectedGroupBy] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [unsavedFilters, setUnsavedFilters] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("Column");
  const [isChartVisible, setIsChartVisible] = useState({
    isColumn: true,
    isLine: false,
  });
  const [startMonth, setStartMonth] = useState();
  const [startYear, setStartYear] = useState();
  const [endMonth, setEndMonth] = useState();
  const [endYear, setEndYear] = useState();

  const selectedCaAccount = useSelector(
    (state) => state.account.selectedCaAccountId
  );

  useEffect(() => {
    setLoading(true);
    const fetchGroupByColumns = async () => {
      try {
        const response = await axios.get("/cost-analysis/groups");
        const columns = response.data.map((item) => ({
          label: item.displayName,
          value: item.groupName.trim(),
        }));
        setGroupByColumns(columns);
        setSelectedGroupBy(columns[0]?.value || "");

        const initialFilters = {};
        columns.forEach((col) => {
          initialFilters[col.value] = [];
        });
        setFilters(initialFilters);
      } catch (error) {
        console.error("Failed to fetch group by columns", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupByColumns();

    const now = new Date();
    const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");
    const currentYear = now.getFullYear().toString();
    setStartMonth(currentMonth);
    setStartYear(currentYear);
    setEndMonth(currentMonth);
    setEndYear(currentYear);
  }, []);

  const createRequestBody = () => ({
    accountId: selectedCaAccount,
    groupBy: selectedGroupBy,
    filters: selectedFilters,
    startDate: `${startYear}-${startMonth}`,
    endDate: `${endYear}-${endMonth}`,
  });

  const applyFilters = useCallback(() => {
    setUnsavedFilters(false);
    const requestBody = createRequestBody();
    fetchData(requestBody);
  }, [
    selectedFilters,
    selectedCaAccount,
    selectedGroupBy,
    startMonth,
    startYear,
    endMonth,
    endYear,
  ]);

  const fetchData = useCallback(async (requestBody) => {
    try {
      setLoading(true);
      const response = await axios.post("/cost-analysis/cost", requestBody);
      setChartData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedCaAccount || !selectedGroupBy) return;
    const requestBody = createRequestBody();
    fetchData(requestBody);
  }, [
    selectedCaAccount,
    selectedGroupBy,
    startMonth,
    startYear,
    endMonth,
    endYear,
    fetchData,
  ]);

  useEffect(() => {
    setUnsavedFilters(true);
  }, [selectedFilters]);

  const handleChartDisplay = (value) => {
    setChartType(value);
    setIsChartVisible({
      isColumn: value === "Column" || value === "Both",
      isLine: value === "Line" || value === "Both",
    });
  };

  return (
    <div className={styles.caContainer}>
      <div style={{ marginLeft: 10 }}>
        <h1 style={{ fontSize: 24 }}>Cost Analysis</h1>
        <div style={{ fontSize: 14, color: "#515151" }}>
          How to always be aware of cost and history.
        </div>
        <div>
          <GroupBy
            groupByColumns={groupByColumns}
            onSelect={(value) => {
              setSelectedGroupBy(value); // directly set the value
            }}
          />
        </div>
      </div>

      <div className={styles.chartContainer}>
        {loading ? (
          "Loading..."
        ) : (
          <div
            style={{ display: "flex", flexDirection: "row", flex: 1, gap: 20 }}
          >
            <div
              style={{
                flex: showFilters ? 1 : "auto",
                width: showFilters ? "calc(100% - 300px)" : "100%",
                display: "flex",
                flexDirection: "column",
                transition: "width 0.3s ease",
                gap: 20,
              }}
            >
              <div
                style={{
                  // alignSelf: "flex-end",
                  marginBottom: 5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Select
                    label={"Chart Type: "}
                    options={["Column", "Line", "Both"]}
                    value={chartType}
                    onChange={handleChartDisplay}
                  />
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <DateSelector
                    startMonth={startMonth}
                    startYear={startYear}
                    endMonth={endMonth}
                    endYear={endYear}
                    setStartMonth={setStartMonth}
                    setStartYear={setStartYear}
                    setEndMonth={setEndMonth}
                    setEndYear={setEndYear}
                  />
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    style={{
                      width: 35,
                      height: 30,
                      backgroundColor: "#4398D7",
                      border: "none",
                      borderRadius: 4,
                    }}
                  >
                    <TimelineIcon style={{ color: "#fff" }} />
                  </button>
                </div>
              </div>
              {isChartVisible.isColumn && <ColumnChart chartData={chartData} />}
              {isChartVisible.isLine && <LineChart chartData={chartData} />}
              <MuiTable
                chartData={chartData.data}
                groupByKeyProp={selectedGroupBy}
              />
            </div>

            {showFilters && (
              <FilterSidebar
                filters={filters}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                setFilters={setFilters}
                onClose={() => setShowFilters(false)}
                groupByColumns={groupByColumns}
                applyFilters={applyFilters}
                disabled={!unsavedFilters}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CostExplorerScreen;
