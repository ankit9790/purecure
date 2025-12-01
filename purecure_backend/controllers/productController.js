const productModel = require("../models/productModel");

exports.createProduct = async (req, res) => {
  const { name, description, price, stock, image_url } = req.body;
  const product = await productModel.createProduct(
    name,
    description,
    price,
    stock,
    image_url
  );
  res.json(product);
};

exports.getProducts = async (req, res) => {
  const products = await productModel.getProducts();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await productModel.getProductById(req.params.id);
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, stock, image_url } = req.body;
  const product = await productModel.updateProduct(
    req.params.id,
    name,
    description,
    price,
    stock,
    image_url
  );
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  const product = await productModel.deleteProduct(req.params.id);
  res.json(product);
};
