import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getApi } from "../Utils/API";
import { SERVER_URL, ADMIN_PATH } from "../Utils/URLPath";

export const AdminTokenManager = () => {
  const [timeLeft, setTimeLeft] = useState({
    accessToken: 0,
    refreshToken: 0,
    lastUpdate: Date.now(),
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the current route is an admin route
    const isAdminRoute = location.pathname.startsWith(`${ADMIN_PATH}`);

    if (!isAdminRoute) return;

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
  }, [location.pathname]);

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
      const { data } = await getApi(`${SERVER_URL}/api/admin/refresh-token`);

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
    localStorage.removeItem("refreshToken");
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate(`${ADMIN_PATH}/login`);

    window.location.reload();
  };

  return (
    <div className="token-countdown">
      <div className="text-sm text-red-500">
        {/* Access Token Expiry: {formatTime(timeLeft.accessToken)} */}
      </div>
      <div className="text-sm text-red-500">
        {/* Refresh Token Expiry: {formatTime(timeLeft.refreshToken)} */}
      </div>
    </div>
  );
};
