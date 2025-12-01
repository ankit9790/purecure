
const pool = require("../connection/db");

// CREATE CUSTOMER
async function createCustomer(name, email, role="customer") {
  const query = `
    INSERT INTO customers (name, email, role)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await pool.query(query, [name, email, role]);
  return result.rows[0];
}

// GET ALL  CUSTOMERS
async function getCustomers() {
  const result = await pool.query("SELECT * FROM customers ORDER BY id ASC");
  return result.rows;
}

//  CUSTOMER GET BY ID
async function getCustomerById(id) {
  const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
}

//  UPDATE CUSTOMER (PUT → replace)
async function updateCustomer(id, name, email, role) {
  const query = `
    UPDATE customers
    SET name = $1, email = $2, role = $3
    WHERE id = $4
    RETURNING *;
  `;
  const result = await pool.query(query, [name, email, role, id]);
  return result.rows[0];
}

// DELETE CUSTOMER
async function deleteCustomer(id) {
  const result = await pool.query(
    "DELETE FROM customers WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
}

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
