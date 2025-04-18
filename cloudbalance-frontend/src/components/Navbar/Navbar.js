// components/Navbar.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import handleLogout from "../../utils/Logout";
import logo from "../../images/logo.png";
import styles from "./Navbar.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <div className={styles.navbarContainer}>
      <img src={logo} alt="CloudBalance" className={styles.logo} />
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ display: "flex", color: "#253e66", fontWeight: 600 }}>
          <AccountCircleIcon style={{ fontSize: 36 }} />
          <div>
            <div>Welcome</div>
            {currentUser.username}
          </div>
          <div></div>
        </div>
        <button
          onClick={() => handleLogout(dispatch, navigate)}
          className={styles.logoutBtn}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
