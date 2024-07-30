import * as React from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BASE_PATH } from "../Utils/URLPath";

const Dropdown = (props) => {
  const { children } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleClose();
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    handleClose();

    // Remove accessToken from localStorage
    localStorage.removeItem("accessToken");

    // Remove refreshToken from cookies
    deleteCookie("refreshToken");

    // Navigate to the login page
    navigate(`${BASE_PATH}/login`);

    // Reload the page to clear state and session
    window.location.reload();
  };

  // Function to delete a cookie by name
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  return (
    <div>
      <IconButton onClick={handleClick} color="inherit">
        {children}
        <ExpandMoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          },
        }}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Dropdown;
