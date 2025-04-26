// components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import handleLogout from "../../utils/Logout";
import logo from "../../images/logo.png";
import styles from "./Navbar.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountDropDown from "../DropDowns/AccountDropDown/AccountDropDown";
import axios from "axios";
import {
  setAccount,
  setAwsAccount,
  setCaAccount,
} from "../../redux/actions/accountActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load selectedAccount from localStorage if exists
  const [selectedAwsAccount, setSelectedAwsAccount] = useState(() => {
    return (
      localStorage.getItem("selectedAwsAccountId") || currentUser.accounts?.[0]
    );
  });
  const [selectedCaAccount, setSelectedCaAccount] = useState(() => {
    return (
      localStorage.getItem("selectedCaAccountId") || currentUser.accounts?.[0]
    );
  });

  const location = useLocation();

  // First effect: fetch accounts when route changes to AWS dashboard
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        let fetchedAccounts = [];
        if (
          currentUser?.role === "ADMIN" ||
          currentUser?.role === "READ_ONLY"
        ) {
          const response = await axios.get("/admin/account");
          fetchedAccounts = response.data;
        } else if (currentUser?.role === "CUSTOMER") {
          fetchedAccounts = currentUser?.accounts || [];
        }

        setAccounts(fetchedAccounts);

        const savedAwsAccountId = localStorage.getItem("selectedAwsAccountId");
        const savedCaAccountId = localStorage.getItem("selectedCaAccountId");
        const validAwsAccount = fetchedAccounts.find(
          (acc) => acc.accountId === savedAwsAccountId
        );
        const validCaAccount = fetchedAccounts.find(
          (acc) => acc.accountId === savedCaAccountId
        );

        const newAwsSelected =
          validAwsAccount?.accountId || fetchedAccounts[0]?.accountId;
        const newCaSelected =
          validCaAccount?.accountId || fetchedAccounts[0]?.accountId;

        if (newAwsSelected) {
          setSelectedAwsAccount(newAwsSelected);
        }
        if (newCaSelected) {
          setSelectedCaAccount(newCaSelected);
        }
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (
      location.pathname === "/dashboard/aws" ||
      location.pathname === "/dashboard/cost-analysis"
    ) {
      fetchAccounts();
    }
  }, [location.pathname]);

  // Second effect: trigger when selectedAccount changes
  useEffect(() => {
    setLoading(true);

    if (selectedAwsAccount) {
      localStorage.setItem("selectedAwsAccountId", selectedAwsAccount);
      dispatch(setAwsAccount(selectedAwsAccount));
    }
    if (selectedCaAccount) {
      localStorage.setItem("selectedCaAccountId", selectedCaAccount);
      dispatch(setCaAccount(selectedCaAccount));
    }
    setLoading(false);
  }, [selectedAwsAccount, selectedCaAccount]);

  // Update selectedAccount in state and localStorage
  const handleAwsAccountChange = (newAccountId) => {
    setSelectedAwsAccount(newAccountId);
    localStorage.setItem("selectedAwsAccountId", newAccountId);
  };

  const handleCaAccountChange = (newAccountId) => {
    setSelectedCaAccount(newAccountId);
    localStorage.setItem("selectedCaAccountId", newAccountId);
  };
  return loading ? null : (
    <div className={styles.navbarContainer}>
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <img src={logo} alt="CloudBalance" className={styles.logo} />
        {(location.pathname === "/dashboard/aws" ||
          location.pathname === "/dashboard/cost-analysis") && (
          <AccountDropDown
            value={
              location.pathname === "/dashboard/aws"
                ? selectedAwsAccount
                : selectedCaAccount
            }
            accounts={accounts}
            onChange={
              location.pathname === "/dashboard/aws"
                ? handleAwsAccountChange
                : handleCaAccountChange
            }
          />
        )}
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        <div
          style={{
            display: "flex",
            color: "#253e66",
            fontWeight: 600,
            alignItems: "center",
          }}
        >
          <AccountCircleIcon style={{ fontSize: 36 }} />
          <div>
            <div>{currentUser?.username}</div>
            <div style={{ fontSize: 12 }}>{currentUser?.role}</div>
          </div>
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
