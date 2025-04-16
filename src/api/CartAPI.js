import instance from "./index";
import { getToken } from "./storage"; // Import setToken function

const getItem = async () => {
  const response = await instance.get("/CartItem");
  return response.data;
};

const getItemById = async (id) => {
  const response = await instance.get(`/CartItem/${id}`);
  return response.data;
};

const createItem = async (data) => {
  const response = await instance.post("/CartItem", data);
  return response.data;
};

const updateItem = async (id, data) => {
  const response = await instance.put(`/CartItem/${id}`, data);
  return response.data;
};

const deleteItem = async (id) => {
  const response = await instance.delete(`/CartItem/${id}`);
  return response.data;
};

const addToCart = async (productId, quantityToAdd = 1) => {
  const items = await getItem(); // Get current cart items

  // Check if product is already in the cart
  const existingItem = items.find((item) => item.productId === productId);

  if (existingItem) {
    // If it exists, update the quantity
    const updatedQuantity = existingItem.quantity + quantityToAdd;

    const updatedData = {
      ...existingItem,
      quantity: updatedQuantity,
    };

    return await updateItem(existingItem.cartItemId, updatedData);
  } else {
    // If not in cart, create a new item
    const newItem = {
      productId,
      quantity: quantityToAdd,
    };

    return await createItem(newItem);
  }
};

const addToWishList = async (data) => {
  try {
    const token = await getToken(); // Retrieve the token
    const response = await instance.post("/WishList", data, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in addToWishList:", error.response?.data || error.message);
    throw error;
  }
};

const getWishList = async () => {
  const response = await instance.get("/WishList");
  return response.data;
}


const deleteWishListItem = async (id) => {
  const response = await instance.delete(`/WishList/${id}`);
  return response.data;
};
export { deleteWishListItem,getWishList,addToWishList,getItem, getItemById, createItem, updateItem, deleteItem, addToCart};
