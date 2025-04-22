import instance from "."; // Import axios instance
import { setToken } from "./storage"; // Import setToken function

const login = async (userInfo) => {
  try {
    const response = await instance.post("/ApplicationUser/login", userInfo);
    const { token } = response.data;
    if (!token) {
      throw new Error("Token not found in response");
    }
    await setToken(token);
    return response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      throw new Error(
        "The request timed out. Please check your network and try again."
      );
    }
    if (error.response) {
      throw new Error(
        error.response.data?.title || "Invalid username or password."
      );
    }
    throw new Error(
      "Network error: Unable to connect to the server. Please ensure the server is running and accessible."
    );
  }
};

const register = async (userInfo) => {
  try {
    const response = await instance.post("/ApplicationUser/register", userInfo);
    return response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      throw new Error(
        "The request timed out. Please check your network and try again."
      );
    }
    throw new Error(
      "Registration failed. Please check your network and try again."
    );
  }
};

export { login, register };
