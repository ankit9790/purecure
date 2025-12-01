const pool = require("../connection/db");

// SIGNUP CUSTOMER
async function signupCustomer(name, email, password) {
  const query = `
    INSERT INTO customers (name, email, password, role)
    VALUES ($1, $2, $3, 'customer')
    RETURNING *;
  `;

  const result = await pool.query(query, [name, email, password]);
  return result.rows[0];
}

// SIGNUP ADMIN
async function signupAdmin(name, email, password) {
  const query = `
    INSERT INTO admins (name, email, password, role)
    VALUES ($1, $2, $3, 'admin')
    RETURNING *;
  `;

  const result = await pool.query(query, [name, email, password]);
  return result.rows[0];
}

// LOGIN CUSTOMER / ADMIN (simple check)
async function loginUser(email, password) {
  const queryCustomer = `
    SELECT * FROM customers WHERE email = $1 AND password = $2;
  `;

  const queryAdmin = `
    SELECT * FROM admins WHERE email = $1 AND password = $2;
  `;

  // check customer
  const isCustomer = await pool.query(queryCustomer, [email, password]);
  if (isCustomer.rows.length > 0)
    return { type: "customer", data: isCustomer.rows[0] };

  // check admin
  const isAdmin = await pool.query(queryAdmin, [email, password]);
  if (isAdmin.rows.length > 0) return { type: "admin", data: isAdmin.rows[0] };

  return null;
}

module.exports = {
  signupCustomer,
  signupAdmin,
  loginUser,
};
