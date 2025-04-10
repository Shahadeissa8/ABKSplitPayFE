import instance from "./index";

const getProductCategories = async () => {
  const response = await instance.get("/ProductCategory");
  return response.data;
};

const getCategoryById = async (id) => {
  const response = await instance.get(`/ProductCategory/${id}`);
  return response.data;
};

const createCategory = async (data) => {
  const response = await instance.post("/ProductCategory", data);
  return response.data;
};

const updateCategory = async (id, data) => {
  const response = await instance.put(`/ProductCategory/${id}`, data);
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await instance.delete(`/ProductCategory/${id}`);
  return response.data;
};

export {
  getProductCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
