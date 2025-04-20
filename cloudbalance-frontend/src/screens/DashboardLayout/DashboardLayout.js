import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import styles from "./DashboardLayout.module.css";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const user = useSelector((state) => state.auth.currentUser);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const renderSidebar = () => {
    if (!user) return false;
    return true;
  };

  return (
    <div className={styles.homepage}>
      {renderSidebar() ? (
        <Sidebar
          isOpen={isOpen}
          currentUser={user}
          toggleSidebar={toggleSidebar}
        />
      ) : null}
      <div
        className={styles.dashboardContainer}
        style={{ marginLeft: isOpen ? "15%" : "5%" }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
