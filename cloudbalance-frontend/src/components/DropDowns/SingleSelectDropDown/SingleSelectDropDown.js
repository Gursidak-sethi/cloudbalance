import React from "react";

const SingleSelectDropDown = ({ options, value, onChange, error, disable }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="role">Role:&nbsp;</label>
      <select
        name="role"
        id="role"
        value={value}
        onChange={onChange}
        style={{ padding: "6px", width: "200px" }}
        disabled={disable}
      >
        <option value="">Select Role</option>
        {options.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      {error && <div style={{ color: "red", marginTop: "4px" }}>{error}</div>}
    </div>
  );
};

export default SingleSelectDropDown;
