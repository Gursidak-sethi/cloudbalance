import React from "react";

const AccountDropDown = ({ value, onChange, accounts }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ height: 30, width: 220 }}
    >
      {accounts.map((account) => {
        return (
          <option key={account.accountId} value={account.accountId}>
            {`${account.accountName} (${account.accountId})`}
          </option>
        );
      })}
    </select>
  );
};

export default AccountDropDown;
