import React, { useEffect, useState } from "react";
import styles from "./Management.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import UserList from "../../../components/UserList/UserList";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ManagementScreen = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const currentUser = useSelector((state) => {
    return state.auth.currentUser;
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (
          currentUser?.role === "ADMIN" ||
          currentUser?.role === "READ_ONLY"
        ) {
          const response = await axios.get("/admin/user");
          console.log("response: ", response.data);
          setUsers(response.data);
        }
      } catch (e) {
        console.log("User fetching api failed: ", e);
        toast.error("Couldn't fetch user!");
      }
    };
    if (currentUser) {
      fetchUsers();
    }
  }, []);

  const handleAddUser = () => {
    navigate("create");
  };
  return (
    <div style={{ height: "calc(100% - 50px)" }}>
      <h1 className={styles.managementHeader}>Users</h1>
      <div className={styles.userContainer}>
        <div className={styles.userBox}>
          <div>
            <button
              className={styles.addUserBtn}
              onClick={handleAddUser}
              style={{
                display: currentUser.role !== "ADMIN" ? "none" : "block",
              }}
            >
              + Add New User
            </button>
            <UserList users={users} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementScreen;
