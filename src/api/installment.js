import instance from "."; // Import axios instance
import { getToken } from "./storage"; // Import getToken to retrieve the token

const getOrders = async () => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token is missing. Please log in again.");
    }

    console.log("Using token for getOrders:", token);
    const response = await instance.get(`/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Orders fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.response?.data || error.message);
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

    console.log("Using token for getOrderDetails:", token);
    const response = await instance.get(`/Installment/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Order details fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error.response?.data || error.message);
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

    console.log("Using token for updateInstallmentStatus:", token);
    const response = await instance.put(
      `/Installment/${installmentId}`,
      { paymentStatus: "Paid" }, // Assuming the endpoint expects this payload
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Installment status updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating installment status:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.title ||
        "Failed to update installment status. Please try again."
    );
  }
};

export { getOrders, getOrderDetails, updateInstallmentStatus };