// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { getApi } from "../Utils/API";
// import { BASE_API_URL, BASE_PATH } from "../Utils/URLPath";

// const TokenManager = () => {
//   const [timeLeft, setTimeLeft] = useState({ accessToken: 0, refreshToken: 0 });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkTokens = async () => {
//       const accessToken = localStorage.getItem("accessToken");
//       const refreshToken = document.cookie
//         .split("; ")
//         .find((row) => row.startsWith("refreshToken="))
//         ?.split("=")[1];

//       if (accessToken) {
//         const accessExpiry = calculateExpiry(accessToken);
//         setTimeLeft((prevTime) => ({ ...prevTime, accessToken: accessExpiry }));
//       }

//       if (refreshToken) {
//         const refreshExpiry = calculateExpiry(refreshToken);
//         setTimeLeft((prevTime) => ({
//           ...prevTime,
//           refreshToken: refreshExpiry,
//         }));
//       }

//       // Set up timer for countdown
//       const timer = setInterval(async () => {
//         setTimeLeft((prevTime) => {
//           const accessTokenTimeLeft = Math.max(prevTime.accessToken - 1000, 0);
//           const refreshTokenTimeLeft = Math.max(
//             prevTime.refreshToken - 1000,
//             0
//           );

//           if (accessTokenTimeLeft <= 0) {
//             if (refreshTokenTimeLeft > 0) {
//               // Attempt to refresh the access token
//               refreshAccessToken();
//             } else {
//               removeTokensAndRedirect();
//             }
//           }

//           if (refreshTokenTimeLeft <= 0) {
//             removeTokensAndRedirect();
//           }

//           return {
//             accessToken: accessTokenTimeLeft,
//             refreshToken: refreshTokenTimeLeft,
//           };
//         });
//       }, 1000);

//       return () => clearInterval(timer);
//     };

//     checkTokens();
//   }, []);

//   const calculateExpiry = (token) => {
//     const decoded = jwtDecode(token);
//     return decoded.exp * 1000 - Date.now(); // Convert to milliseconds
//   };

//   const formatTime = (milliseconds) => {
//     const totalSeconds = Math.floor(milliseconds / 1000);
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const refreshAccessToken = async () => {
//     try {
//       const { data } = await getApi(`${BASE_API_URL}/api/admin/refresh-token`);
//       localStorage.setItem("accessToken", data.accessToken);
//       setTimeLeft((prevTime) => ({
//         ...prevTime,
//         accessToken: calculateExpiry(data.accessToken),
//       }));
//     } catch (error) {
//       removeTokensAndRedirect();
//     }
//   };

//   const removeTokensAndRedirect = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     document.cookie =
//       "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     navigate(`${BASE_PATH}/login`);
//   };

//   return (
//     <div className="token-countdown">
//       <div>Access Token Expiry: {formatTime(timeLeft.accessToken)}</div>
//       <div>Refresh Token Expiry: {formatTime(timeLeft.refreshToken)}</div>
//     </div>
//   );
// };

// export default TokenManager;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getApi } from "../Utils/API";
import { BASE_API_URL, BASE_PATH } from "../Utils/URLPath";

const TokenManager = () => {
  const [timeLeft, setTimeLeft] = useState({
    accessToken: 0,
    refreshToken: 0,
    lastUpdate: Date.now(),
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokens = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("refreshToken="))
        ?.split("=")[1];

      let accessExpiry = 0;
      let refreshExpiry = 0;

      // Calculate expiry times for access and refresh tokens
      if (accessToken) {
        accessExpiry = calculateExpiry(accessToken);
      }

      if (refreshToken) {
        refreshExpiry = calculateExpiry(refreshToken);
      }

      // Initialize the state with the expiry times and the current timestamp
      setTimeLeft({
        accessToken: accessExpiry,
        refreshToken: refreshExpiry,
        lastUpdate: Date.now(),
      });

      // Set up timer for countdown
      const timer = setInterval(async () => {
        setTimeLeft((prevTime) => {
          const currentTime = Date.now();

          // Calculate time left based on the difference from the last update
          const accessTokenTimeLeft = Math.max(
            prevTime.accessToken - (currentTime - prevTime.lastUpdate),
            0
          );
          const refreshTokenTimeLeft = Math.max(
            prevTime.refreshToken - (currentTime - prevTime.lastUpdate),
            0
          );

          // Update lastUpdate timestamp
          const updatedTime = { ...prevTime, lastUpdate: currentTime };

          // Check token expiration and refresh or redirect as needed
          if (accessTokenTimeLeft <= 0) {
            if (refreshTokenTimeLeft > 0) {
              // Attempt to refresh the access token
              refreshAccessToken();
            } else {
              removeTokensAndRedirect();
            }
          }

          if (refreshTokenTimeLeft <= 0) {
            removeTokensAndRedirect();
          }

          return {
            ...updatedTime,
            accessToken: accessTokenTimeLeft,
            refreshToken: refreshTokenTimeLeft,
          };
        });
      }, 1000);

      return () => clearInterval(timer);
    };

    checkTokens();
  }, []);

  // Function to calculate the time remaining until the token expires
  const calculateExpiry = (token) => {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 - Date.now(); // Convert to milliseconds
  };

  // Function to format milliseconds into minutes and seconds
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Function to refresh the access token
  const refreshAccessToken = async () => {
    try {
      const { data } = await getApi(`${BASE_API_URL}/api/admin/refresh-token`);
      alert(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
      setTimeLeft((prevTime) => ({
        ...prevTime,
        accessToken: calculateExpiry(data.accessToken),
        lastUpdate: Date.now(),
      }));
    } catch (error) {
      removeTokensAndRedirect();
    }
  };

  // Function to remove tokens and redirect the user to the login page
  const removeTokensAndRedirect = () => {
    localStorage.removeItem("accessToken");
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate(`${BASE_PATH}/login`);
  };

  return (
    <div className="token-countdown">
      <div>Access Token Expiry: {formatTime(timeLeft.accessToken)}</div>
      <div>Refresh Token Expiry: {formatTime(timeLeft.refreshToken)}</div>
    </div>
  );
};

export default TokenManager;
