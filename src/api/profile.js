import instance from "."; // Import axios instance
import { getToken } from "./storage"; // Import getToken to retrieve the token

const getUserProfile = async () => {
  try {
    const token = await getToken(); // Retrieve the token from storage
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }
    console.log("Using token:", token);
    const response = await instance.get(`/ApplicationUser/me`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    throw new Error("Failed to fetch user profile.");
  }
};

const changePassword = async (currentPassword, newPassword) => {
  try {
    const token = await getToken(); // Retrieve the token from storage
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }

    const response = await instance.post(
      `/ApplicationUser/change-password`,
      { currentPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw new Error(
      error.response?.data?.title ||
        "Failed to change password. Please try again."
    );
  }
};

const updateUserProfile = async (fullName, phoneNumber, profilePictureUrl) => {
  try {
    const token = await getToken(); // Retrieve the token from storage
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }

    const response = await instance.put(
      `/ApplicationUser/update`,
      { fullName, phoneNumber, profilePictureUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error(
      error.response?.data?.title ||
        "Failed to update user profile. Please try again."
    );
  }};

export { getUserProfile, changePassword, updateUserProfile };
