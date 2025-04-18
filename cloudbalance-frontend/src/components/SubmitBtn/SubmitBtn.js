import React from "react";
import styles from "./SubmitBtn.module.css";
const SubmitBtn = ({ text, height, width, align }) => {
  return (
    <button
      type="submit"
      className={styles.submitBtn}
      style={{
        height: height ? height : 40,
        width: width ? width : 350,
        alignSelf: align ? align : "flex-start",
      }}
    >
      {text}
    </button>
  );
};

export default SubmitBtn;
