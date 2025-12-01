const pool = require("../connection/db");

// CREATE PRODUCT
exports.createProduct = async (name, description, price, stock, image_url) => {
  const query = `
    INSERT INTO products (name, description, price, stock, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [name, description, price, stock, image_url];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// GET ALL PRODUCTS
exports.getProducts = async () => {
  const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
  return result.rows;
};

// GET PRODUCT BY ID
exports.getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

// UPDATE PRODUCT
exports.updateProduct = async (
  id,
  name,
  description,
  price,
  stock,
  image_url
) => {
  const query = `
    UPDATE products
    SET name=$1, description=$2, price=$3, stock=$4, image_url=$5
    WHERE id=$6
    RETURNING *;
  `;
  const values = [name, description, price, stock, image_url, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// DELETE PRODUCT
exports.deleteProduct = async (id) => {
  const result = await pool.query(
    "DELETE FROM products WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
