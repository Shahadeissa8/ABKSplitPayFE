import instance from "./index";

const getProduct = async () => {
  const response = await instance.get("/Product");
  return response.data;
};

const getProductById = async (id) => {
  const response = await instance.get(`/Product/${id}`);
  return response.data;
};

const createProduct = async (data) => {
  const response = await instance.post("/Product", data);
  return response.data;
};

const updateProduct = async (id, data) => {
  const response = await instance.put(`/Product/${id}`, data);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await instance.delete(`/Product/${id}`);
  return response.data;
};

export {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
