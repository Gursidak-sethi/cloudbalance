import React from "react";
import { Link } from "react-router-dom";
import ReportDetails from "../../images/ReportDetails.png";
import ConfigureS3Buckets from "../../images/ConfigureS3Buckets.png";
import ReportDeliver from "../../images/ReportDeliver.png";
import styles from "./StepForm.module.css";
const StepForm3 = ({ handleCopy }) => {
  return (
    <ol className={styles.onboardList}>
      <li className={styles.listItem}>
        Go to <Link to={""}>Cost and Usage Reports</Link> in the Billing
        Dashboard and click on <strong>Create report</strong>.
      </li>
      <li
        className={styles.listItem}
        style={{ display: "flex", flexDirection: "column", gap: 15 }}
      >
        Name the report as shown below and select the{" "}
        <strong>Include resource IDs </strong>
        checkbox -
        <div
          className={styles.onboardCopyText}
          onClick={() => handleCopy("ck-tuner-275595855473-hourly-cur")}
        >
          ck-tuner-275595855473-hourly-cur
        </div>
        <div>
          <div style={{ color: "#777" }}>
            Ensure that the following configuration is checked
          </div>
          <input
            type="checkbox"
            checked
            disabled
            style={{ verticalAlign: "middle", margin: "0px 10px" }}
          />
          <label style={{ fontWeight: 600, fontSize: 14 }}>
            Include Resource IDs
          </label>
        </div>
        <div>
          Click on <strong>Next</strong>
        </div>
        <img
          src={ReportDetails}
          alt="Report details"
          style={{ width: "80%" }}
        />
      </li>
      <li
        className={styles.listItem}
        style={{ display: "flex", flexDirection: "column", gap: 15 }}
      >
        <div>
          In <em>Configure S3 Bucket</em>, provide the name of the S3 bucket
          that was created -
        </div>
        <div>
          <div style={{ color: "#777" }}>
            Ensure that the following configuration is checked
          </div>
          <input
            type="checkbox"
            checked
            disabled
            style={{ verticalAlign: "middle", margin: "0px 10px" }}
          />
          <label style={{ fontWeight: 600, fontSize: 14 }}>
            The following default policy will be applied to your bucket
          </label>
        </div>
        <div>Click on save.</div>
        <div>
          <img src={ConfigureS3Buckets} alt="Configure S3 buckets" />
        </div>
      </li>
      <li
        className={styles.listItem}
        style={{ display: "flex", flexDirection: "column", gap: 15 }}
      >
        In the <em>Delivery options</em> section, enter the below-mentioned
        Report path prefix -
        <div>
          <span style={{ color: "#777", fontSize: 14 }}>
            Report path prefix:
          </span>
          <div
            className={styles.onboardCopyText}
            onClick={() => handleCopy("275595855473")}
          >
            275595855473
          </div>
        </div>
        <div>
          <div style={{ color: "#777", fontSize: 14 }}>
            Additionally, ensure that the following checks are in place
          </div>
          <div style={{ color: "#777", fontSize: 14, margin: "10px 0" }}>
            Time granularity:
          </div>
          <input
            type="radio"
            disabled
            checked
            style={{ marginRight: 10, verticalAlign: "middle" }}
          />
          <label>Hourly</label>
        </div>
        <div>
          <div style={{ color: "#777", fontSize: 14 }}>
            Please make sure these checks are{" "}
            <strong>Enabled in Enable report data integration for:</strong>
          </div>
          <input
            type="checkbox"
            disabled
            checked
            style={{ margin: "0 15px", verticalAlign: "middle" }}
          />
          <label style={{ fontWeight: 600 }}>Amazon Athena</label>
        </div>
        <img
          src={ReportDeliver}
          alt="Report Deliver Options"
          style={{ width: "80%" }}
        />
      </li>
      <li className={styles.listItem}>
        Click on <strong>Next</strong>. Now, review the configuration of the
        Cost and Usage Report. Once satisfied, click on{" "}
        <strong>Create Report</strong>.
      </li>
    </ol>
  );
};

export default StepForm3;
