import React, { useEffect, useState, useCallback } from "react";
import styles from "./CostExplorerScreen.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import ColumnChart from "../../../components/Charts/ColumnChart";
import LineChart from "../../../components/Charts/LineChart";
import GroupBy from "../../../components/GroupBy/GroupBy";
import FilterSidebar from "../../../components/FilterSidebar/FilterSidebar";
import DateSelector from "../../../components/DateSelector/DateSelector";
import MuiTable from "../../../components/Table/MuiTable";
import FilterListIcon from "@mui/icons-material/FilterList";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import { toast } from "react-toastify";
import Button from "../../../components/Button/Button";

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
  // const [startYear, setStartYear] = useState();
  // const [endYear, setEndYear] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const selectedAccount = useSelector(
    (state) => state.account.selectedAccountId
  );

  useEffect(() => {
    setLoading(true);
    const fetchGroupByColumns = async () => {
      try {
        const response = await axios.get("/cost-analysis/groups");
        const columns = response.data.body.map((item) => ({
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
        toast.error(
          error?.response?.data?.message || "failed to fetch columns"
        );
        console.error("Failed to fetch group by columns", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupByColumns();

    const now = new Date();
    const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");
    const currentYear = now.getFullYear().toString();
    setStartDate(`${currentYear}-${currentMonth}`);
    setEndDate(`${currentYear}-${currentMonth}`);
  }, []);

  const createRequestBody = () => ({
    accountId: selectedAccount,
    groupBy: selectedGroupBy,
    filters: selectedFilters,
    startDate: startDate,
    endDate: endDate,
  });

  const applyFilters = useCallback(() => {
    setUnsavedFilters(false);
    const requestBody = createRequestBody();
    fetchData(requestBody);
  }, [selectedFilters, selectedAccount, selectedGroupBy, startDate, endDate]);

  const fetchData = useCallback(async (requestBody) => {
    try {
      setLoading(true);
      const response = await axios.post("/cost-analysis/cost", requestBody);
      setChartData(response.data.body);
    } catch (error) {
      setChartData([]); // Clear old data
      toast.error(error?.response?.data?.message || "Failed to fetch data");
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedAccount || !selectedGroupBy) return;
    const requestBody = createRequestBody();
    fetchData(requestBody);
  }, [selectedAccount, selectedGroupBy, startDate, endDate, fetchData]);

  useEffect(() => {
    setUnsavedFilters(true);
  }, [selectedFilters]);

  // const handleChartDisplay = (value) => {
  //   setChartType(value);
  //   setIsChartVisible({
  //     isColumn: value === "Column" || value === "Both",
  //     isLine: value === "Line" || value === "Both",
  //   });
  // };

  return (
    <div className={styles.caContainer}>
      <div style={{ marginLeft: 10 }}>
        <h1 style={{ fontSize: 24 }}>Cost Analysis</h1>
        <div style={{ fontSize: 14, color: "#515151" }}>
          How to always be aware of cost and history.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div>Group By: </div>
          <GroupBy
            groupByColumns={groupByColumns}
            onSelect={(value) => {
              setSelectedGroupBy(value);
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
                  {/* <Select
                    label={"Chart Type: "}
                    options={["Column", "Line", "Both"]}
                    value={chartType}
                    onChange={handleChartDisplay}
                  /> */}
                  <Button
                    type={"button"}
                    text={<BarChartIcon />}
                    isActive={isChartVisible.isColumn}
                    onClick={() =>
                      setIsChartVisible((prev) => ({
                        ...prev,
                        isColumn: !isChartVisible.isColumn,
                      }))
                    }
                  />
                  <Button
                    type={"button"}
                    text={<TimelineIcon />}
                    isActive={isChartVisible.isColumn}
                    onClick={() =>
                      setIsChartVisible((prev) => ({
                        ...prev,
                        isLine: !isChartVisible.isLine,
                      }))
                    }
                  />
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <DateSelector
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                  />
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    style={{
                      width: 35,
                      height: 30,
                      backgroundColor: "#4398D7",
                      border: "none",
                      borderRadius: 4,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FilterListIcon style={{ color: "#fff" }} />
                  </button>
                </div>
              </div>
              {isChartVisible.isColumn && (
                <ColumnChart chartData={chartData} groupKey={selectedGroupBy} />
              )}
              {isChartVisible.isLine && <LineChart chartData={chartData} />}
              <MuiTable
                chartData={chartData}
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
