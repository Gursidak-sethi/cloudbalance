import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./OnboardingScreen.module.css";
import StepForm1 from "../../../components/StepForms/StepForm1";
import StepForm2 from "../../../components/StepForms/StepForm2";
import StepForm3 from "../../../components/StepForms/StepForm3";
import { resetForm } from "../../../redux/onboardActions";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const OnboardingScreen = () => {
  const topRef = useRef();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const onboardData = useSelector((state) => state.onboard);
  const isBtnDisabled =
    onboardData.accountName && onboardData.accountId && onboardData.arn
      ? false
      : true;

  const textRef = useRef();
  const handleCopy = () => {
    const text = textRef.current.innerText;
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard!"))
      .catch((err) => console.error("Copy failed:", err));
  };
  const steps = [
    {
      title: "Create an IAM Role",
      subTitle: "Create an IAM Role by following these steps",
      component: (
        <StepForm1
          textRef={textRef}
          handleCopy={handleCopy}
          CopyIcon={ContentCopyIcon}
        />
      ),
    },
    {
      title: "Add Customer Managed Policies",
      subTitle: "Create an Inline policy for the role by following these steps",
      component: (
        <StepForm2
          textRef={textRef}
          handleCopy={handleCopy}
          CopyIcon={ContentCopyIcon}
        />
      ),
    },
    {
      title: "Create Cost & Usage Report",
      subTitle: "Create Cost & Usage Report by following these steps",
      component: (
        <StepForm3
          textRef={textRef}
          handleCopy={handleCopy}
          CopyIcon={ContentCopyIcon}
        />
      ),
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timeout);
  }, [step]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting onboarding data:", onboardData);
    // You can now POST onboardData to your API here.
    try {
      const response = await axios.post("/admin/account", onboardData);
      toast.success(response.data);
      navigate("/dashboard/thankyou");
    } catch (e) {
      console.error("Error saving account: ", e.message);
      toast.error("Couldn't save account! Retry");
    }
    dispatch(resetForm());
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 20,
      }}
      ref={topRef}
    >
      <h1>{steps[step].title}</h1>
      <h2
        style={{
          fontSize: 16,
          fontWeight: 400,
          color: "#515151",
          margin: "10px 0px",
        }}
      >
        {steps[step].subTitle}
      </h2>
      <form onSubmit={handleSubmit} className={styles.onboardingFormContainer}>
        {steps[step].component}

        <div
          style={{
            marginTop: "20px",
            alignSelf: "flex-end",
            display: "flex",
            gap: 10,
          }}
        >
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className={styles.backBtn}
            >
              Back {step - 1 >= 0 ? `- ${steps[step - 1].title}` : ""}
            </button>
          )}

          {step < steps.length - 1 && (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={isBtnDisabled}
              className={
                isBtnDisabled ? styles.onboardBtnDisabled : styles.onboardBtn
              }
            >
              Next {step + 1 < steps.length ? `- ${steps[step + 1].title}` : ""}
            </button>
          )}

          {step === steps.length - 1 && (
            <button type="submit" className={styles.onboardBtn}>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default OnboardingScreen;
