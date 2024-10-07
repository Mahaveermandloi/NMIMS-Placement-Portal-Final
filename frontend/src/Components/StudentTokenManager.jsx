

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import statement
import { getApi } from "../Utils/API";
import { SERVER_URL, STUDENT_PATH } from "../Utils/URLPath";
import { Toast } from "./Toast";
import { toast } from "react-toastify";

export const StudentTokenManager = () => {
  const [timeLeft, setTimeLeft] = useState({
    accessToken: 0,
    refreshToken: 0,
    lastUpdate: Date.now(),
  });
  const navigate = useNavigate();
  const location = useLocation();

  const [refreshTokenExpiryTime, setRefreshTokenExpiryTime] = useState();

  useEffect(() => {
    const isStudentRoute = location.pathname.startsWith(`${STUDENT_PATH}`);

    if (!isStudentRoute) return;

    const checkTokens = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshTokenExpiry = parseInt(localStorage.getItem("expiresIn"));

      setRefreshTokenExpiryTime(refreshTokenExpiry);

      let accessExpiry = 0;

      if (accessToken) {
        try {
          accessExpiry = calculateExpiry(accessToken);
        } catch (error) {
          console.error(
            "Error calculating expiry for access token:",
            error.message
          );
          removeTokensAndRedirect();
          return;
        }
      }

      setTimeLeft({
        accessToken: accessExpiry,
        refreshToken: refreshTokenExpiryTime * 1000, // Convert seconds to milliseconds
        lastUpdate: Date.now(),
      });

      const timer = setInterval(async () => {
        setTimeLeft((prevTime) => {
          const currentTime = Date.now();

          const accessTokenTimeLeft = Math.max(
            prevTime.accessToken - (currentTime - prevTime.lastUpdate),
            0
          );
          const refreshTokenTimeLeft = Math.max(
            prevTime.refreshToken - (currentTime - prevTime.lastUpdate),
            0
          );

          const updatedTime = { ...prevTime, lastUpdate: currentTime };

          if (accessTokenTimeLeft <= 0) {
            refreshAccessToken();
          }

          if (refreshTokenTimeLeft <= 0) {
            verifyRefreshToken();
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

  const formatTime = (seconds) => {
    const totalSeconds = Math.floor(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours}h : ${minutes}m : ${secs}s`;
  };

  const calculateExpiry = (token) => {
    if (!token || typeof token !== "string") {
      throw new Error("Invalid token specified: must be a string");
    }
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 - Date.now(); // Convert to milliseconds
    } catch (error) {
      console.error("Failed to decode token:", error);
      throw new Error("Invalid token format");
    }
  };

  const refreshAccessToken = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await getApi(`${SERVER_URL}/api/student/refresh-token`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response && response.statusCode === 200) {
        const data = response.data;
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("expiresIn", data.expiresIn); // Save new expiration time

        setTimeLeft((prevTime) => ({
          ...prevTime,
          accessToken: calculateExpiry(data.accessToken),
          lastUpdate: Date.now(),
        }));
      } else {
        throw new Error("Failed to refresh access token");
      }
    } catch (error) {
      console.log("Error refreshing access token:", error.message);
      removeTokensAndRedirect();
    }
  };

  const verifyRefreshToken = async () => {
    try {
      const response = await getApi(
        `${SERVER_URL}/api/student/verify-refresh-token`
      );

      if (response && response.statusCode === 200) {
        const data = response.data;
        localStorage.setItem("expiresIn", data.expiresIn); // Update expiration time

        setTimeLeft((prevTime) => ({
          ...prevTime,
          refreshToken: data.expiresIn * 1000 - Date.now(), // Convert seconds to milliseconds
          lastUpdate: Date.now(),
        }));

        setRefreshTokenExpiryTime(formatTime(data.expiresIn));
      } else {
        throw new Error("Failed to verify refresh token");
      }
    } catch (error) {
      console.log("Error verifying refresh token:", error.message);
      removeTokensAndRedirect();
    }
  };

  const removeTokensAndRedirect = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

 
   
    setTimeout(() => {
      navigate(`${STUDENT_PATH}/login`);
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <Toast />
      <div className="token-countdown">
        <div className="text-sm text-red-500">
          {/* Access Token Expiry: {formatTime(timeLeft.accessToken / 1000)}{" "} */}
          {/* Convert ms to s */}
        </div>
        <div className="text-sm text-red-500">
          {/* Refresh Token Expiry: {formatTime(timeLeft.refreshToken / 1000)} */}
        </div>
      </div>
    </>
  );
};
