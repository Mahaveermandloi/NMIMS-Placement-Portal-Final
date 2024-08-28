// // App.jsx
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import AdminRoutes from "./Routes/AdminRoutes.jsx";
// import UserRoutes from "./Routes/UserRoutes.jsx";
// import { ADMIN_PATH } from "./Utils/URLPath.jsx";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Provide ADMIN_PATH to AdminRoutes as a prop */}
//         <Route path={`${ADMIN_PATH}/*`} element={<AdminRoutes />} />
//         <Route path={`/*`} element={<UserRoutes />} /> {/* Prefix all user routes with /student */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdminTokenManager } from "./Components/AdminTokenManager";
import AdminRoutes from "./Routes/AdminRoutes";
import UserRoutes from "./Routes/UserRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
       
        <Route
          path="/nmims/admin/*"
          element={
            <>
              {/* <AdminTokenManager /> */}
              <AdminRoutes />
            </>
          }
        />

        {/* Student routes */}
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
