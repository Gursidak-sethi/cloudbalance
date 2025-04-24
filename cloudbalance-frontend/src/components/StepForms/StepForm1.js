import React from "react";
import { Link } from "react-router-dom";
import arnImg from "../../images/ARNCopy.png";
import Input from "../Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../redux/actions/onboardActions";
import styles from "./StepForm.module.css";
import { CustomTrustPolicy } from "../../utils/Policies";
const StepForm1 = ({ handleCopy, CopyIcon }) => {
  const { accountId, accountName, arn } = useSelector((state) => state.onboard);
  const dispatch = useDispatch();

  return (
    <ol className={styles.onboardList}>
      <li className={styles.listItem}>
        Log into AWS account & <Link to="">Create an IAM Role.</Link>
      </li>
      <li className={styles.listItem}>
        In the <em>Trusted entity type </em> section, select{" "}
        <strong>Custom trust policy.</strong> Replace the prefilled policy with
        the policy provided below -
        <pre
          className={styles.onboardJsonBox}
          onClick={() => handleCopy(JSON.stringify(CustomTrustPolicy, null, 2))}
        >
          {JSON.stringify(CustomTrustPolicy, null, 2)}
          <CopyIcon />
        </pre>
      </li>
      <li className={styles.listItem}>
        Click on <strong>Next</strong> to go to the <em>Add permissions</em>{" "}
        page. We would not be adding any permissions for now because the
        permission policy content will be dependent on the AWS Account ID
        retrieved from the IAM Role. Click on <strong>Next</strong>.
      </li>
      <li className={styles.listItem}>
        <div>
          In the <em>Role name field</em>, enter the below-mentioned role name,
          and click on <strong>Create Role -</strong>
        </div>
        <div
          className={styles.onboardCopyText}
          onClick={() => handleCopy("CK-Tuner-Role-dev2")}
        >
          <CopyIcon />
          CK-Tuner-Role-dev2
        </div>
      </li>
      <li className={styles.listItem}>
        <div>Go to the newly create IAM Role and copy the Role ARN -</div>
        <img
          src={arnImg}
          alt="ARN copying"
          style={{ width: "80%", height: 380, marginTop: 10 }}
        />
      </li>
      <li className={styles.listItem}>
        <div>Paste the copied Role ARN below -</div>
        <div className={styles.onboardInputs}>
          <Input
            label={"Enter the IAM Role ARN"}
            type={"text"}
            name={"arn"}
            value={arn}
            id={"arn"}
            placeholder={"Enter copied IAM Role ARN"}
            onChange={(e) => dispatch(updateField("arn", e.target.value))}
            required={true}
            height={20}
            width={250}
            isOnboard={true}
          />
          <Input
            label={"Enter the AWS Account Name"}
            type={"text"}
            name={"accountName"}
            value={accountName}
            id={"accountName"}
            placeholder={"Enter AWS Account Name"}
            onChange={(e) =>
              dispatch(updateField("accountName", e.target.value))
            }
            required={true}
            height={20}
            width={250}
            isOnboard={true}
          />
          <Input
            label={"Enter the AWS Account Id"}
            type={"text"}
            name={"accountId"}
            value={accountId}
            id={"accountId"}
            placeholder={"Enter the AWS account id"}
            onChange={(e) => dispatch(updateField("accountId", e.target.value))}
            required={true}
            height={20}
            width={250}
            isOnboard={true}
          />
        </div>
      </li>
    </ol>
  );
};

export default StepForm1;
