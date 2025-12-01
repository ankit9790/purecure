import axios from "axios";

const API_URL ="https://purecure.onrender.com";

console.log("Customer API Root =", API_URL);

// GET ALL CUSTOMERS
export const getCustomers = async () => {
  const res = await axios.get(`${API_URL}/customers`);
  return res.data;
};

// CREATE CUSTOMER
export const addCustomer = async (customer) => {
  const res = await axios.post(`${API_URL}/customers`, customer);
  return res.data;
};

// UPDATE CUSTOMER
export const updateCustomer = async (id, customer) => {
  const res = await axios.put(`${API_URL}/customers/${id}`, customer);
  return res.data;
};

// DELETE CUSTOMER
export const deleteCustomer = async (id) => {
  const res = await axios.delete(`${API_URL}/customers/${id}`);
  return res.data;
};
