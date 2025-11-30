import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// GET all
export const getCustomers = () => api.get("/customers");

// GET by ID
export const getCustomerById = (id) => api.get(`/customers/${id}`);

// ADD (name, email, role)
export const addCustomer = (customer) => api.post("/customers", customer);

// UPDATE (PUT requires full body)
export const updateCustomer = (id, customer) =>
  api.put(`/customers/${id}`, customer);

// DELETE
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);

export default api;
