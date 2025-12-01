import axios from "axios";

// Backend root (use .env or hardcode)
const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

console.log("API URL LOADED =", API_URL);

// ------- CUSTOMERS API -----------------------------

// GET ALL
export const getCustomers = async () => {
  const res = await axios.get(`${API_URL}/customers`);
  return res.data;
};

// CREATE
export const addCustomer = async (customer) => {
  const res = await axios.post(`${API_URL}/customers`, customer);
  return res.data;
};

// UPDATE
export const updateCustomer = async (id, customer) => {
  const res = await axios.put(`${API_URL}/customers/${id}`, customer);
  return res.data;
};

// PATCH
export const patchCustomer = async (id, partial) => {
  const res = await axios.patch(`${API_URL}/customers/${id}`, partial);
  return res.data;
};

// DELETE
export const deleteCustomer = async (id) => {
  const res = await axios.delete(`${API_URL}/customers/${id}`);
  return res.data;
};

// ------- ADMIN CRUD API --------------------------------

// GET ALL
export const getAdmins = async () => {
  const res = await axios.get(`${API_URL}/admins`);
  return res.data;
};

// CREATE
export const addAdmin = async (admin) => {
  const res = await axios.post(`${API_URL}/admins`, admin);
  return res.data;
};

// UPDATE
export const updateAdmin = async (id, admin) => {
  const res = await axios.put(`${API_URL}/admins/${id}`, admin);
  return res.data;
};

// PATCH
export const patchAdmin = async (id, partial) => {
  const res = await axios.patch(`${API_URL}/admins/${id}`, partial);
  return res.data;
};

// DELETE
export const deleteAdmin = async (id) => {
  const res = await axios.delete(`${API_URL}/admins/${id}`);
  return res.data;
};

// ------- ADMIN → CUSTOMER ACTIONS -------

// GET  ALL CUSTOMER
export const adminGetAllCustomers = async () => {
  const res = await axios.get(`${API_URL}/admins/customers/all`);
  return res.data;
};

// DELETE  CUSTOMER

export const adminDeleteCustomer = async (id) => {
  const res = await axios.delete(`${API_URL}/admins/customers/${id}`);
  return res.data;
};
