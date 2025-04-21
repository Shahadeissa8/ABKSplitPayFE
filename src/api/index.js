import axios from "axios";
import { getToken } from "./storage";

const instance = axios.create({

  
  baseURL: "http://192.168.8.152:5137/api", // Updated IP address

  timeout: 10000, // 10 seconds timeout
});

instance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject(
        new Error(
          "Request timed out after 10 seconds. Please check your network and try again."
        )
      );
    }
    if (!error.response) {
      return Promise.reject(
        new Error(
          "Network error: Unable to connect to the server. Please ensure the server is running and accessible."
        )
      );
    }
    return Promise.reject(error);
  }
);

export default instance;
