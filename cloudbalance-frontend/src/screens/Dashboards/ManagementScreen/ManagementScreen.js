// src/screens/Management/ManagementScreen.js

import React, { useEffect, useState } from "react";
import styles from "./Management.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import UserList from "../../../components/UserList/UserList";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../../../components/SearchBar/SearchBar";

const ManagementScreen = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // State to store filtered users
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (
          currentUser?.role === "ADMIN" ||
          currentUser?.role === "READ_ONLY"
        ) {
          const response = await axios.get("/admin/user");
          console.log("response: ", response.data.body);
          setUsers(response.data.body);
          setFilteredUsers(response.data.body); // Initially set all users as filtered
        }
      } catch (e) {
        console.log("User fetching api failed: ", e);
        toast.error(e.response?.data?.message);
      }
    };
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleAddUser = () => {
    navigate("create");
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredUsers(users); // Reset to all users if search term is empty
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filteredData = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(lowercasedTerm) ||
          user.lastName.toLowerCase().includes(lowercasedTerm) ||
          user.email.toLowerCase().includes(lowercasedTerm) ||
          user.role.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredUsers(filteredData);
    }
  };

  return (
    <div>
      <h1 className={styles.managementHeader}>Users</h1>
      <div className={styles.userContainer}>
        <div className={styles.userBox}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              className={styles.addUserBtn}
              onClick={handleAddUser}
              style={{
                display: currentUser.role !== "ADMIN" ? "none" : "block",
              }}
            >
              + Add New User
            </button>
            <SearchBar onSearch={handleSearch} />{" "}
          </div>
          <UserList users={filteredUsers} />{" "}
          {/* Pass filtered users to the UserList */}
        </div>
      </div>
    </div>
  );
};

export default ManagementScreen;
