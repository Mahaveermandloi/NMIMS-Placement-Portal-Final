// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminRoutes from "./Routes/AdminRoutes.jsx";
import UserRoutes from "./Routes/UserRoutes.jsx";
import { BASE_PATH } from "./Utils/URLPath.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Provide BASE_PATH to AdminRoutes as a prop */}
        <Route path={`${BASE_PATH}/*`} element={<AdminRoutes basePath={BASE_PATH} />} />
        <Route path={`/*`} element={<UserRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
