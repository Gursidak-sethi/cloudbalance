import React, { useEffect, useState } from "react";
import { ec2Table, rdsTable, asgTable } from "../../../configs/TableConfig";
import Table from "../../../components/Table/Table";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./AwsScreen.module.css";
import Button from "../../../components/Button/Button";
import SearchBar from "../../../components/SearchBar/SearchBar";

const AwsScreen = () => {
  const [selectedResource, setSelectedResource] = useState("ec2");
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedAccount = useSelector(
    (state) => state.account.selectedAccountId
  );

  const resourceTableConfig = {
    ec2: ec2Table,
    rds: rdsTable,
    asg: asgTable,
  };

  useEffect(() => {
    setLoading(true);
    const fetchResources = async () => {
      console.log("Selected account to fetch: ", selectedAccount);
      try {
        if (selectedAccount) {
          const response = await axios.get(
            `/aws/${selectedAccount}?type=${selectedResource}`
          );
          setResources(response.data);
          setFilteredResources(response.data);
        }
      } catch (e) {
        toast.error("Couldn't fetch resources");
        setResources([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [selectedResource, selectedAccount]);

  // Handle search functionality
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredResources(resources); // Reset to all resources if search term is empty
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filteredData = resources.filter((resource) => {
        // Common fields for all resource types
        const commonFields =
          resource.resourceId.toLowerCase().includes(lowercasedTerm) ||
          resource.resourceName.toLowerCase().includes(lowercasedTerm) ||
          resource.region.toLowerCase().includes(lowercasedTerm) ||
          resource.status.toLowerCase().includes(lowercasedTerm);

        // Additional fields for RDS
        if (selectedResource === "rds") {
          return (
            commonFields ||
            resource.engine.toLowerCase().includes(lowercasedTerm)
          );
        }

        // Additional fields for ASG
        if (selectedResource === "asg") {
          return (
            commonFields ||
            resource.desiredCapacity.toString().includes(lowercasedTerm) ||
            resource.minSize.toString().includes(lowercasedTerm) ||
            resource.maxSize.toString().includes(lowercasedTerm)
          );
        }

        return commonFields;
      });
      setFilteredResources(filteredData);
    }
  };

  return (
    <div className={styles.awsContainer}>
      <div style={{ marginLeft: 10 }}>
        <h1 style={{ fontSize: 24 }}>Scheduler</h1>
        <div style={{ display: "flex" }}>
          <Button
            onClick={() => setSelectedResource("ec2")}
            text={"EC2"}
            btnStyle={"resourceBtn"}
            isActive={selectedResource === "ec2"}
          />
          <Button
            onClick={() => setSelectedResource("rds")}
            text={"RDS"}
            btnStyle={"resourceBtn"}
            isActive={selectedResource === "rds"}
          />
          <Button
            onClick={() => setSelectedResource("asg")}
            text={"ASG"}
            btnStyle={"resourceBtn"}
            isActive={selectedResource === "asg"}
          />
        </div>
      </div>
      <div className={styles.awsTableContainer}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ fontSize: 18 }}>Resources</h2>
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading ? (
          "Loading..."
        ) : (
          <Table
            tableConfig={resourceTableConfig[selectedResource]}
            data={filteredResources}
          />
        )}
      </div>
    </div>
  );
};

export default AwsScreen;
