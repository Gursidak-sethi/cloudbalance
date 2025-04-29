import React from "react";

const InvalidRoute = () => {
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
      <div style={{ fontWeight: 800, fontSize: 52, color: "#f00" }}>400</div>
      <div style={{ fontWeight: 800, fontSize: 64, color: "#f00" }}>
        Invalid Route
      </div>
      <div>This path does not exists</div>
    </div>
  );
};

export default InvalidRoute;
