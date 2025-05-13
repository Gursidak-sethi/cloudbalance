import React, { useState, useCallback } from "react";
import styles from "./AddUser.module.css";
import AddUserConfig from "../../configs/AddUserFormConfig";
import Input from "../../components/Input/Input";
import SingleSelectDropDown from "../../components/DropDowns/SingleSelectDropDown/SingleSelectDropDown";
import MultiSelectDropDown from "../../components/DropDowns/MultiSelectDropDown/MultiSelectDropDown";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { displayRole, requestRole } from "../../utils/Mapper";

const AddUser = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    accounts: [],
    password: "",
    confirmPassword: "",
    errors: {},
  });

  const validateField = (name, value, compareWith = "") => {
    if (!value && name !== "accounts") return "Field cannot be empty!";
    if (name === "confirmPassword" && value !== compareWith) {
      return "Password does not match!";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value, currentState.password);

    setCurrentState((prev) => ({
      ...prev,
      [name]: value,
      errors: {
        ...prev.errors,
        [`${name}Error`]: error,
      },
    }));
  };

  const handleAccountChange = useCallback((selectedAccounts) => {
    setCurrentState((prev) => ({
      ...prev,
      accounts: selectedAccounts,
    }));
  }, []);

  const handleAccounts = async () => {
    return await axios.get("/admin/account");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Re-validate all fields except accounts
    const newErrors = {};
    let hasErrors = false;
    Object.entries(currentState).forEach(([key, value]) => {
      if (key !== "errors" && key !== "accounts") {
        const error = validateField(key, value, currentState.password);
        if (error) {
          hasErrors = true;
          newErrors[`${key}Error`] = error;
        }
      }
    });

    setCurrentState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        ...newErrors,
      },
    }));

    const isAnyFieldEmpty = Object.entries(currentState)
      .filter(([key]) => key !== "errors" && key !== "accounts")
      .some(([_, value]) => value === "");

    if (hasErrors || isAnyFieldEmpty) {
      toast.warning("Please fill the details correctly!");
      return;
    }

    const { role, accounts } = currentState;
    const finalAccounts =
      role === "CUSTOMER" ? accounts.map((account) => account.accountId) : null;

    const requestBody = {
      username: currentState.username,
      firstName: currentState.firstName,
      lastName: currentState.lastName,
      email: currentState.email,
      password: currentState.password,
      role: requestRole[currentState.role],
      accounts: finalAccounts,
    };

    try {
      const response = await axios.post("/admin/user", requestBody);
      console.log(response);
      toast.success(response.data.message);
      setCurrentState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        accounts: [],
        password: "",
        confirmPassword: "",
        errors: {},
      });
      navigate("/dashboard/user-management");
    } catch (e) {
      toast.error(e.response ? e.response.data.message : "Error saving user!");
      console.error(e.response);
    }
  };

  return (
    <div style={{ height: "calc(100% - 50px)" }}>
      <h1 className={styles.addUserHeader}>Add New User</h1>
      <div className={styles.addUserContainer}>
        <div className={styles.addUserBox}>
          <div className={styles.addUserFormContainer}>
            <form className={styles.addUserForm} onSubmit={handleSubmit}>
              {AddUserConfig.map((field) => (
                <div key={field.id}>
                  <Input
                    width={250}
                    type={field.properties.type}
                    id={field.id}
                    name={field.properties.name}
                    label={field.properties.label}
                    placeholder={field.properties.placeholder}
                    value={currentState[field.properties.name]}
                    onChange={handleChange}
                  />
                  {currentState.errors[`${field.properties.name}Error`] && (
                    <div style={{ color: "red" }}>
                      {currentState.errors[`${field.properties.name}Error`]}
                    </div>
                  )}
                </div>
              ))}
              <SingleSelectDropDown
                options={["Admin", "Read Only", "Customer"]}
                value={currentState.role}
                onChange={handleChange}
              />
              {currentState.role === displayRole["CUSTOMER"] && (
                <MultiSelectDropDown
                  allAccounts={handleAccounts}
                  value={currentState.accounts}
                  onChange={handleAccountChange}
                />
              )}
              <div style={{ gridColumn: 3, justifySelf: "flex-end" }}>
                <Button text={"Add"} type={"submit"} btnStyle={"editBtn"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
