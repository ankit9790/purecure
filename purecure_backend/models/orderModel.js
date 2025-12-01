const pool = require("../connection/db");

// CREATE ORDER
exports.createOrder = async (user_id, total_amount, status, payment_id) => {
  const query = `
    INSERT INTO orders (user_id, total_amount, status, payment_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [user_id, total_amount, status, payment_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// CREATE ORDER ITEM
exports.addOrderItem = async (
  order_id,
  product_id,
  quantity,
  price_at_purchase
) => {
  const query = `
    INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [order_id, product_id, quantity, price_at_purchase];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// GET ALL ORDERS
exports.getOrders = async () => {
  const result = await pool.query("SELECT * FROM orders ORDER BY id DESC");
  return result.rows;
};

// GET ORDER BY ID (WITH ITEMS)
exports.getOrderDetails = async (order_id) => {
  const order = await pool.query("SELECT * FROM orders WHERE id=$1", [
    order_id,
  ]);
  const items = await pool.query(
    "SELECT * FROM order_items WHERE order_id=$1",
    [order_id]
  );

  return {
    order: order.rows[0],
    items: items.rows,
  };
};

// DELETE ORDER
exports.deleteOrder = async (order_id) => {
  await pool.query("DELETE FROM order_items WHERE order_id=$1", [order_id]);
  const result = await pool.query(
    "DELETE FROM orders WHERE id=$1 RETURNING *",
    [order_id]
  );
  return result.rows[0];
};
