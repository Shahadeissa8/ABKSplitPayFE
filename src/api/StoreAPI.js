import instance from "./index";

const GetStores = async () => {
  const response = await instance.get("/Store");
  return response.data;
};

const GetStore = async (id) => {
  const response = await instance.get(`/Store/${id}`);
  return response.data;
};

const CreateStore = async (data) => {
  const response = await instance.post("/Store", data);
  return response.data;
};

const UpdateStore = async (id, data) => {
  const response = await instance.put(`/Store/${id}`, data);
  return response.data;
};

const DeleteStore = async (id) => {
  const response = await instance.delete(`/Store/${id}`);
  return response.data;
};

export { GetStores, GetStore, CreateStore, UpdateStore, DeleteStore };
