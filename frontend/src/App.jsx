// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "./Components/Sidebar.jsx";
import AdminRoutes from "./Routes/AdminRoutes.jsx";
import UserRoutes from "./Routes/UserRoutes.jsx";
import { BASE_PATH } from "./Utils/URLPath.jsx";
import UserLogin from "./Auth/UserLogin.jsx";
import AdminLogin from "./Auth/AdminLogin.jsx"

const App = () => {
  const userRole = "admin"; // This should be determined dynamically, e.g., from authentication context

  return (
    <Router>
      {/* <ResponsiveDrawer userRole={userRole}> */}
        <Routes>
          {/* {userRole === "admin" ? ( */}
            {/* <Route path={`${BASE_PATH}/*`} element={<AdminRoutes />} /> */}
            <Route path={`${BASE_PATH}/login`} element={<AdminLogin />} />
            <Route path={`/login`} element={<UserLogin />} />
            {/* <Route path={`/login`} element={<Login />} /> */}
         
        
        </Routes>
      {/* </ResponsiveDrawer> */}
    </Router>
  );
};

export default App;
