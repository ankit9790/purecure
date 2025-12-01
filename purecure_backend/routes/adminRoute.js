const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

// ----- ADMIN CRUD -----
router.post("/", adminController.createAdmin);
router.get("/", adminController.getAdmins);
router.get("/:id", adminController.getAdminById);
router.put("/:id", adminController.updateAdmin);
router.patch("/:id", adminController.patchAdmin);
router.delete("/:id", adminController.deleteAdmin);

// ----- ADMIN → CUSTOMER OPERATIONS -----
router.get("/customers/all", adminController.getAllCustomers);
router.delete("/customers/:customerId", adminController.deleteCustomer);

module.exports = router;
