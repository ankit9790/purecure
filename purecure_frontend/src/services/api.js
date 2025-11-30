import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // e.g. "http://localhost:5000"
});

// ---- CUSTOMER APIS ----

// GET all customers
export const getCustomers = () => api.get("/customers");

// GET single customer
export const getCustomerById = (id) => api.get(`/customers/${id}`);

// ADD customer  (name, email, role)
export const addCustomer = (customer) => api.post("/customers", customer);

// UPDATE customer (PARTIAL UPDATE -> uses PATCH in backend)
export const updateCustomer = (id, customer) =>
  api.patch(`/customers/${id}`, customer);

// DELETE customer
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);

export default api;
