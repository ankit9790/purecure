const customers = require("../models/customerModel");

// GET ALL CUSTOMERS
const getAllCustomers = (req, res) => {
  res.json(customers);
};

// GET SINGLE CUSTOMER
const getCustomerById = (req, res) => {
  const id = parseInt(req.params.id);
  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json(customer);
};

// ADD CUSTOMER
const addCustomer = (req, res) => {
  const { name, email } = req.body;

  const newCustomer = {
    id: customers.length + 1,
    name,
    email,
  };

  customers.push(newCustomer);
  res.status(201).json(newCustomer);
};

// DELETE CUSTOMER
const deleteCustomer = (req, res) => {
  const id = parseInt(req.params.id);
  const index = customers.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Customer not found" });
  }

  customers.splice(index, 1);
  res.json({ message: "Customer deleted successfully" });
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  deleteCustomer,
};
