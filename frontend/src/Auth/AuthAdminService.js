import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApi } from "../Utils/API";
import jwtDecode from "jwt-decode";
import { BASE_API_URL, BASE_PATH } from "../Utils/URLPath";

const AuthAdminService = () => {
  const [timeLeft, setTimeLeft] = useState({ accessToken: 0, refreshToken: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokens = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("refreshToken="))
        ?.split("=")[1];

      if (accessToken) {
        const accessExpiry = calculateExpiry(accessToken);
        setTimeLeft((prevTime) => ({ ...prevTime, accessToken: accessExpiry }));
      }

      if (refreshToken) {
        const refreshExpiry = calculateExpiry(refreshToken);
        setTimeLeft((prevTime) => ({
          ...prevTime,
          refreshToken: refreshExpiry,
        }));

        // Check token status and handle as needed
        if (timeLeft.accessToken < 0) {
          if (timeLeft.refreshToken > 0) {
            try {
              const { data } = await getApi(
                `${BASE_API_URL}/api/admin/refresh-token`
              );
              localStorage.setItem("accessToken", data.accessToken);
              setTimeLeft((prevTime) => ({
                ...prevTime,
                accessToken: calculateExpiry(data.accessToken),
              }));
            } catch (error) {
              // Handle refresh token errors (e.g., log out the user)
              removeTokensAndRedirect();
            }
          } else {
            removeTokensAndRedirect();
          }
        }

        if (timeLeft.refreshToken < 0) {
          removeTokensAndRedirect();
        }
      }

      // Set up timer for countdown
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const accessTokenTimeLeft = Math.max(prevTime.accessToken - 1000, 0);
          const refreshTokenTimeLeft = Math.max(
            prevTime.refreshToken - 1000,
            0
          );

          if (accessTokenTimeLeft === 0 && refreshTokenTimeLeft === 0) {
            clearInterval(timer);
          }

          return {
            accessToken: accessTokenTimeLeft,
            refreshToken: refreshTokenTimeLeft,
          };
        });
      }, 1000);

      return () => clearInterval(timer);
    };

    checkTokens();
  }, [timeLeft]);

  const calculateExpiry = (token) => {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 - Date.now(); // Convert to milliseconds
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const removeTokensAndRedirect = () => {
    localStorage.removeItem("accessToken");
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/admin/login");
  };

  return (
    <div>
      <div className="token-countdown">
        <div>Access Token Expiry: {formatTime(timeLeft.accessToken)}</div>
        <div>Refresh Token Expiry: {formatTime(timeLeft.refreshToken)}</div>
      </div>
    </div>
  );
};

export default AuthAdminService;
