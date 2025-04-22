import instance from "."; // Import axios instance
import { getToken } from "./storage"; // Import getToken to retrieve the token

const getPaymentPlans = async () => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }
    const response = await instance.get(`/PaymentPlan`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.title ||
        "Failed to fetch payment plans. Please try again."
    );
  }
};
const getAllAddresses = async () => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }
    const response = await instance.get(`/Address`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.title ||
        "Failed to fetch addresses. Please try again."
    );
  }
};

// Fetch the default address
const getDefaultAddress = async () => {
  const addresses = await getAllAddresses();
  const defaultAddress = addresses.find((address) => address.isDefault);
  if (!defaultAddress) {
    throw new Error("No default address found.");
  }
  return defaultAddress;
};

// Fetch all payment methods
const getAllPaymentMethods = async () => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }
    const response = await instance.get(`/PaymentMethod`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

// Fetch the default payment method
const getDefaultPaymentMethod = async () => {
  const paymentMethods = await getAllPaymentMethods();
  const defaultPaymentMethod = paymentMethods.find(
    (method) => method.isDefault
  );
  if (!defaultPaymentMethod) {
    throw new Error("No default payment method found.");
  }
  return defaultPaymentMethod;
};

// Place an order
const placeOrder = async (orderData) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }
    const response = await instance.post(`/Order`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.title || "Failed to place order. Please try again."
    );
  }
};

export {
  getPaymentPlans,
  getAllAddresses,
  getDefaultAddress,
  getAllPaymentMethods,
  getDefaultPaymentMethod,
  placeOrder,
};
