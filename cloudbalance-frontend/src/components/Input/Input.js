import React from "react";
import styles from "./Input.module.css";
const Input = ({
  label,
  type,
  name,
  value,
  id,
  placeholder,
  onChange,
  height,
  width,
  required = false,
  isOnboard = false,
  styleName = "",
  inputStyle = "",
}) => {
  return (
    <div className={`${styles.inputContainer} ${styles[styleName]}`}>
      <label
        htmlFor={id}
        style={{
          fontSize: isOnboard ? 12 : 16,
          color: isOnboard ? "rgb(110, 110, 110)" : "#000",
        }}
      >
        {label}
        <span style={{ color: "#f00" }}>{required ? "*" : ""}</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        className={`${styles.inputs} ${styles[inputStyle]}`}
        style={{ height: height ? height : 40, width: width ? width : 350 }}
      />
    </div>
  );
};

export default Input;
