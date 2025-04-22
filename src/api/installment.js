import instance from "."; // Import axios instance
import { getToken } from "./storage"; // Import getToken to retrieve the token

const getOrders = async () => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }
    const response = await instance.get(`/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.title ||
        "Failed to fetch orders. Please try again."
    );
  }
};

const getOrderDetails = async (orderId) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }
    const response = await instance.get(`/Installment/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.title ||
        "Failed to fetch order details. Please try again."
    );
  }
};

const updateInstallmentStatus = async (installmentId) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }
    const response = await instance.put(
      `/Installment/${installmentId}`,
      { paymentStatus: "Paid" }, // Assuming the endpoint expects this payload
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.title ||
        "Failed to update installment status. Please try again."
    );
  }
};

export { getOrders, getOrderDetails, updateInstallmentStatus };