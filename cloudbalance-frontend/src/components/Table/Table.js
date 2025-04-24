import React from "react";
import styles from "./Table.module.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";
const Table = ({ tableConfig, data }) => {
  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard!"))
      .catch((err) => console.error("Copy failed:", err));
  };
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          {tableConfig.map((col) => (
            <th key={col.field} className={styles.th}>
              {col.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data?.length === 0 ? (
          <tr className={styles.tr}>
            <td colSpan={tableConfig.length} className={styles.td}>
              No data found
            </td>
          </tr>
        ) : (
          data?.map((item, index) => (
            <tr key={index} className={styles.tr}>
              {tableConfig.map((col) => (
                <td
                  key={col.field}
                  className={styles.td}
                  onClick={
                    col.field === "resourceId"
                      ? () => handleCopy(item[col.field])
                      : undefined
                  }
                  style={{
                    color: col.field === "resourceId" ? "#325489" : "#000",
                    cursor: col.field === "resourceId" ? "copy" : "default",
                  }}
                  title={item[col.field]}
                >
                  {col.field === "resourceId" && (
                    <ContentCopyIcon
                      style={{ fontSize: 18, verticalAlign: "middle" }}
                    />
                  )}
                  {col.field === "actions" ? item[col.field] : item[col.field]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
