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
  }
};

const createAddress = async (addressData) => {
  try {
    const token = await getToken(); // Retrieve the token from storage
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }

    const response = await instance.post(
      `/Address`,
      addressData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating address:", error);
    throw new Error(
      error.response?.data?.title ||
        "Failed to create address. Please try again."
    );
  }
};


const getSavedAddresses = async () => {
  try {
    const token = await getToken(); // Retrieve the token from storage
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }

    const response = await instance.get(`/Address`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching saved addresses:", error);
    throw new Error(
      error.response?.data?.title ||
        "Failed to fetch saved addresses. Please try again."
    );
  }
};
const deleteAddress = async (id) => {
  try {
    const token = await getToken(); // Retrieve the token from storage
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }

    console.log("Sending DELETE request for address ID:", id); // Debug log
    const response = await instance.delete(`/Address/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting address:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.title ||
        "Failed to delete address. Please try again."
    );
  }
};


const createPaymentMethod = async (paymentMethodData) => {
  try {
    const token = await getToken(); // Retrieve the token from storage
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }

    const response = await instance.post(
      `/PaymentMethod`,
      paymentMethodData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating payment method:", error);
    throw new Error(
      error.response?.data?.title ||
        "Failed to create payment method. Please try again."
    );
  }
};



export {createPaymentMethod, getUserProfile, changePassword, updateUserProfile, createAddress, getSavedAddresses, deleteAddress };