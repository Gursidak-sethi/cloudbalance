import React from "react";

const Unauthorized = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 52, color: "#f00" }}>401</div>
      <div>
        You are <span style={{ color: "#f00" }}>Not Authorized</span>
      </div>
    </div>
  );
};

export default Unauthorized;
