import instance from "."; // Import axios instance
import { getToken } from "./storage"; // Import getToken to retrieve the token

const getUserProfile = async (id) => {
  try {
    const token = await getToken(); // Retrieve the token from storage
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }

    const response = await instance.get(`/ApplicationUser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile.");
  }
};

export { getUserProfile };















