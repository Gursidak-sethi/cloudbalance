import React from "react";
import styles from "./UserList.module.css";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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

  return (
    <table className={styles.userList}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Last Login</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {!users ? (
          <tr>
            <td colSpan={6}>No Data Available</td>
          </tr>
        ) : (
          users.map((user, idx) => (
            <tr key={`${user.username}-${idx}`}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td style={{ textAlign: "center" }}>
                {formatDate(user.lastLogin)}
              </td>
              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <button
                  className={styles.userEditBtn}
                  onClick={() => handleEdit(user)}
                  disabled={currentUser.role !== "ADMIN" ? true : false}
                >
                  <EditSquareIcon fontSize="24px" />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default UserList;
