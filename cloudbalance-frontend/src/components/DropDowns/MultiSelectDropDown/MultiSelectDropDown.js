import React, { useState, useEffect } from "react";
import styles from "./MultiSelectDropDown.module.css";

const MultiSelectDropDown = ({ allAccounts, value = [], onChange }) => {
  const [assigned, setAssigned] = useState(value);
  const [orphaned, setOrphaned] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedOrphaned, setSelectedOrphaned] = useState([]);
  const [selectedAssigned, setSelectedAssigned] = useState([]);

  console.log("Assigned Accounts: ", assigned);

  // Fetch accounts on mount
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await allAccounts();
        const accounts = response.data;

        // Filter out any that are already assigned (based on accountId)
        const orphanedAccounts = accounts.filter(
          (acc) => !assigned.find((a) => a.accountId === acc.accountId)
        );
        setOrphaned(orphanedAccounts);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };

    fetchAccounts();
  }, []);

  const assignSelected = () => {
    const newlyAssigned = orphaned.filter((acc) =>
      selectedOrphaned.includes(acc.accountId)
    );
    setAssigned((prev) => [...prev, ...newlyAssigned]);
    setOrphaned((prev) =>
      prev.filter((acc) => !selectedOrphaned.includes(acc.accountId))
    );
    setSelectedOrphaned([]);
  };

  const unassignSelected = () => {
    const toOrphaned = assigned.filter((acc) =>
      selectedAssigned.includes(acc.accountId)
    );
    setOrphaned((prev) => [...prev, ...toOrphaned]);
    setAssigned((prev) =>
      prev.filter((acc) => !selectedAssigned.includes(acc.accountId))
    );
    setSelectedAssigned([]);
  };

  const toggleSelection = (accountId, selectedList, setSelectedList) => {
    if (selectedList.includes(accountId)) {
      setSelectedList(selectedList.filter((item) => item !== accountId));
    } else {
      setSelectedList([...selectedList, accountId]);
    }
  };

  // Notify parent when assigned changes
  useEffect(() => {
    onChange(assigned);
  }, [assigned]);

  return (
    <div className={styles.dropdownContainer}>
      <button
        type="button"
        className={styles.dropdownToggle}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Assign Accounts ▾
      </button>

      {showDropdown && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dualList}>
            <div>
              <h4>Orphaned</h4>
              {orphaned.map((acc) => (
                <label key={acc.accountId} className={styles.itemRow}>
                  <input
                    type="checkbox"
                    checked={selectedOrphaned.includes(acc.accountId)}
                    onChange={() =>
                      toggleSelection(
                        acc.accountId,
                        selectedOrphaned,
                        setSelectedOrphaned
                      )
                    }
                  />
                  {acc.accountName}
                </label>
              ))}
              <button
                type="button"
                onClick={assignSelected}
                disabled={selectedOrphaned.length === 0}
              >
                Assign →
              </button>
            </div>

            <div>
              <h4>Assigned</h4>
              {assigned.map((acc) => (
                <label key={acc.accountId} className={styles.itemRow}>
                  <input
                    type="checkbox"
                    checked={selectedAssigned.includes(acc.accountId)}
                    onChange={() =>
                      toggleSelection(
                        acc.accountId,
                        selectedAssigned,
                        setSelectedAssigned
                      )
                    }
                  />
                  {acc.accountName}
                </label>
              ))}
              <button
                type="button"
                onClick={unassignSelected}
                disabled={selectedAssigned.length === 0}
              >
                ← Unassign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropDown;
