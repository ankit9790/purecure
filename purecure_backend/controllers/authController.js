const pool = require("../connection/db");

// ---------------------- SIGNUP ----------------------
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // if role not provided → default customer
    const userRole = role || "customer";

    // Insert into correct table
    const table = userRole === "admin" ? "admins" : "customers";

    const query = `
      INSERT INTO ${table} (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role;
    `;

    const values = [name, email, password, userRole];

    const result = await pool.query(query, values);

    return res.json({
      message: "Signup successful",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({ error: "Signup failed" });
  }
};

// ---------------------- LOGIN ----------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check Admin table
    let query = `SELECT * FROM admins WHERE email = $1 AND password = $2`;
    let result = await pool.query(query, [email, password]);

    if (result.rows.length === 0) {
      // Check Customer table
      query = `SELECT * FROM customers WHERE email = $1 AND password = $2`;
      result = await pool.query(query, [email, password]);
    }

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // remove password
    const user = result.rows[0];
    delete user.password;

    return res.json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ error: "Login failed" });
  }
};
