import React, { useState } from "react";
import "./styles/SearchContainer.css";

function SearchContainer({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button type="submit" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchContainer;
