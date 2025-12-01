const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

// ---------------- PLACE ORDER ----------------
exports.placeOrder = async (req, res) => {
  try {
    const { user_id, items, payment_id } = req.body;

    // Calculate total
    let totalAmount = 0;
    for (let item of items) {
      const product = await productModel.getProductById(item.product_id);
      totalAmount += product.price * item.quantity;
    }

    // Create main order
    const order = await orderModel.createOrder(
      user_id,
      totalAmount,
      "PENDING",
      payment_id
    );

    // Insert Order Items
    for (let item of items) {
      const product = await productModel.getProductById(item.product_id);

      await orderModel.addOrderItem(
        order.id,
        item.product_id,
        item.quantity,
        product.price
      );

      // Reduce stock
      await productModel.updateProduct(
        item.product_id,
        product.name,
        product.description,
        product.price,
        product.stock - item.quantity,
        product.image_url
      );
    }

    res.json({ message: "Order placed", order_id: order.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Order failed" });
  }
};

// CRUD GET all orders
exports.getOrders = async (req, res) => {
  const orders = await orderModel.getOrders();
  res.json(orders);
};

// GET single order details
exports.getOrderDetails = async (req, res) => {
  const details = await orderModel.getOrderDetails(req.params.id);
  res.json(details);
};

// DELETE order
exports.deleteOrder = async (req, res) => {
  const deleted = await orderModel.deleteOrder(req.params.id);
  res.json(deleted);
};
