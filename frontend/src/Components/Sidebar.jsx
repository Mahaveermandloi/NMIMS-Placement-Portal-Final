import React, { useEffect, useState } from "react";
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
import Collapse from "@mui/material/Collapse";
import { NavLink, useNavigate } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import logo from "../../public/images/nmimslogo.png";
import userImage from "../../public/images/user.png";
import { PiFactory } from "react-icons/pi";
import { CiViewList } from "react-icons/ci";
import { PiStudent } from "react-icons/pi";
import { LuListChecks } from "react-icons/lu";
import { FaUsers } from "react-icons/fa6";
import { IoIosGitBranch } from "react-icons/io";
import Dropdown from "./Dropdown";
import { ADMIN_PATH, SERVER_URL, STUDENT_PATH } from "../Utils/URLPath.jsx";
import { AdminTokenManager } from "./AdminTokenManager.jsx";
import { StudentTokenManager } from "./StudentTokenManager.jsx";
import { LuLayoutDashboard } from "react-icons/lu";
import { getApi } from "../Utils/API.js";
import { GrAnnounce } from "react-icons/gr";
import { VscBellDot } from "react-icons/vsc";
import BellIcon from "./BellIcon.jsx";

const drawerWidth = 240;

const Sidebar = (props) => {
  const { window, userRole } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false); // State for controlling the student dropdown
  const [profileImage, setProfileImage] = useState("");

  const [announcements, setAnnouncements] = useState(false);
  const [announcementCount, setAnnouncementsCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      if (userRole === "student") {
        try {
          const response = await getApi("/api/student/get-profile-image");
          setProfileImage(response.data.student_profile_image); // Use default if no image
          localStorage.setItem("SAPID", response.data.student_sap_no);
        } catch (error) {
          setProfileImage(userImage); // Set default on error
        }
      } else {
        setProfileImage(userImage);
      }
    };

    const getAnnouncements = async () => {
      if (userRole === "student") {
        const SAPID = localStorage.getItem("SAPID");
        try {
          const response = await getApi("/api/announcement");

          if (response.statusCode === 200) {
            const filteredAnnouncements = response.data.filter(
              (announcement) => {
                return !announcement.status.includes(SAPID);
              }
            );

            if (filteredAnnouncements.length > 0) {
              setAnnouncements(true);

              setAnnouncementsCount(filteredAnnouncements.length);
            } else {
              setAnnouncements(false);
              setAnnouncementsCount(0); // Reset count if no announcements
            }
          }
        } catch (error) {
          console.error("Error fetching announcements:", error);
        }
      }
    };

    getProfile();
    getAnnouncements();
  }, [userRole]);

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

  // Toggle the student dropdown
  const handleStudentClick = () => {
    setStudentOpen(!studentOpen);
  };

  // Define sidebar items based on user role
  const sidebarItems =
    userRole === "admin"
      ? [
          {
            icon: <LuLayoutDashboard size={25} />,
            text: "Dashboard",
            path: `${ADMIN_PATH}/dashboard`,
          },
          {
            icon: <FaUsers size={25} />,
            text: "Students",
            path: `${ADMIN_PATH}/student-request`,
            isDropdown: true, // Flag to indicate this item has a dropdown
            subItems: [
              {
                text: "Student Request",
                path: `${ADMIN_PATH}/student-request`,
              },
              {
                text: "Student Details",
                path: `${ADMIN_PATH}/student-details`,
              },
              {
                text: "Upload Student Data",
                path: `${ADMIN_PATH}/upload-student-details`,
              },
            ],
          },
          {
            icon: <PiFactory size={25} />,
            text: "Companies",
            path: `${ADMIN_PATH}/companies`,
          },
          {
            icon: <GrAnnounce size={25} />,
            text: "Announcements",
            path: `${ADMIN_PATH}/announcements`,
          },

          {
            icon: <CiViewList size={25} />,
            text: "Job Profiles",
            path: `${ADMIN_PATH}/job-listings`,
          },
          {
            icon: <LuListChecks size={25} />,
            text: "Shortlisted Students",
            path: `${ADMIN_PATH}/shortlisted-students`,
          },
          {
            icon: <PiStudent size={25} />,
            text: "Placed Students",
            path: `${ADMIN_PATH}/placed-students`,
          },
          {
            icon: <IoIosGitBranch size={25} />,
            text: "Branch",
            path: `${ADMIN_PATH}/branch`,
          },
        ]
      : [
          {
            icon: <LuLayoutDashboard size={25} />,
            text: "Dashboard",
            path: `${STUDENT_PATH}/dashboard`,
          },
          {
            icon: <PiFactory size={25} />,
            text: "Companies",
            path: `${STUDENT_PATH}/companies`,
          },
          {
            icon: <CiViewList size={25} />,
            text: "Job Listings",
            path: `${STUDENT_PATH}/job-listings`,
          },
          {
            icon: <LuListChecks size={25} />,
            text: "Shortlisted Students",
            path: `${STUDENT_PATH}/shortlisted-students`,
          },
          {
            icon: <PiStudent size={25} />,
            text: "Placed Students",
            path: `${STUDENT_PATH}/placed-students`,
          },
        ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {sidebarItems.map(
          ({ text, path, icon, isDropdown, subItems }, index) => (
            <div key={text}>
              {!isDropdown ? (
                <NavLink
                  to={path}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "red" : "inherit",
                    backgroundColor: isActive ? "red" : "inherit",
                  })}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon
                        sx={{
                          color: "inherit", // Removed isActive usage here
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              ) : (
                <div>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleStudentClick}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={text} />
                      {studentOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </ListItem>
                  <Collapse in={studentOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {subItems.map(({ text, path }) => (
                        <NavLink
                          key={text}
                          to={path}
                          style={({ isActive }) => ({
                            textDecoration: "none",
                            color: isActive ? "red" : "inherit",
                            backgroundColor: isActive ? "red" : "inherit",
                          })}
                        >
                          <ListItem disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemText primary={text} />
                            </ListItemButton>
                          </ListItem>
                        </NavLink>
                      ))}
                    </List>
                  </Collapse>
                </div>
              )}
            </div>
          )
        )}
      </List>

      {userRole === "admin" ? (
        <Box>
          <AdminTokenManager />
        </Box>
      ) : userRole === "student" ? (
        <Box>
          <StudentTokenManager />
        </Box>
      ) : null}

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
              sx={{
                height: "50px",
                width: "auto",
                objectFit: "contain",
              }}
            />
            <Box
              sx={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              {userRole === "student" ? (
                <>
                  <BellIcon announcementCount={announcementCount} />
                </>
              ) : (
                <></>
              )}

              <div>
                {userRole === "student" ? (
                  <>
                    <img
                      src={`${profileImage}`}
                      className="h-10 w-10 rounded-full"
                      alt=""
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={userImage}
                      className="h-10 w-10 rounded-full"
                      alt=""
                    />
                  </>
                )}
              </div>

              <Dropdown profileImage={profileImage} userRole={userRole} />
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
          onClose={handleDrawerToggle}
          onClick={handleDrawerClose}
          onTransitionEnd={handleDrawerTransitionEnd}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
  userRole: PropTypes.string.isRequired, // userRole is required now
};

export default Sidebar;
