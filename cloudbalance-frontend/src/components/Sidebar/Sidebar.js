import React from "react";
import styles from "./Sidebar.module.css";
import { RouteMapper, IconMapper } from "../../utils/Mapper";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
const Sidebar = ({ isOpen, toggleSidebar, currentUser }) => {
  return (
    <div className={isOpen ? styles.sidebarOpen : styles.sidebarClosed}>
      <button className={styles.sidebarBtn} onClick={toggleSidebar}>
        <MenuIcon />
      </button>
      {currentUser.dashboards.map((dashboard) => (
        <NavLink
          key={dashboard.id}
          to={RouteMapper[dashboard.dashboard]}
          className={({ isActive }) =>
            isActive ? styles.dashboardLinksActive : styles.dashboardLinks
          }
          style={{ justifyContent: isOpen ? "flex-start" : "center" }}
        >
          {IconMapper[dashboard.dashboard]}
          {isOpen && dashboard.displayName}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
