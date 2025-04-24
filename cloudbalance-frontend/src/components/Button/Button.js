import React from "react";
import styles from "./Button.module.css";
const Button = ({
  type = "button",
  onClick,
  text,
  btnStyle = "btnPrimary",
  isActive = false,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${type === "submit" ? styles.submitBtn : styles.primaryBtn} ${
        styles[btnStyle]
      } ${isActive ? styles.btnActive : ""}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
