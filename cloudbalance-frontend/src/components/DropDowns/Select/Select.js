import React from "react";
import styles from "./Select.module.css"; // Assuming you're using a CSS module for styles

const Select = ({ label, options, value, onChange }) => {
  return (
    <div className={styles.selectContainer}>
      {label && <label>{label}</label>}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
