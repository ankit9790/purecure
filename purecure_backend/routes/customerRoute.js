const express = require("express");
const router = express.Router();
const {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

// Routes
router.get("/", getAllCustomers);
router.get("/:id", getCustomerById);
router.post("/", addCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
