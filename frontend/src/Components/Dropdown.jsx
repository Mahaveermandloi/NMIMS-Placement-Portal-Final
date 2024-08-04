import * as React from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { useNavigate , useLocation} from "react-router-dom";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ADMIN_PATH, STUDENT_PATH } from "../Utils/URLPath";

const Dropdown = (props) => {
  const { children } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleProfileClick = () => {
  //   handleClose();
  //   navigate(`${ADMIN_PATH}/profile`);
  // };

  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClick = () => {
    handleClose();

    // Check if the current path contains "/admin"
    if (location.pathname.includes(ADMIN_PATH)) {
      navigate(`${ADMIN_PATH}/profile`);
    } else {
      navigate(`${STUDENT_PATH}/profile`);
    }
  };

  const handleLogoutClick = () => {
    handleClose();

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Delete cookies
    deleteCookie("refreshToken");
    deleteCookie("accessToken");

    navigate(`${STUDENT_PATH}/login`);

    window.location.reload();
  };

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
