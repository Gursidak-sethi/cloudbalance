// components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import handleLogout from "../../utils/Logout";
import logo from "../../images/logo.png";
import styles from "./Navbar.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountDropDown from "../DropDowns/AccountDropDown/AccountDropDown";
import Select from "../DropDowns/Select/Select";
import axios from "axios";
import { setAccount } from "../../redux/actions/accountActions";
import { toast } from "react-toastify";
import { displayRole } from "../../utils/Mapper";
import Button from "../Button/Button";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSwitchUser, setShowSwitchUser] = useState(false);

  // Load selectedAccount from localStorage if exists
  const [selectedAccount, setSelectedAccount] = useState(() => {
    return (
      localStorage.getItem("selectedAccountId") || currentUser.accounts?.[0]
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
          fetchedAccounts = response.data.body;
        } else if (currentUser?.role === "CUSTOMER") {
          fetchedAccounts = currentUser?.accounts || [];
        }

        setAccounts(fetchedAccounts);

        const savedAccountId = localStorage.getItem("selectedAccountId");
        const validAccount = fetchedAccounts.find(
          (acc) => acc.accountId === savedAccountId
        );

        const newSelected =
          validAccount?.accountId || fetchedAccounts[0]?.accountId;

        if (newSelected) {
          setSelectedAccount(newSelected);
        }
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
        toast.error(
          error?.response?.data?.message || "Failed to fetch accounts"
        );
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

    if (selectedAccount) {
      localStorage.setItem("selectedAccountId", selectedAccount);
      dispatch(setAccount(selectedAccount));
    }
    setLoading(false);
  }, [selectedAccount]);

  // Update selectedAccount in state and localStorage
  const handleAccountChange = (newAccountId) => {
    setSelectedAccount(newAccountId);
    localStorage.setItem("selectedAccountId", newAccountId);
  };

  return loading ? null : (
    <div className={styles.navbarContainer}>
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <Link to={"/"}>
          <img src={logo} alt="CloudBalance" className={styles.logo} />
        </Link>
        {(location.pathname === "/dashboard/aws" ||
          location.pathname === "/dashboard/cost-analysis") && (
          <AccountDropDown
            value={selectedAccount}
            accounts={accounts}
            onChange={handleAccountChange}
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
          <div
            onClick={
              currentUser.role === "ADMIN"
                ? () => setShowSwitchUser(!showSwitchUser)
                : null
            }
            style={{
              cursor: currentUser.role === "ADMIN" ? "pointer" : "default",
            }}
          >
            <AccountCircleIcon style={{ fontSize: 36 }} />
          </div>
          <div>
            <div
              onClick={
                currentUser.role === "ADMIN"
                  ? () => setShowSwitchUser(!showSwitchUser)
                  : null
              }
              style={{
                cursor: currentUser.role === "ADMIN" ? "pointer" : "default",
              }}
            >
              <div>{currentUser?.username}</div>
              <div style={{ fontSize: 12 }}>
                {!showSwitchUser && displayRole[currentUser?.role]}
              </div>
            </div>
            {showSwitchUser && (
              <div
                style={{
                  backgroundColor: "#fff",
                  height: 50,
                  width: 100,
                  position: "absolute",
                  marginTop: "6px",
                  borderRadius: 4,
                  boxShadow: "0 0 4px 4px rgb(0, 0, 0,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                {displayRole[currentUser?.role]}
                <Button
                  type={"button"}
                  text={"Switch User"}
                  btnStyle={"switchBtn"}
                />
              </div>
            )}
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
