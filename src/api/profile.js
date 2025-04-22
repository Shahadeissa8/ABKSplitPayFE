import instance from "."; // Import axios instance
import { getToken } from "./storage"; // Import getToken to retrieve the token

const getUserProfile = async () => {
  try {
    const token = await getToken(); // Retrieve the token from storage
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }
    const response = await instance.get(`/ApplicationUser/me`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
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

    const response = await instance.post(`/Address`, addressData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
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
    const response = await instance.delete(`/Address/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
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
    const response = await instance.post(`/PaymentMethod`, paymentMethodData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.title ||
        "Failed to create payment method. Please try again."
    );
  }
};

const getPaymentMethods = async () => {
  try {
    const token = await getToken(); // Retrieve the token from storage
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }
    const response = await instance.get(`/PaymentMethod`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.title ||
        "Failed to fetch payment methods. Please try again."
    );
  }
};

const deletePaymentMethod = async (id) => {
  try {
    const token = await getToken(); // Retrieve the token from storage
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }
    const response = await instance.delete(`/PaymentMethod/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.title ||
        "Failed to delete payment method. Please try again."
    );
  }
};

export {
  getPaymentMethods,
  deletePaymentMethod,
  createPaymentMethod,
  getUserProfile,
  changePassword,
  updateUserProfile,
  createAddress,
  getSavedAddresses,
  deleteAddress,
};
