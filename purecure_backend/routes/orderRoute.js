const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

// PLACE ORDER
router.post("/place", orderController.placeOrder);

// CRUD
router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrderDetails);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
