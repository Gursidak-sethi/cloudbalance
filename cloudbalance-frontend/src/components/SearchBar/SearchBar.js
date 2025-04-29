import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import Input from "../Input/Input";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className={styles.searchBarContainer}>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
        className={styles.searchInput}
        height={20}
        width={200}
      />
    </div>
  );
};

export default SearchBar;
