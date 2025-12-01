const pool = require("../connection/db");

// CREATE ADMIN
async function createAdmin(name, email, role = "admin") {
  const query = `
    INSERT INTO admins (name, email, role)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, email, role];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// GET ALL ADMINS
async function getAdmins() {
  const result = await pool.query("SELECT * FROM admins ORDER BY id ASC");
  return result.rows;
}

// GET ADMIN BY ID
async function getAdminById(id) {
  const result = await pool.query("SELECT * FROM admins WHERE id = $1", [id]);
  return result.rows[0];
}

// UPDATE ADMIN (PUT → replace)
async function updateAdmin(id, name, email, role) {
  const query = `
    UPDATE admins
    SET name = $1, email = $2, role = $3
    WHERE id = $4
    RETURNING *;
  `;
  const values = [name, email, role, id];
  const result = await pool.query(query, values);
  return result.rows[0];
}



// DELETE ADMIN
async function deleteAdmin(id) {
  const result = await pool.query(
    "DELETE FROM admins WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}

module.exports = {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
