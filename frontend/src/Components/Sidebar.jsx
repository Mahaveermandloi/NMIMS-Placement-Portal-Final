// Sidebar.jsx
import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import logo from "../../public/images/nmimslogo.png";
import user from "../../public/images/user.png";
import { PiFactory } from "react-icons/pi";
import { CiViewList } from "react-icons/ci";
import { PiStudent } from "react-icons/pi";
import { LuListChecks } from "react-icons/lu";
import { FaUsers } from "react-icons/fa6";
import { IoIosGitBranch } from "react-icons/io";
import Dropdown from "./Dropdown";
import { BASE_PATH } from "../Utils/URLPath.jsx";
import { TokenManager } from "./TokenManager.jsx";

import { LuLayoutDashboard } from "react-icons/lu";

const drawerWidth = 240;

const Sidebar = (props) => {
  const { window, userRole } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // Define sidebar items based on user role
  const sidebarItems =
    userRole === "admin"
      ? [
          {
            icon: <LuLayoutDashboard size={25} />,
            text: "Dashboard",
            path: `${BASE_PATH}/dashboard`,
          },
          {
            icon: <FaUsers size={25} />,
            text: "Students",
            path: `${BASE_PATH}/students`,
          },
          {
            icon: <PiFactory size={25} />,
            text: "Companies",
            path: `${BASE_PATH}/companies`,
          },
          {
            icon: <CiViewList size={25} />,
            text: "Job Listings",
            path: `${BASE_PATH}/job-listings`,
          },
          {
            icon: <LuListChecks size={25} />,
            text: "Shortlisted Students",
            path: `${BASE_PATH}/shortlisted-students`,
          },
          {
            icon: <PiStudent size={25} />,
            text: "Placed Students",
            path: `${BASE_PATH}/placed-students`,
          },
          {
            icon: <IoIosGitBranch size={25} />,
            text: "Branch",
            path: `${BASE_PATH}/branch`,
          },
        ]
      : [
          {
            icon: <LuLayoutDashboard size={25} />,
            text: "Dashboard",
            path: "/dashboard",
          },
          {
            icon: <PiFactory size={25} />,
            text: "Companies",
            path: "/companies",
          },
          {
            icon: <CiViewList size={25} />,
            text: "Job Listings",
            path: "/job-listings",
          },
          {
            icon: <LuListChecks size={25} />,
            text: "Shortlisted Students",
            path: "/shortlisted-students",
          },
          {
            icon: <PiStudent size={25} />,
            text: "Placed Students",
            path: "/placed-students",
          },
          { icon: <FaUsers size={25} />, text: "Profile", path: "/profile" },
        ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {sidebarItems.map(({ text, path, icon }, index) => (
          <NavLink
            key={text}
            to={path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Box>
        <TokenManager />
      </Box>

      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "gray" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: "gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%", // Ensures full width for spacing
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{ height: 56 }} // Adjust size as needed
            />

            <Box sx={{ ml: "auto" }}>
              <Dropdown>
                <img src={user} alt="User" className="h-10" />
              </Dropdown>
            </Box>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};

Sidebar.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node, // Accept children as props
  userRole: PropTypes.string.isRequired, // Add userRole prop type
};

export default Sidebar;
