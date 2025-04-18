import React from "react";
import ThankyouLogo from "../images/green_tick_check.svg";
import { Link } from "react-router-dom";
const Thankyou = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 160px)",
      }}
    >
      <img src={ThankyouLogo} alt="Thank You" />
      <div>
        <h2>Thank You for your CUR Access!</h2>
        <div>
          If you additional accounts to onboard, please click on{" "}
          <Link to="/dashboard/onboarding">Onboard</Link> to proceed.
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
