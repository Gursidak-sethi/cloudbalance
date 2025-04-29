import React, { useState } from "react";
import { LoginFormConfig } from "../../configs/FormConfig";
import Input from "../../components/Input/Input";
import axios from "axios";
import styles from "./LoginScreen.module.css";
import logo from "../../images/logo.png";
import { toast } from "react-toastify";
import { replace, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

const LoginScreen = () => {
  const [enteredData, setEnteredData] = useState({
    username: "",
    password: "",
    errors: {
      usernameError: "",
      passwordError: "",
    },
  });
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    let error = "";
    if (name === "username") {
      if (!value) {
        error = "Username cannot be empty";
      } else if (value.length < 2 || value.length > 15) {
        error = "Username must be between 2 to 15 characters";
      }
    }
    if (name === "password") {
      if (!value) {
        error = "Password cannot be empty";
      } else if (value.length < 5 || value.length > 12) {
        error = "Password must be between 5 and 12 characters";
      }
    }
    setEnteredData((prev) => ({
      ...prev,
      [name]: value,
      errors: {
        ...prev.errors,
        [`${name}Error`]: error,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = Object.values(enteredData.errors).some(
      (error) => error !== ""
    );
    const isAnyFieldEmpty = Object.keys(enteredData)
      .filter((key) => key !== "errors")
      .some((key) => enteredData[key] === "");

    if (hasErrors || isAnyFieldEmpty) {
      toast.warning("Please fill the details correctly!");
      return;
    }

    try {
      const response = await axios.post("/auth/login", {
        username: enteredData.username,
        password: enteredData.password,
      });

      const token = response.data.body.token;
      console.log(response.data, token);
      localStorage.setItem("token", token);

      navigate("/", { replace: true });
      toast.success(response.data.message);

      setEnteredData({
        username: "",
        password: "",
        errors: {
          usernameError: "",
          passwordError: "",
        },
      });
    } catch (error) {
      console.error("Login or /me failed:", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <img src={logo} alt="CloudBalance" className={styles.logo} />
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        {LoginFormConfig.map((field) => (
          <div key={field.id}>
            <Input
              type={field.properties.type}
              id={field.id}
              name={field.properties.name}
              label={field.properties.label}
              placeholder={field.properties.placeholder}
              value={enteredData[field.properties.name]}
              onChange={handleOnChange}
            />
            {enteredData.errors[`${field.properties.name}Error`] && (
              <div style={{ color: "red" }}>
                {enteredData.errors[`${field.properties.name}Error`]}
              </div>
            )}
          </div>
        ))}
        <Button text={"Login"} type={"submit"} btnStyle={"loginBtn"} />
      </form>
    </div>
  );
};

export default LoginScreen;
