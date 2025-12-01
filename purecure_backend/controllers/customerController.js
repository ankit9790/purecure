const customerModel = require("../models/customerModel");

// CREATE CUSTOMER
exports.createCustomer = async (req, res) => {
  const { name, email, role } = req.body;
  const user = await customerModel.createCustomer(name, email, role);
  res.json(user);
};

// GET ALL CUSTOMER
exports.getCustomers = async (req, res) => {
  const users = await customerModel.getCustomers();
  res.json(users);
};

// GET CUSTOMER BY ID
exports.getCustomerById = async (req, res) => {
  const user = await customerModel.getCustomerById(req.params.id);
  res.json(user);
};

// UPDATE CUSTOMER (PUT)
exports.updateCustomer = async (req, res) => {
  const { name, email, role } = req.body;
  const user = await customerModel.updateCustomer(
    req.params.id,
    name,
    email,
    role
  );
  res.json(user);
};

// DELETE CUSTOMER
exports.deleteCustomer = async (req, res) => {
  const user = await customerModel.deleteCustomer(req.params.id);
  res.json(user);
};
