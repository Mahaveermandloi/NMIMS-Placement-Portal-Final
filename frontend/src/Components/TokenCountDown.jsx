// TokenCountDown.jsx
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const TokenCountDown = () => {
  const [timeLeft, setTimeLeft] = useState({ accessToken: 0, refreshToken: 0 });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      const accessExpiry = calculateExpiry(accessToken);
      setTimeLeft((prevTime) => ({ ...prevTime, accessToken: accessExpiry }));
    }

    if (refreshToken) {
      const refreshExpiry = calculateExpiry(refreshToken);
      setTimeLeft((prevTime) => ({ ...prevTime, refreshToken: refreshExpiry }));
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const accessTokenTimeLeft = Math.max(prevTime.accessToken - 1000, 0);
        const refreshTokenTimeLeft = Math.max(prevTime.refreshToken - 1000, 0);

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
  }, []);

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

  return (
    <div className="token-countdown">
      <div>Access Token Expiry: {formatTime(timeLeft.accessToken)}</div>
      <div>Refresh Token Expiry: {formatTime(timeLeft.refreshToken)}</div>
    </div>
  );
};

export default TokenCountDown;
