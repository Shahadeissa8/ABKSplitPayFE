import instance from "./index";

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
export { getItem, getItemById, createItem, updateItem, deleteItem, addToCart};
