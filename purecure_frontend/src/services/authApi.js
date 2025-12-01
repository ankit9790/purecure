import axios from "axios";

const API_URL ="https://purecure.onrender.com";

export const signup = async (data) => {
  return (await axios.post(`${API_URL}/auth/signup`, data)).data;
};

export const login = async (data) => {
  return (await axios.post(`${API_URL}/auth/login`, data)).data;
};
