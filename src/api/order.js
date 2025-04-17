import instance from "."; // Import axios instance
import { getToken } from "./storage"; // Import getToken to retrieve the token

// Fetch all payment plans
const getPaymentPlans = async () => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }

    console.log("Using token for getPaymentPlans:", token);
    const response = await instance.get(`/PaymentPlan`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Payment plans fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching payment plans:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.title ||
        "Failed to fetch payment plans. Please try again."
    );
  }
};

// Fetch all addresses
const getAllAddresses = async () => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }

    console.log("Using token for getAllAddresses:", token);
    const response = await instance.get(`/Address`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Addresses fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error.response?.data || error.message);
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

    console.log("Using token for getAllPaymentMethods:", token);
    const response = await instance.get(`/PaymentMethod`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Payment methods fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching payment methods:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.title ||
        "Failed to fetch payment methods. Please try again."
    );
  }
};

// Fetch the default payment method
const getDefaultPaymentMethod = async () => {
  const paymentMethods = await getAllPaymentMethods();
  const defaultPaymentMethod = paymentMethods.find((method) => method.isDefault);
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

    console.log("Using token for placeOrder:", token);
    console.log("Order data being sent:", orderData);
    const response = await instance.post(`/Order`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Order placed:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.title ||
        "Failed to place order. Please try again."
    );
  }
};

export { getPaymentPlans, getAllAddresses, getDefaultAddress, getAllPaymentMethods, getDefaultPaymentMethod, placeOrder };