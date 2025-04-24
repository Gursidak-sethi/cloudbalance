import React from "react";
import SingleSelectDropDown from "../DropDowns/SingleSelectDropDown/SingleSelectDropDown";
import MultiSelectDropDown from "../DropDowns/MultiSelectDropDown/MultiSelectDropDown";
import Input from "../Input/Input";

const FormBuilder = ({ config, onChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };
  return (
    <form onSubmit={handleSubmit}>
      {config?.map((field) => {
        if (field.properties.type === "single-select")
          return <SingleSelectDropDown />;
        else if (field.properties.type === "multi-select")
          return <MultiSelectDropDown />;
        else return <Input />;
      })}
    </form>
  );
};

export default FormBuilder;
