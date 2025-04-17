import instance from "./index";

const getPaymentPlan = async () => {
  const response = await instance.get("/PaymentPlan");
  return response.data;
};

const getPaymentPlanById = async (id) => {
  const response = await instance.get(`/PaymentPlan/${id}`);
  return response.data;
};

const createPaymentPlan = async (data) => {
  const response = await instance.post("/PaymentPlan", data);
  return response.data;
};

const updatePaymentPlan = async (id, data) => {
  const response = await instance.put(`/PaymentPlan/${id}`, data);
  return response.data;
};

const deletePaymentPlan = async (id) => {
  const response = await instance.delete(`/PaymentPlan/${id}`);
  return response.data;
};

export {
  getPaymentPlan,
  getPaymentPlanById,
  createPaymentPlan,
  updatePaymentPlan,
  deletePaymentPlan,
};
