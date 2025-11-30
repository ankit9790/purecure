import axios from "axios";
const API_URL = process.env.REACT_APP_BACKEND_URL;

// const API_URL = "http://localhost:3000/customers";

console.log("API URL =", API_URL);

// GET ALL
export const getCustomers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// CREATE
export const addCustomer = async (customer) => {
  const res = await axios.post(API_URL, customer);
  return res.data;
};

// UPDATE
export const updateCustomer = async (id, customer) => {
  const res = await axios.put(`${API_URL}/${id}`, customer);
  return res.data;
};

// DELETE
export const deleteCustomer = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
