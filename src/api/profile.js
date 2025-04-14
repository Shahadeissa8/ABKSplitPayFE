import instance from "."; // Import axios instance
import { getToken } from "./storage"; // Import getToken to retrieve the token

const getUserProfile = async () => {
  try {
    const token = await getToken(); // Retrieve the token from storage
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }
    // TODO : Replace with the actual user ID from your application logic
    const userId = "f5ff8593-78cc-455d-bcc3-083e6788f4ff";
    console.log("Fetching user profile with ID:", id);
    console.log("Using token:", token);
    const response = await instance.get(`/ApplicationUser/${id}`, {
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

export { getUserProfile, changePassword };
