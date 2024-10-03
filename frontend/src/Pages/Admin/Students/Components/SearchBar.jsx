import React from "react";
import TextField from "@mui/material/TextField";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <TextField
      label="Search by Name, Skills, SAP, Email"
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchBar;
