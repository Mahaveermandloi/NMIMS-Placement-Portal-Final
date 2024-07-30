// api.js
import axios from "axios";
import { BASE_API_URL } from "./URLPath.jsx";

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies in cross-origin requests
});

// Request interceptor to include the access token
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 (Unauthorized), try refreshing the token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await api.post("/refresh-token", { refreshToken });

        // Save the new access token and retry the original request
        localStorage.setItem("accessToken", data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token errors (e.g., log out the user)
        console.error("Token refresh failed:", refreshError);
        handleApiError(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Function to convert data to FormData if needed
const toFormData = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] instanceof FileList) {
        Array.from(data[key]).forEach((file) => formData.append(key, file));
      } else if (Array.isArray(data[key])) {
        data[key].forEach((item) => formData.append(`${key}[]`, item));
      } else if (data[key] && typeof data[key] === "object") {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }
  }
  return formData;
};

// Function to handle errors centrally
const handleApiError = (error) => {
  console.error("API Error:", error);
  // Optionally, handle specific status codes or errors globally
  if (error.response) {
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
    console.error("Response headers:", error.response.headers);
  } else if (error.request) {
    console.error("Request data:", error.request);
  } else {
    console.error("Error message:", error.message);
  }
  throw error; // Re-throw the error to handle it in the calling function
};

// POST API
const postApi = async (data, route) => {
  try {
    const formData = toFormData(data);
    const response = await api.post(route, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// GET API
const getApi = async (route) => {
  try {
    const response = await api.get(route);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// GET API WITH DATA
const getApi2 = async (data, route) => {
  try {
    const response = await api.get(route, { params: data });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// PUT API
const putApi = async (data, route) => {
  try {
    const formData = toFormData(data);
    const response = await api.put(route, formData, {
      headers: { "Content-Type": "multipart/form-data" }, // Override default header
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// DELETE API
const deleteApi = async (route) => {
  try {
    const response = await api.delete(route);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export { postApi, getApi, getApi2, putApi, deleteApi };
