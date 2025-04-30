import React from "react";
import styles from "./UserList.module.css";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userManagementTable } from "../../configs/TableConfig";
import Table from "../Table/Table";
import { displayRole } from "../../utils/Mapper";
const UserList = ({ users }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const formatDate = (responseDate) => {
    if (!responseDate) return "-";

    const date = new Date(responseDate);
    console.log("Users passed to table: ", users);

    const options = {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleString("en-IN", options);
  };

  const handleEdit = (user) => {
    navigate("update", { state: { user } });
  };

  const data = users?.map((user) => ({
    ...user,
    role: displayRole[user.role],
    lastLoginFormatted: formatDate(user.lastLogin),
    actions: (
      <button
        className={styles.userEditBtn}
        onClick={() => handleEdit(user)}
        disabled={currentUser.role !== "ADMIN"}
      >
        <EditSquareIcon fontSize="24px" />
      </button>
    ),
  }));

  return <Table tableConfig={userManagementTable} data={data} />;
};

export default UserList;
