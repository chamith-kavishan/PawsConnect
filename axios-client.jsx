import axios from "axios";
import Cookies from "js-cookie";
const axiosClient = axios.create({
  baseURL: `http://localhost:8000/api`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get("_auth");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
      if (response.status === 401) {
        Cookies.remove("_auth");
        localStorage.setItem(
          "TOKEN_EXPIRE",
          "Your login has expired. Please log in again to continue.",
        );
        let baseURL = window.location.origin;
        let fullPath = window.location.href;
        let pathAfterBaseURL = fullPath.substring(baseURL.length);
        if (pathAfterBaseURL !== "/organization/login") {
          window.location.href = "/organization/login";
        }
      }
    } catch (error) {
      console.error(error);
    }

    throw error;
  },
);

export default axiosClient;
