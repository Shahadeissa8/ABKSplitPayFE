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

export { getItem, getItemById, createItem, updateItem, deleteItem };
