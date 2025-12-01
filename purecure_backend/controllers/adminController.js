const adminModel = require("../models/adminModel");
const customerModel = require("../models/customerModel"); // for customer access

// ---------- ADMIN CRUD ----------

// CREATE ADMIN
exports.createAdmin = async (req, res) => {
  const { name, email, role } = req.body; // you can send role manually
  const admin = await adminModel.createAdmin(name, email, role);
  res.json(admin);
};

// GET ALL ADMINS
exports.getAdmins = async (req, res) => {
  const admins = await adminModel.getAdmins();
  res.json(admins);
};

// GET ADMIN BY ID
exports.getAdminById = async (req, res) => {
  const admin = await adminModel.getAdminById(req.params.id);
  res.json(admin);
};

// UPDATE ADMIN (PUT)
exports.updateAdmin = async (req, res) => {
  const { name, email, role } = req.body;
  const admin = await adminModel.updateAdmin(req.params.id, name, email, role);
  res.json(admin);
};

// PATCH ADMIN
exports.patchAdmin = async (req, res) => {
  const admin = await adminModel.patchAdmin(req.params.id, req.body);
  res.json(admin);
};

// DELETE ADMIN
exports.deleteAdmin = async (req, res) => {
  const admin = await adminModel.deleteAdmin(req.params.id);
  res.json(admin);
};

// ---------- ADMIN POWERS ON CUSTOMERS ----------

// GET ALL CUSTOMERS (as admin)
exports.getAllCustomers = async (req, res) => {
  const customers = await customerModel.getCustomers();
  res.json(customers);
};

// DELETE CUSTOMER (as admin)
exports.deleteCustomer = async (req, res) => {
  const customer = await customerModel.deleteCustomer(req.params.customerId);
  res.json(customer);
};
