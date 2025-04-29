import React, { useCallback, useState } from "react";
import styles from "./EditUser.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import EditUserConfig from "../../configs/EditUserFormConfig";
import Input from "../Input/Input";
import SingleSelectDropDown from "../DropDowns/SingleSelectDropDown/SingleSelectDropDown";
import MultiSelectDropDown from "../DropDowns/MultiSelectDropDown/MultiSelectDropDown";
import Button from "../Button/Button";
const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedUser = location.state?.user;
  console.log("Selected State User: ", selectedUser);

  const [currentState, setCurrentState] = useState({
    username: selectedUser?.username || "",
    firstName: selectedUser?.firstName || "",
    lastName: selectedUser?.lastName || "",
    email: selectedUser?.email || "",
    role: selectedUser?.role || "",
    accounts: selectedUser?.accounts || [],
    errors: {},
  });

  console.log("Current State User: ", currentState);

  const validateField = (name, value) => {
    if (!value && name !== "accounts") return "Field cannot be empty!";
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

    // Re-validate all fields
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

    console.log("Accounts in edit: ", accounts);
    const finalAccounts =
      role === "CUSTOMER" ? accounts.map((account) => account.accountId) : null;

    const requestBody = {
      username: currentState.username,
      firstName: currentState.firstName,
      lastName: currentState.lastName,
      email: currentState.email,
      role: role,
      accounts: finalAccounts,
    };

    try {
      const response = await axios.put("/admin/user", requestBody);
      toast.success(response.data.message);
      setCurrentState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        accounts: [],
        errors: {},
      });
      navigate("/dashboard/user-management");
    } catch (e) {
      toast.error(e.response?.data?.message || "Error saving user!");
      console.error(e);
    }
  };

  return (
    <div style={{ height: "calc(100% - 50px)" }}>
      <h1 className={styles.editUserHeader}>Update User</h1>
      <div className={styles.editUserContainer}>
        <div className={styles.editUserBox}>
          <div className={styles.editUserFormContainer}>
            <form className={styles.editUserForm} onSubmit={handleSubmit}>
              {EditUserConfig.map((field) => (
                <div key={field.id}>
                  <Input
                    width={250}
                    type={field.properties.type}
                    id={field.id}
                    name={field.properties.name}
                    value={currentState[field.properties.name]}
                    placeholder={field.properties.placeholder}
                    onChange={handleChange}
                    error={currentState.errors[`${field.properties.name}Error`]}
                  />
                </div>
              ))}

              <SingleSelectDropDown
                options={["ADMIN", "READ_ONLY", "CUSTOMER"]}
                value={currentState.role}
                onChange={handleChange}
              />

              {/* Show account dropdown only for CUSTOMER */}
              {currentState.role === "CUSTOMER" && (
                <MultiSelectDropDown
                  allAccounts={handleAccounts}
                  value={currentState.accounts}
                  onChange={handleAccountChange}
                />
              )}

              <Button text={"Update"} type={"submit"} btnStyle={"editBtn"} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
