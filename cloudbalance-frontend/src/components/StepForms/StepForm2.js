import React from "react";
import { Link } from "react-router-dom";
import CkTunerRole from "../../images/CkTunerRole.png";
import AddPermission from "../../images/AddPermission.png";
import AddPolicy from "../../images/AddPolicy.png";
import CreatePolicy from "../../images/CreatePolicy.png";
import styles from "./StepForm.module.css";
import {
  JsonPolicy,
  JsonPolicy2,
  JsonPolicy3,
  S3ReplicationCheckPolicy,
} from "../../utils/Policies";
const StepForm2 = ({ handleCopy }) => {
  return (
    <ol className={styles.onboardList}>
      <li className={styles.listItem}>
        Go to the <Link to={""}> Create Policy </Link> Page.
      </li>
      <li className={styles.listItem}>
        Click on the JSON tab and paste the following policy and click on Next:
        <pre
          className={styles.onboardJsonBox}
          onClick={() => handleCopy(JSON.stringify(JsonPolicy, null, 2))}
        >
          {JSON.stringify(JsonPolicy, null, 2)}
        </pre>
      </li>
      <li className={styles.listItem}>
        In the Name field, enter below-mentioned policy name and click on Create
        Policy
        <div
          className={styles.onboardCopyText}
          onClick={() => handleCopy("cktuner-CostAuditPolicy")}
        >
          cktuner-CostAuditPolicy
        </div>
      </li>
      <li className={styles.listItem}>
        Again, go to the <Link to={""}>Create Policy</Link> Page.
      </li>
      <li className={styles.listItem}>
        Click on the JSON tab and paste the following policy and click on Next:
        <pre
          className={styles.onboardJsonBox}
          onClick={() => handleCopy(JSON.stringify(JsonPolicy2, null, 2))}
        >
          {JSON.stringify(JsonPolicy2, null, 2)}
        </pre>
      </li>
      <li className={styles.listItem}>
        In the Name field, enter below-mentioned policy name and click on Create
        Policy
        <div
          className={styles.onboardCopyText}
          onClick={() => handleCopy("cktuner-SecAuditPolicy")}
        >
          cktuner-SecAuditPolicy
        </div>
      </li>
      <li className={styles.listItem}>
        Again, go to the <Link to={""}>Create Policy</Link> Page.
      </li>
      Page.
      <li className={styles.listItem}>
        Click on the JSON tab and paste the following policy and click on Next:
        <pre
          className={styles.onboardJsonBox}
          onClick={() => handleCopy(JSON.stringify(JsonPolicy3, null, 2))}
        >
          {JSON.stringify(JsonPolicy3, null, 2)}
        </pre>
      </li>
      <li className={styles.listItem}>
        In the Name field, enter below-mentioned policy name and click on Create
        Policy
        <div
          className={styles.onboardCopyText}
          onClick={() => handleCopy("cktuner-TunerReadEssentials")}
        >
          cktuner-TunerReadEssentials
        </div>
      </li>
      <li className={styles.listItem}>
        <div>Go to the CK-Tuner-Role</div>
        <img
          src={CkTunerRole}
          alt="Ck-Tuner-Role"
          style={{ width: "80%", height: 380, marginTop: 10 }}
        />
      </li>
      <li className={styles.listItem}>
        In Permission policies, click on{" "}
        <strong>Add permissions &gt; Attach Policy</strong>
        <img
          src={AddPermission}
          alt="Add Permission"
          style={{ width: "80%", height: 380, marginTop: 10 }}
        />
      </li>
      <li className={styles.listItem}>
        Filter by Type &gt; Customer managed then search for
        <strong>
          {" "}
          cktuner-CostAuditPolicy, cktuner-SecAuditPolicy,
          cktuner-TunerReadEssentials{" "}
        </strong>{" "}
        and select them.
        <img
          src={AddPolicy}
          alt="Select policies"
          style={{ width: "80%", height: 380, marginTop: 10 }}
        />
      </li>
      <li className={styles.listItem}>
        Now, click on <strong>Add permissions</strong>
      </li>
      <li className={styles.listItem}>
        In Permission policies, click on{" "}
        <strong>Add permissions &gt; Create inline policy</strong>
        <img
          src={CreatePolicy}
          alt="Create Policy"
          style={{ width: "80%", height: 380, marginTop: 10 }}
        />
      </li>
      <li className={styles.listItem}>
        Click on the JSON tab and paste the following policy
        <pre
          className={styles.onboardJsonBox}
          onClick={() =>
            handleCopy(JSON.stringify(S3ReplicationCheckPolicy, null, 2))
          }
        >
          {JSON.stringify(S3ReplicationCheckPolicy, null, 2)}
        </pre>
      </li>
      <li className={styles.listItem}>
        Now, click on <strong>Review policy</strong>
      </li>
      <li className={styles.listItem}>
        In the <strong> Name</strong> field, enter the below-mentioned policy
        name and click on
        <strong>Create Policy</strong>
        <div
          className={styles.onboardCopyText}
          onClick={() => handleCopy("S3CrossAccountReplication")}
        >
          S3CrossAccountReplication
        </div>
      </li>
    </ol>
  );
};

export default StepForm2;
