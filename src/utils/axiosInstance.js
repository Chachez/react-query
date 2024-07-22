import axios from "axios";
import { enqueueSnackbar } from "notistack";

const { VITE_BASE_URL } = import.meta.env;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response) {
      const { status } = error.response;
      // Handle 401 errors by refreshing the token
      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const response = await axios.post(
            "https://api.example.com/auth/refresh-token",
            { refreshToken }
          );
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          axiosInstance.defaults.headers[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          enqueueSnackbar("Session expired. Please log in again.", {
            variant: "error",
          });
          // Optionally, handle logout here
          return Promise.reject(refreshError);
        }
      }
      // Handle other errors
      switch (status) {
        case 400:
          enqueueSnackbar("Bad request. Please check your input.", {
            variant: "error",
          });
          break;
        case 403:
          enqueueSnackbar(
            "You do not have permission to perform this action.",
            { variant: "error" }
          );
          break;
        case 404:
          enqueueSnackbar("The requested resource was not found.", {
            variant: "error",
          });
          break;
        case 500:
          enqueueSnackbar(
            "An internal server error occurred. Please try again later.",
            { variant: "error" }
          );
          break;
        default:
          enqueueSnackbar("An error occurred. Please try again.", {
            variant: "error",
          });
      }
    } else {
      enqueueSnackbar("Network error. Please check your connection.", {
        variant: "error",
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
