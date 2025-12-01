import axios from "axios";

const API_URL ="https://purecure.onrender.com";

console.log("Admin API Root =", API_URL);

// ---------- ADMIN CRUD ----------

// GET ALL ADMINS
export const getAdmins = async () => {
  const res = await axios.get(`${API_URL}/admins`);
  return res.data;
};

// CREATE ADMIN
export const addAdmin = async (admin) => {
  const res = await axios.post(`${API_URL}/admins`, admin);
  return res.data;
};

// UPDATE ADMIN
export const updateAdmin = async (id, admin) => {
  const res = await axios.put(`${API_URL}/admins/${id}`, admin);
  return res.data;
};

// DELETE ADMIN
export const deleteAdmin = async (id) => {
  const res = await axios.delete(`${API_URL}/admins/${id}`);
  return res.data;
};

// ---------- ADMIN → CUSTOMER ACTIONS ----------

// GET ALL CUSTOMERS (admin power)
export const adminGetAllCustomers = async () => {
  const res = await axios.get(`${API_URL}/admins/customers/all`);
  return res.data;
};

// DELETE CUSTOMER (admin power)
export const adminDeleteCustomer = async (id) => {
  const res = await axios.delete(`${API_URL}/admins/customers/${id}`);
  return res.data;
};
