import instance from "./index";

const getOrder = async () => {
  const response = await instance.get("/Order");
  return response.data;
};

const getOrderById = async (id) => {
  const response = await instance.get(`/Order/${id}`);
  return response.data;
};

const createOrder = async (data) => {
  const response = await instance.post("/Order", data);
  return response.data;
};

const updateOrder = async (id, data) => {
  const response = await instance.put(`/Order/${id}`, data);
  return response.data;
};

const deleteOrder = async (id) => {
  const response = await instance.delete(`/Order/${id}`);
  return response.data;
};

export {
  getOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
